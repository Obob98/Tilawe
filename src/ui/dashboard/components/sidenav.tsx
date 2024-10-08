import SideNavProfileDropdown from './SideNavProfileDropdown';

import { RiMenu2Line } from "@remixicon/react";
import { Card } from '@/tremorComponents/Card';
import SideNavLinks from './SideNavLinks';
import SideNavLogoArea from './SideNavLogoArea';
import useServerSession from '@/customHooks/useServerSession';
import { User } from '@/types';
import { fetchNotifications } from '@/lib/dbdirect';

export default async function SideNav() {
  const { session } = await useServerSession()

  const { _id, username, role } = session?.user as User
  const notifications = await fetchNotifications(_id)

  return (
    <Card className="w-full h-full flex flex-row md:flex-col  sticky top-0 left-0 p-0 rounded-none">

      <SideNavLogoArea />

      <div className="w-full h-full gap-2 grow flex-row  md:flex-col  pt-8 hidden md:flex">
        <SideNavLinks {...{ role, _id, showNotificationBadge: notifications.length > 0 }} />
      </div>

      <SideNavProfileDropdown {...{ username, role, }} />
    </Card >
  );
}
