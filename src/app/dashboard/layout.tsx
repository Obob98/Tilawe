import { getServerSession } from "next-auth"
import SideNav from '@/ui/dashboard/components/Sidenav';
import SessionProvivider from '@/context/SessionProvider'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession()
    return (
        <SessionProvivider session={session}>
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className="w-full flex-none md:w-64">
                    <SideNav />
                </div>
                <div className="flex-grow md:overflow-y-auto relative">
                    {children}
                </div>
            </div>
        </SessionProvivider>
    );
}