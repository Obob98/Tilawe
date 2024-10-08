import {
    Branch, Client, Employee, Invoice, Inventory, Item, PaymentMethod, Payment, Product, ProductSold, PurchasedItem, PurchaseTransaction, Supplier, Revenue, SalesTransaction,
    Salary
} from '@/types'
import { deepClone, formatCurrency, formatDateToLocal } from './utils'
import { unstable_noStore as noStore } from 'next/cache'
import RevenueModel from '../db/models/RevenueModel'
import InvoiceModel from '../db/models/InvoiceModel'
import ClientModel from '../db/models/ClientModel'
import { ObjectId } from 'mongodb'
import { BranchModel, EmployeeModel, InventoryModel, PaymentMethodModel, ProductModel, PurchasedItemsModel, PurchaseTransactionModel, SalesTransactionModel, SupplierModel } from '../db/models'
import SalaryModel from '../db/models/SalaryModel'
import connectDB from '../db/config/connectDB'
import UserModel from '@/db/models/UserModel'

export type FetchRevenueReturnType = {
    [K in keyof Revenue]: K extends 'revenue' ? string : Revenue[K]
}
export async function fetchRevenue(): Promise<Revenue[]> {
    noStore()

    try {
        connectDB()
        const data: Revenue[] = await RevenueModel.find()

        return data.map(({ _id, month, revenue, city }) => (
            {
                _id: _id?.toString(),
                // month: formatDateToLocal(month),
                month,
                revenue,
                city
            }
        ))
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch revenue data.')
    }
}

export type FetchLatestInvoicesReturnType = { amount: string, client: Client, status: "paid" | "pending" }

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

        const clientCountPromise = ClientModel.countDocuments()

        const invoiceStatusPromise: Promise<{ paid: number, pending: number, total: number }> =
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

                return { paid: paidTotal, pending: pendingTotal, total: paidTotal + pendingTotal }
            })()

        const data = await Promise.all([
            invoiceCountPromise,
            clientCountPromise,
            invoiceStatusPromise,
        ])

        const numberOfInvoices = Number(data[0] ?? '0')
        const numberOfCustomers = Number(data[1] ?? '0')
        const totalPaidInvoices = formatCurrency(data[2].paid ?? '0')
        const totalPendingInvoices = formatCurrency(data[2].pending ?? '0')
        const total = formatCurrency(data[2].total ?? '0')

        const paidPercentage = Math.floor((data[2].paid * 100) / data[2].total)
        const pendingPercentage = Math.ceil((data[2].pending * 100) / data[2].total)

        return {
            numberOfCustomers,
            numberOfInvoices,
            totalPaidInvoices,
            totalPendingInvoices,
            total,
            paidPercentage,
            pendingPercentage
        }
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch card data.')
    }
}

export async function fetchCities() {
    noStore()

    try {
        connectDB()
        const data = await BranchModel.find().distinct('city')

        return data
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch the latest invoices.')
    }
}

export async function fetchAdminAnalytics() {
    noStore()

    try {
        connectDB()
        const totalBranches = await BranchModel.find().countDocuments()
        const totalEmployees = await EmployeeModel.find().countDocuments()
        const totalUsers = await UserModel.find().countDocuments()
        const paymentMethods = await PaymentMethodModel.find().countDocuments()

        return {
            totalBranches,
            paymentMethods,
            totalEmployees,
            totalUsers
        }
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch the latest invoices.')
    }
}

export async function fetchShopManagerAnalytics() {
    noStore()

    try {
        connectDB()
        const totalInvoices = await InvoiceModel.find().countDocuments()
        const totalSalesTransactions = await SalesTransactionModel.find().countDocuments()

        return {
            totalInvoices,
            totalSalesTransactions
        }
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch the latest invoices.')
    }
}

