import { fetchClients } from '@/lib/dbdirect';
import { Metadata } from 'next';
import { VisualizerWithWrapper } from '../db/page';

export const metadata: Metadata = {
    title: 'Clients',
};

export default async function Clients() {
    const clients = await fetchClients()

    console.log({ clients })

    return (
        <main className='space-y-8'>
            <VisualizerWithWrapper {...{ data: clients, title: 'clients' }} />
        </main>
    )
}