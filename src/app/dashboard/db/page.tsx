import RelayCard from '@/dev/RelayCard';
import { fetchRevenue, fetchBranches, fetchClients, fetchItems, fetchPaymentsMethods, fetchProducts, fetchSuppliers, fetchImployees, fetchInvoices, fetchInventory, fetchPayments, fetchProductsSold, fetchIPurchasedtems, fetchPurchaseTransactions, fetchISalesTransactions } from '@/lib/dbdirect';

export default async function DB() {
    const revenue = await fetchRevenue()
    const branches = await fetchBranches()
    const clients = await fetchClients()
    const items = await fetchItems()
    const paymentMethods = await fetchPaymentsMethods()
    const products = await fetchProducts()
    const suppliers = await fetchSuppliers()
    const inventory = await fetchInventory()
    const employees = await fetchImployees()
    const invoices = await fetchInvoices()
    const payments = await fetchPayments()
    const productsSold = await fetchProductsSold()
    const purchasedItems = await fetchIPurchasedtems()
    const purchasedTransactions = await fetchPurchaseTransactions()
    const salesTransactions = await fetchISalesTransactions()

    console.log({ invoices })

    return (
        <main className='space-y-8'>
            <VisualizerWithWrapper {...{ data: revenue, title: 'revenue' }} />
            <VisualizerWithWrapper {...{ data: branches, title: 'branches' }} />
            <VisualizerWithWrapper {...{ data: clients, title: 'clients' }} />
            <VisualizerWithWrapper {...{ data: items, title: 'items' }} />
            <VisualizerWithWrapper {...{ data: paymentMethods, title: 'payment methods' }} />
            <VisualizerWithWrapper {...{ data: products, title: 'products' }} />
            <VisualizerWithWrapper {...{ data: inventory, title: 'inventory' }} />
            <VisualizerWithWrapper {...{ data: suppliers, title: 'suppliers' }} />
            <VisualizerWithWrapper {...{ data: employees, title: 'employees' }} />
            <VisualizerWithWrapper {...{ data: invoices, title: 'invoices' }} />
            <VisualizerWithWrapper {...{ data: payments, title: 'payments' }} />
            <VisualizerWithWrapper {...{ data: productsSold, title: 'products Sold' }} />
            <VisualizerWithWrapper {...{ data: purchasedItems, title: 'purchased Items' }} />
            <VisualizerWithWrapper {...{ data: purchasedTransactions, title: 'purchase Transactions' }} />
            <VisualizerWithWrapper {...{ data: salesTransactions, title: 'sales Transactions' }} />
        </main>
    )
}

function Visualizer({ data }: { data: any[] }) {
    return (
        <>
            {
                data
                    .map((value, i) => (
                        <RelayCard
                            key={i}
                            {...{ containerStyles: 'flex-1 flex  items-center gap-4  p-8 rounded-3xl  max-w-[1120px] items-center shadow-md' }}
                        >
                            {
                                Object.entries(value as (string | number)[])
                                    .map(([key, value]) => (
                                        <div
                                            key={key}
                                            className='flex items-center gap-2 text-nowrap justify-between'
                                        >
                                            <h3 className='font-semibold'>{key}</h3>
                                            <h3 className='font-bold'>-</h3>
                                            <p>{value}</p>
                                        </div>
                                    ))
                            }
                        </RelayCard>
                    ))
            }
        </>
    )
}

export function VisualizerWithWrapper({ data, title }: { data: any[], title?: string }) {
    return (
        <section className='p-8 bg-gray-100 rounded-xl '>
            {
                title && <h2 className='text-2xl font-bold pb-4'>{title.toUpperCase()}</h2>
            }
            <div className='w-full rounded-xl overflow-x-auto p-8'>
                <div className='w-fit flex gap-8'>
                    <Visualizer {...{ data }} />
                </div>
            </div>
        </section>
    )
}