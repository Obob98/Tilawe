import Form from '@/ui/invoices/edit-form';
import Breadcrumbs from '@/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchClients } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'edit-invoice',
};

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [invoice, clients] = await Promise.all([
        fetchInvoiceById(id),
        fetchClients(),
    ]);

    if (!invoice) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/dashboard/invoices' },
                    {
                        label: 'Edit Invoice',
                        href: `/dashboard/invoices/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form invoice={invoice} clients={clients} />
        </main>
    );
}