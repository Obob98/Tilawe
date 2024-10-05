
import { AreaChartHero } from '@/ui/dashboard/overview/components/AreaChartHero';
import CardWrapper from '@/ui/dashboard/overview/components/cards';
import { CardsSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/ui/dashboard/components/skeletons';

import { Suspense } from 'react';
import { OverviewBarChart } from './components/OverviewBarChart';
import { ProgressCards } from './components/ProgressCards';
// import { fetchRevenue } from '@/lib/data';

const chartdata = [
    {
        date: "Jan 23",
        Lilongwe: 2890,
        Blantyre: 2338,
        Mzuzu: 2108,
    },
    {
        date: "Feb 23",
        Lilongwe: 2756,
        Blantyre: 2103,
        Mzuzu: 2103,
    },
    {
        date: "Mar 23",
        Lilongwe: 3322,
        Blantyre: 2194,
        Mzuzu: 2104,
    },
    {
        date: "Apr 23",
        Lilongwe: 3470,
        Blantyre: 2108,
        Mzuzu: 2108,
    },
    {
        date: "May 23",
        Lilongwe: 3475,
        Blantyre: 1812,
        Mzuzu: 1102,
    },
    {
        date: "Jun 23",
        Lilongwe: 3129,
        Blantyre: 1726,
        Mzuzu: 1106,
    },
    {
        date: "Jul 23",
        Lilongwe: 3490,
        Blantyre: 1982,
        Mzuzu: 1102,
    },
    {
        date: "Aug 23",
        Lilongwe: 2903,
        Blantyre: 2012,
        Mzuzu: 2102,
    },
    {
        date: "Sep 23",
        Lilongwe: 2643,
        Blantyre: 2342,
        Mzuzu: 2102,
    },
]

export default async function OverviewPage() {
    // const revenue = await fetchRevenue()

    // console.log({ revenue })

    return (
        <main className='container max-w-[1120px]'>
            <div className='px-4 py-4'>
                <div className="flex gap-4">
                    <Suspense fallback={<CardsSkeleton />}>
                        {/* <CardWrapper /> */}
                        <ProgressCards />
                    </Suspense>
                </div>
                <div className="w-full mt-4 bg-white shadow-sm p-8 rounded-lg border border-[#e0e0e0]">
                    <p>Revenue</p>
                    <Suspense fallback={<CardsSkeleton />}>
                        {/* <AreaChartHero /> */}
                        <OverviewBarChart {...{ chartdata }} />
                    </Suspense>
                </div>
            </div>
        </main >
    )
}