export async function fetchProcurementManagerAnalytics() {
    noStore()

    try {
        connectDB()

        return {
            totalPurchaseTransactions: 89,
            totalInvoices: 7
        }
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch the latest invoices.')
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

const ITEMS_PER_PAGE = 8
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

export type FetchInvoicesById = {
    [K in keyof Invoice]: K extends 'client_id' ? Client : Invoice[K]
}

export async function fetchInvoiceById(id: string) {
    noStore()

    try {
        connectDB()
        const _id = new ObjectId(id)

        const data = await InvoiceModel.findById(id).populate('client_id')

        const invoice: FetchInvoicesById = {
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

        return invoice
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch invoice.')
    }
}

export async function fetchFilteredInventory(
    query: string,
    currentPage: number,
) {
    noStore()

    const offset = (currentPage - 1) * ITEMS_PER_PAGE

    try {
        await connectDB()
        await ProductModel.find()

        const regex = new RegExp(query, 'i')

        // Build the search query with proper checks for different field types
        const inventory = await InventoryModel.aggregate([
            {
                $lookup: {
                    from: 'products',  // The name of the Client collection
                    localField: 'product_id',
                    foreignField: '_id',
                    as: 'product_info'
                }
            },
            { $unwind: '$product_info' },  // Unwind the client_info array
            {
                $addFields: {
                    product_id: '$product_info'  // Replace client_id with the populated client_info
                }
            },
            {
                $match: {
                    $or: [
                        { 'product_id.name': { $regex: regex } },
                        { 'product_id.type': { $regex: regex } },
                        { 'product_id.price': { $regex: regex } },
                        { quantity: { $regex: regex } }
                    ]
                }
            },
            { $sort: { quantity: -1 } },
            { $skip: offset },
            { $limit: ITEMS_PER_PAGE }
        ]);

        const formatedInventory = inventory.map((invoice) => {
            return {
                ...invoice,
                _id: invoice?._id?.toString() || '',
            }
        })

        return deepClone(formatedInventory)
    }
    catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch Inventory.')
    }
}

export async function fetchLatestPurchasedItems(
    query: string,
    currentPage: number,
) {
    noStore()

    const offset = (currentPage - 1) * ITEMS_PER_PAGE

    try {
        await connectDB()

        const regex = new RegExp(query, 'i')

        // Build the search query with proper checks for different field types
        const purchasedItems: PurchasedItem[] = await PurchasedItemsModel.aggregate([
            {
                $lookup: {
                    from: 'items',  // The name of the Client collection
                    localField: 'item_id',
                    foreignField: '_id',
                    as: 'item_info'
                }
            },
            { $unwind: '$item_info' },  // Unwind the client_info array
            {
                $addFields: {
                    item_id: '$item_info'  // Replace client_id with the populated client_info
                }
            },
            {
                $match: {
                    $or: [
                        { 'item_id.name': { $regex: regex } },
                        { 'item_id.type': { $regex: regex } },
                        { 'item_id.price': { $regex: regex } },
                        { quantity: { $regex: regex } }
                    ]
                }
            },
            { $sort: { quantity: -1 } },
            { $skip: offset },
            { $limit: ITEMS_PER_PAGE }
        ]);

        const formatedPurchasedItems = purchasedItems.map(({ _id, item_id, purchase_transaction_id, quantity, unit_price }) => {
            return {
                item_id,
                purchase_transaction_id,
                quantity,
                unit_price,
                _id: _id?.toString() || '',
            }
        })

        return deepClone(formatedPurchasedItems)
    }
    catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch Inventory.')
    }
}

// export async function fetchTopSuppliers(
//     query: string,
//     currentPage: number,
// ) {
//     noStore()

//     const offset = (currentPage - 1) * ITEMS_PER_PAGE

//     try {
//         await connectDB()

//         const regex = new RegExp(query, 'i')

//         // Build the search query with proper checks for different field types
//         const purchasedItems: PurchasedItem[] = await PurchasedItemsModel.aggregate([
//             {
//                 $lookup: {
//                     from: 'items',  // The name of the Client collection
//                     localField: 'item_id',
//                     foreignField: '_id',
//                     as: 'item_info'
//                 }
//             },
//             { $unwind: '$item_info' },  // Unwind the client_info array
//             {
//                 $addFields: {
//                     item_id: '$item_info'  // Replace client_id with the populated client_info
//                 }
//             },
//             {
//                 $match: {
//                     $or: [
//                         { 'item_id.name': { $regex: regex } },
//                         { 'item_id.type': { $regex: regex } },
//                         { 'item_id.price': { $regex: regex } },
//                         { quantity: { $regex: regex } }
//                     ]
//                 }
//             },
//             { $sort: { quantity: -1 } },
//             { $skip: offset },
//             { $limit: ITEMS_PER_PAGE }
//         ]);

//         console.log({ purchasedItems })
//         const formatedPurchasedItems = purchasedItems.map(({ _id, item_id, purchase_transaction_id, quantity, unit_price }) => {
//             return {
//                 item_id,
//                 purchase_transaction_id,
//                 quantity,
//                 unit_price,
//                 _id: _id?.toString() || '',
//             }
//         })

//         console.log({ formatedPurchasedItems })

//         return deepClone(formatedPurchasedItems)
//     }
//     catch (error) {
//         console.error('Database Error:', error)
//         throw new Error('Failed to fetch Inventory.')
//     }
// }

export async function fetchFilteredInventoryPages(
    query: string,
    currentPage: number,
) {
    noStore()

    const offset = (currentPage - 1) * ITEMS_PER_PAGE

    try {
        await connectDB()
        await ProductModel.find()

        const regex = new RegExp(query, 'i')
        const regex2 = isMonth(query) ? new RegExp((monthNameToMonthIndex(query).toString()), 'i') : null

        // Build the search query with proper checks for different field types
        const totalDocuments = await InventoryModel.aggregate([
            {
                $lookup: {
                    from: 'products',  // The name of the Client collection
                    localField: 'product_id',
                    foreignField: '_id',
                    as: 'product_info'
                }
            },
            { $unwind: '$product_info' },  // Unwind the client_info array
            {
                $addFields: {
                    product_id: '$product_info'  // Replace client_id with the populated client_info
                }
            },
            {
                $match: {
                    $or: [
                        { 'product_id.name': { $regex: regex } },
                        { 'product_id.type': { $regex: regex } },
                        { 'product_id.price': { $regex: regex } },
                    ]
                }
            },
            { $count: 'total' }  // Instead of returning documents, just return the count
        ]);

        const totalResults = totalDocuments.length > 0 ? totalDocuments[0].total : 0;


        const totalPages = Math.ceil(Number(totalResults) / ITEMS_PER_PAGE)

        return totalPages
    }
    catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch invoices.')
    }
}

export async function fetchClients() {
    noStore()

    try {
        connectDB()
        const data: Client[] = await ClientModel.find()

        return data.map(({ _id, firstname, lastname, contact, email, address }) => (
            { _id: _id?.toString(), firstname, lastname, contact, email, address }
        ))
    } catch (err) {
        console.error('Database Error:', err)
        throw new Error('Failed to fetch all clients.')
    }
}



