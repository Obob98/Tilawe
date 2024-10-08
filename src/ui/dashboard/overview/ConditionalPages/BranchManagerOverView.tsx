
import { CardsSkeleton } from '@/ui/dashboard/components/skeletons';

import { Suspense } from 'react';
import { ProgressCards } from '@/ui/dashboard/overview/components/ProgressCards';
import { Card } from '@/tremorComponents/Card';
import { SelectComponent } from '@/ui/dashboard/components/SelectComponent';
import { fetchCities, fetchRevenue, fetchShopManagerAnalytics } from '@/lib/data';
import { fetchBranches } from '@/lib/dbdirect';
import { AdminTrackerChart } from '../components/AdminTrackerChart';
import { OverviewBarChart } from '../components/OverviewBarChart';
import { transformData } from './CEOOverview';

export default async function BranchManagerOverView() {
    // return <p>Admin Overview</p>
    let { totalInvoices, totalSalesTransactions } = await fetchShopManagerAnalytics()

    const revenue = await fetchRevenue()
    const chartdata = transformData(revenue)

    const data = chartdata.map(({ date, Lilongwe }) => (
        {
            date, "Maula Mall, shop 1": Lilongwe
        }
    ))

    const cardData = [
        {
            cardTitle: "Total Invoices",
            numalator: totalInvoices,
        },
        {
            cardTitle: "Total Sales Transactions",
            numalator: 123,
        },
        {
            cardTitle: "Total Employees",
            numalator: 9,
        },
    ]

    let cities = await fetchCities()
    cities = cities.map(city => (
        {
            label: city,
            value: city
        }
    ))

    let branches: any[] = await fetchBranches()
    branches = branches.map(branch => (
        {
            label: branch.address,
            value: branch._id
        }
    ))

    return (
        <main className='container max-w-[1120px]'>
            <div className='px-4 py-4'>
                <Card className="flex gap-12 items-center justify-start p-4 px-8  sticky top-0 z-40">
                    {/* <h1 className={`${lusitana.className} text-2xl font-bold`}>Inventory</h1> */}
                    <div className="max-w-40">
                        <SelectComponent {...{ data: cities, placeholder: 'Select City' }} />
                    </div>
                    <div className="max-w-40">
                        <SelectComponent {...{ data: branches, placeholder: 'Select Branch' }} />
                    </div>
                    <div className="max-w-40">
                        <SelectComponent {...{ data: [], placeholder: 'Select Filter' }} />
                    </div>
                </Card>
                <div className="flex gap-4 mt-4">
                    <Suspense fallback={<CardsSkeleton />}>
                        <ProgressCards {...{ data: cardData }} />
                    </Suspense>
                </div>
                <div className="w-full mt-4 bg-white shadow-sm p-8 rounded-lg border border-[#e0e0e0]">
                    <p className='pb-8'>Systmem Perfomance</p>
                    <Suspense fallback={<CardsSkeleton />}>
                        <OverviewBarChart {...{ chartdata: data }} />
                    </Suspense>
                </div>
            </div>
        </main >
    )
}


