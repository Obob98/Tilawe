import {
    Branch, Client, Employee, Invoice, Inventory, Item, PaymentMethod, Payment, Product, ProductSold, PurchasedItem, PurchaseTransaction, Supplier, Revenue, SalesTransaction
} from '@/types'
import { deepClone, formatCurrency } from './utils'
import { unstable_noStore as noStore } from 'next/cache'
import RevenueModel from './db/models/RevenueModel'
import connectDB from './db/config/connectDB'
import InvoiceModel from './db/models/InvoiceModel'
import ClientModel from './db/models/ClientModel'
import { ObjectId } from 'mongodb'

export async function fetchRevenue(): Promise<Revenue[]> {
    noStore()

    try {
        connectDB()
        const data: Revenue[] = await RevenueModel.find()

        return data
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch revenue data.')
    }
}

type FetchLatestInvoicesReturnType = { amount: string, client: Client, status: "paid" | "pending" }

export type PopulatedInvoice = {
    [K in keyof Invoice]: K extends 'client_id' ? Client : Invoice[K]
}
export async function fetchLatestInvoices(): Promise<FetchLatestInvoicesReturnType[]> {
    noStore()

    try {
        connectDB()
        await ClientModel.find()
        const data: PopulatedInvoice[] =
            await InvoiceModel
                .find()
                .limit(5)
                .populate('client_id')
                .sort({ due_date: "desc" })

        const latestInvoices =
            data.map(({ amount, client_id: client, status }) => ({
                client,
                status,
                amount: formatCurrency(amount as number),
            }))

        return latestInvoices
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch the latest invoices.')
    }
}

export async function fetchCardData() {
    noStore()

    try {
        connectDB()

        const invoiceCountPromise = InvoiceModel.countDocuments()

        const customerCountPromise = ClientModel.countDocuments()

        const invoiceStatusPromise: Promise<{ paid: number, pending: number }> =
            (async () => {
                let paidTotal: Invoice[] | number = await InvoiceModel.find().where('status').equals('paid')

                let pendingTotal: Invoice[] | number = await InvoiceModel.find().where('status').equals('pending')

                paidTotal = paidTotal.reduce((sum: number, invoice: Invoice) => {
                    const amount = Number(invoice.amount)
                    return sum + amount
                }, 0)

                pendingTotal = pendingTotal.reduce((sum: number, invoice: Invoice) => {
                    const amount = Number(invoice.amount)
                    return sum + amount
                }, 0)

                return { paid: paidTotal, pending: pendingTotal }
            })()

        const data = await Promise.all([
            invoiceCountPromise,
            customerCountPromise,
            invoiceStatusPromise,
        ])

        const numberOfInvoices = Number(data[0] ?? '0')
        const numberOfCustomers = Number(data[1] ?? '0')
        const totalPaidInvoices = formatCurrency(data[2].paid ?? '0')
        const totalPendingInvoices = formatCurrency(data[2].pending ?? '0')

        return {
            numberOfCustomers,
            numberOfInvoices,
            totalPaidInvoices,
            totalPendingInvoices,
        }
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch card data.')
    }
}

const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

const monthNameToMonthIndex = (query: string) => {
    if (query.length < 1) return -1
    let compareReturn = months
        .findIndex(value => {
            return value
                .toLowerCase()
                .includes(query.toLowerCase())
        })


    if (compareReturn !== -1) compareReturn += 1

    return compareReturn
}

const isMonth = (query: string) => {
    if (query.length < 1) return false
    if (monthNameToMonthIndex(query) !== -1) return true

    return false
}

const ITEMS_PER_PAGE = 6
export async function fetchFilteredInvoices(
    query: string,
    currentPage: number,
) {
    noStore()

    const offset = (currentPage - 1) * ITEMS_PER_PAGE

    try {
        await connectDB()
        await ClientModel.find()

        const regex = new RegExp(query, 'i')
        const regex2 = isMonth(query) ? new RegExp((monthNameToMonthIndex(query).toString()), 'i') : null

        // Build the search query with proper checks for different field types
        const invoices = await InvoiceModel.aggregate([
            {
                $lookup: {
                    from: 'clients',  // The name of the Client collection
                    localField: 'client_id',
                    foreignField: '_id',
                    as: 'client_info'
                }
            },
            { $unwind: '$client_info' },  // Unwind the client_info array
            {
                $addFields: {
                    client_id: '$client_info'  // Replace client_id with the populated client_info
                }
            },
            {
                $addFields: {
                    year: { $dateToString: { format: "%Y", date: "$due_date" } },  // Extract year from due_date
                    month: { $dateToString: { format: "%m", date: "$due_date" } }, // Extract month from due_date
                    day: { $dateToString: { format: "%d", date: "$due_date" } }    // Extract day from due_date (if needed)
                }
            },
            {
                $match: {
                    $or: [
                        { 'client_id.firstname': { $regex: regex } },
                        { 'client_id.lastname': { $regex: regex } },
                        { 'client_id.email': { $regex: regex } },
                        { status: { $regex: regex } },
                        { year: { $regex: regex } },   // Search by year
                        { month: { $regex: regex2 || regex } },  // Search by month
                        { day: { $regex: regex } }     // Optional: Search by day if needed
                    ]
                }
            },
            { $sort: { due_date: -1 } },
            { $skip: offset },
            { $limit: ITEMS_PER_PAGE }
        ]);

        const formatedInvoices = invoices.map((invoice) => {
            return {
                ...invoice,
                _id: invoice?._id?.toString() || '',
                due_date: invoice?.due_date?.toString() || null
            }
        })

        // console.log({ formatedInvoices })

        return deepClone(formatedInvoices)
    }
    catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch invoices.')
    }
}

