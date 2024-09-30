import Pagination from '@/ui/invoices/pagination';
import Search from '@/ui/search';
import Table from '@/ui/invoices/table';
import { CreateInvoice } from '@/ui/invoices/buttons';
import { lusitana } from '@/ui/fonts';
import { InvoicesTableSkeleton } from '@/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchInvoicesPages } from '@/lib/data';

export const metadata: Metadata = {
    title: 'Invoices',
};

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchInvoicesPages(query);

    return (
        <div className="w-full">
            {/* <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div> */}
            <div className="bg-white flex gap-12 items-center justify-between p-4 px-8 border-b border-b-[#e0e0e0]">
                {/* <h1 className={`${lusitana.className} text-2xl font-bold`}>Invoices</h1> */}
                <Search placeholder="Search invoices..." />
                <CreateInvoice />
            </div>
            <div className='w-full px-8'>
                <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                    <Table query={query} currentPage={currentPage} />
                </Suspense>
                <div className="mt-5 flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
        </div>
    );
}