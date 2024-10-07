
import AdminOverview from './ConditionalPages/AdminOverview';
import CEOOverview from './ConditionalPages/CEOOverview';
import useServerSession from '@/customHooks/useServerSession';
import { User } from '@/types';

export default async function OverviewPage() {
    const { session } = await useServerSession()

    const user = session?.user as User

    const isCEO = user.role === 'Company Manager'
    const isAdmin = user.role === 'Admin'

    return (
        <>
            {isCEO && <CEOOverview />}
            {isAdmin && <AdminOverview />}
        </>
    )
}