export async function fetchInvoicesPages(query: string) {
    noStore()

    try {
        await connectDB()
        await ClientModel.find()

        const regex = new RegExp(query, 'i')
        const regex2 = isMonth(query) ? new RegExp((monthNameToMonthIndex(query).toString()), 'i') : null

        const totalDocuments = await InvoiceModel.aggregate([
            {
                $lookup: {
                    from: 'clients',  // The name of the Client collection
                    localField: 'client_id',
                    foreignField: '_id',
                    as: 'client_info'
                }
            },
            { $unwind: '$client_info' },  // Unwind the client_info array
            {
                $addFields: {
                    client_id: '$client_info'  // Replace client_id with the populated client_info
                }
            },
            {
                $addFields: {
                    year: { $dateToString: { format: "%Y", date: "$due_date" } },  // Extract year from due_date
                    month: { $dateToString: { format: "%m", date: "$due_date" } }, // Extract month from due_date
                    day: { $dateToString: { format: "%d", date: "$due_date" } }    // Extract day from due_date (if needed)
                }
            },
            {
                $match: {
                    $or: [
                        { 'client_id.firstname': { $regex: regex } },
                        { 'client_id.lastname': { $regex: regex } },
                        { 'client_id.email': { $regex: regex } },
                        { status: { $regex: regex } },
                        { year: { $regex: regex } },   // Search by year
                        { month: { $regex: regex2 || regex } },  // Search by month
                        { day: { $regex: regex } }     // Optional: Search by day if needed
                    ]
                }
            },
            { $count: 'total' }  // Instead of returning documents, just return the count
        ]);

        const totalResults = totalDocuments.length > 0 ? totalDocuments[0].total : 0;


        const totalPages = Math.ceil(Number(totalResults) / ITEMS_PER_PAGE)

        return totalPages
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch total number of invoices.')
    }
}

export type FetchInvoicesPages = {
    [K in keyof Invoice]: K extends 'client_id' ? Client : Invoice[K]
}
export async function fetchInvoiceById(id: string) {
    noStore()

    try {
        connectDB()
        const _id = new ObjectId(id)

        console.log({ _id })

        const data = await InvoiceModel.findById(id).populate('client_id')

        const invoice: FetchInvoicesPages = {
            _id: data._id?.toString(),
            amount: data.amount / 100,
            client_id: {
                _id: data.client_id._id.toString(),
                firstname: data.client_id.firstname,
                lastname: data.client_id.lastname,
                contact: data.client_id.contact,
                email: data.client_id.email,
                address: data.client_id.address || ''
            },
            due_date: data.due_date.toString(),
            status: data.status,
        }

        console.log({ invoice })

        return invoice
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch invoice.')
    }
}

export async function fetchClients() {
    noStore()

    try {
        const data = await ClientModel.find()

        return data
    } catch (err) {
        console.error('Database Error:', err)
        throw new Error('Failed to fetch all customers.')
    }
}

// export async function fetchFilteredCustomers(query: string) {
//     noStore()

//     try {
//         const data = await sql<CustomersTableType>`
// 		SELECT
// 		  customers.id,
// 		  customers.name,
// 		  customers.email,
// 		  customers.image_url,
// 		  COUNT(invoices.id) AS total_invoices,
// 		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
// 		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
// 		FROM customers
// 		LEFT JOIN invoices ON customers.id = invoices.customer_id
// 		WHERE
// 		  customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`}
// 		GROUP BY customers.id, customers.name, customers.email, customers.image_url
// 		ORDER BY customers.name ASC
// 	  `

//         const customers = data.rows.map((customer) => ({
//             ...customer,
//             total_pending: formatCurrency(customer.total_pending),
//             total_paid: formatCurrency(customer.total_paid),
//         }))

//         return customers
//     } catch (err) {
//         console.error('Database Error:', err)
//         throw new Error('Failed to fetch customer table.')
//     }
// }

// export async function getUser(email: string) {
//     noStore()

//     try {
//         const user = await sql`SELECT * FROM users WHERE email=${email}`
//         return user.rows[0] as User
//     } catch (error) {
//         console.error('Failed to fetch user:', error)
//         throw new Error('Failed to fetch user.')
//     }
// }
