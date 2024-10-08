
import { CardsSkeleton } from '@/ui/dashboard/components/skeletons';

import { Suspense } from 'react';
import { OverviewBarChart } from '@/ui/dashboard/overview/components/OverviewBarChart';
import { ProgressCards } from '@/ui/dashboard/overview/components/ProgressCards';
import { Card } from '@/tremorComponents/Card';
import { SelectComponent } from '@/ui/dashboard/components/SelectComponent';
import { fetchCardData, fetchCities } from '@/lib/data';
import { fetchRevenue } from '@/lib/data';
import { Revenue } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { fetchBranches } from '@/lib/dbdirect';


export default async function CEOOverview() {
    let data = await fetchCardData()

    const cardData = [
        {
            cardTitle: "Invoices Collected",
            percentValue: data.paidPercentage,
            numalator: data.totalPaidInvoices,
            denominator: data.total
        },
        {
            cardTitle: "Invoices Pending",
            percentValue: data.pendingPercentage,
            numalator: data.totalPendingInvoices,
            denominator: data.total,
            invert: true
        },
        {
            cardTitle: "Profit Margin",
            percentValue: 20,
            numalator: formatCurrency(2000000000),
            denominator: formatCurrency(10000000000),
            fair: true
        },
    ]

    const revenue = await fetchRevenue()
    const chartdata = transformData(revenue)


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
                    <p>Revenue</p>
                    <Suspense fallback={<CardsSkeleton />}>
                        <OverviewBarChart {...{ chartdata }} />
                    </Suspense>
                </div>
            </div>
        </main >
    )
}

export const transformData = (data: Revenue[]) => {
    const transformedData = []

    let i = 0
    while (data.length) {
        if (i >= 50) return []

        const revenue = {
            date: "",
            Lilongwe: 0,
            Blantyre: 0,
            Mzuzu: 0,
        }

        const [LilongweData, BlantyreData, MzuzuData] = data.splice(0, 3)

        revenue.date = LilongweData.month
        revenue.Lilongwe = LilongweData.revenue
        revenue.Blantyre = BlantyreData.revenue
        revenue.Mzuzu = MzuzuData.revenue

        transformedData.push(revenue)

        i++
    }

    return transformedData
}