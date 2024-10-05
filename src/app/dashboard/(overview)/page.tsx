import OverviewPage from '@/ui/dashboard/overview/OverviewPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Overview',
};

export default async function Page() {
    return (
        <OverviewPage />
    );
}

