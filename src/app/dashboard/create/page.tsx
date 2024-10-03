import Pagination from '@/ui/invoices/pagination';
import Search from '@/ui/search';
import Table from '@/ui/inventory/table';
import { CreateInvoice } from '@/ui/invoices/buttons';
import { lusitana } from '@/ui/fonts';
import { InvoicesTableSkeleton } from '@/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchClients, fetchFilteredInventoryPages, fetchInvoicesPages } from '@/lib/data';
import { SelectComponent } from '@/components/SelectComponent';
import TabsComponent from '@/components/TabsComponent';
import { fetchBranches, fetchImployees, fetchSalaries } from '@/lib/dbdirect';

export const metadata: Metadata = {
    title: 'Invoices',
};

export default async function Create({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const Clients = await fetchClients();
    const Branches = await fetchBranches();
    const Salaries = await fetchSalaries();
    const Employees = await fetchImployees()

    return (
        <div className="w-full">
            <div className="p">
                <TabsComponent {...{ Clients, Branches, Salaries, Employees }} />
            </div>
        </div>
    );
}