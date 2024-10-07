
import { CardsSkeleton } from '@/ui/dashboard/components/skeletons';

import { Suspense } from 'react';
import { OverviewBarChart } from '@/ui/dashboard/overview/components/OverviewBarChart';
import { ProgressCards } from '@/ui/dashboard/overview/components/ProgressCards';
import { Card } from '@/tremorComponents/Card';
import { SelectComponent } from '@/ui/dashboard/components/SelectComponent';
import { fetchCardData } from '@/lib/data';
import { fetchRevenue } from '@/lib/data';
import { Revenue } from '@/types';

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

export default async function CEOOverview() {
    // const revenue = await fetchRevenue()
    // console.log({ revenue })

    // const chartdata = transformData(revenue)

    // console.log({ chartdata })

    // const chartdata = revenue.map(({ month, revenue }, index) => (
    //     {
    //         date: month,
    //         Lilongwe: 
    //     }
    // ))

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
            denominator: data.total
        },
    ]

    return (
        <main className='container max-w-[1120px]'>
            <div className='px-4 py-4'>
                <Card className="flex gap-12 items-center justify-start p-4 px-8  sticky top-0 z-40">
                    {/* <h1 className={`${lusitana.className} text-2xl font-bold`}>Inventory</h1> */}
                    <div className="max-w-40">
                        <SelectComponent {...{ data: [], placeholder: 'Select Filter' }} />
                    </div>
                    <div className="max-w-40">
                        <SelectComponent {...{ data: [], placeholder: 'Select Filter' }} />
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


// Mapping of months to structure
const locations = ['Lilongwe', 'Blantyre', 'Mzuzu'];
const monthMap: { [key: string]: string } = {
    Jan: 'Jan 23',
    Feb: 'Feb 23',
    Mar: 'Mar 23',
    Apr: 'Apr 23',
    May: 'May 23',
    Jun: 'Jun 23',
    Jul: 'Jul 23',
    Aug: 'Aug 23',
    Sep: 'Sep 23',
    Oct: 'Oct 23',
    Nov: 'Nov 23',
    Dec: 'Dec 23',
};

// Function to transform the data
const transformData = (data: Revenue[]) => {
    const groupedData: {
        [key: string]: {
            Lilongwe: number,
            Blantyre: number,
            Mzuzu: number
        }
    } = {};

    // Group data by month and location
    data.forEach(item => {
        const monthKey = monthMap[item.month];

        if (!groupedData[monthKey]) {
            groupedData[monthKey] = {
                Lilongwe: 0,
                Blantyre: 0,
                Mzuzu: 0
            };
        }

        // Distribute revenue across locations (for simplicity, alternate)
        const locationIndex = Object.keys(groupedData[monthKey]).length % locations.length;

        // @ts-ignore
        groupedData[monthKey][locations[locationIndex]] += item.revenue / 1000; // convert revenue to 1000s
    });

    // Format the result into the desired array structure
    return Object.keys(groupedData).map(month => ({
        date: month,
        ...groupedData[month]
    }));
};
