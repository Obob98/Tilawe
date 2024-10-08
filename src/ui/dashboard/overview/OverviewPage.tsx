
import AdminOverview from './ConditionalPages/AdminOverview';
import BranchManagerOverView from './ConditionalPages/BranchManagerOverView';
import CEOOverview from './ConditionalPages/CEOOverview';
import useServerSession from '@/customHooks/useServerSession';
import { User } from '@/types';
import ProcurementManagerOverView from './ConditionalPages/ProcurementManagerOverView';
import SupplyChainManagerManagerOverView from './ConditionalPages/SupplyChainManagerManagerOverView copy';

export default async function OverviewPage() {
    const { session } = await useServerSession()

    const user = session?.user as User

    const isCEO = user.role === 'Company Manager'
    const isAdmin = user.role === 'Admin'
    const isBranchManager = user.role === 'Branch Manager'
    const isProcurementManager = user.role === 'Procurement Manager'
    const isSupplyChainManager = user.role === 'Supply Chain Manager'

    return (
        <>
            {isCEO && <CEOOverview />}
            {isAdmin && <AdminOverview />}
            {isBranchManager && <BranchManagerOverView />}
            {isProcurementManager && <ProcurementManagerOverView />}
            {isSupplyChainManager && <SupplyChainManagerManagerOverView />}
        </>
    )
}
