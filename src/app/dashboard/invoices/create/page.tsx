import Form from '@/ui/invoices/create-form';
import Breadcrumbs from '@/ui/invoices/breadcrumbs';
import { fetchClients } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'create-invoice',
};

export default async function Page() {
    const Clients = await fetchClients();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/dashboard/invoices' },
                    {
                        label: 'Create Invoice',
                        href: '/dashboard/invoices/create',
                        active: true,
                    },
                ]}
            />
            <Form Clients={Clients} />
        </main>
    );
}