
import { AreaChartHero } from '@/components/AreaChartHero';
import CardWrapper from '@/ui/dashboard/cards';
import LatestInvoices from '@/ui/dashboard/latest-invoices';
import RevenueChart from '@/ui/dashboard/revenue-chart';
import { CardsSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/ui/skeletons';

import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Overview',
};

export default async function Page() {

    return (
        <main className='container max-w-[1120px]'>
            {/* <div className="bg-white flex gap-12 items-center justify-between p-4 px-8 border-b border-b-[#e0e0e0] sticky top-0">
                <div className='p-3 px-8 rounded-md bg-[#f8f8f8] border border-[#e0e0e0]'>card</div>
                <div className='p-3 px-8 rounded-md bg-[#f8f8f8] border border-[#e0e0e0]'>card</div>
                <div className='p-3 px-8 rounded-md bg-[#f8f8f8] border border-[#e0e0e0]'>card</div>
                <div className='p-3 px-8 rounded-md bg-[#f8f8f8] border border-[#e0e0e0]'>card</div>
                <div className='p-3 px-8 rounded-md bg-[#f8f8f8] border border-[#e0e0e0]'>card</div>
                <div className='p-3 px-8 rounded-md bg-[#f8f8f8] border border-[#e0e0e0]'>card</div>
                <div className='p-3 px-8 rounded-md bg-[#f8f8f8] border border-[#e0e0e0]'>card</div>
            </div> */}
            <div className='px-4 py-4'>
                <div className="flex gap-4">
                    <Suspense fallback={<CardsSkeleton />}>
                        <CardWrapper />
                    </Suspense>
                </div>
                <div className="w-full mt-4 bg-white shadow-sm p-8 rounded-lg border border-[#e0e0e0]">
                    <p>Revenue</p>
                    <Suspense fallback={<CardsSkeleton />}>
                        <AreaChartHero />
                    </Suspense>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                    {/* <Suspense fallback={<RevenueChartSkeleton />}>
                        <RevenueChart />
                    </Suspense>
                    <Suspense fallback={<LatestInvoicesSkeleton />}>
                        <LatestInvoices />
                    </Suspense> */}
                </div>
            </div>
        </main >
    );
}

