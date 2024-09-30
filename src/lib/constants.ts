import { AddIcon, InventoryIcon, InvoiceIcon, NotificationIcon, OverviewIcon } from '@/assets/SVGComponents';

export const analyticsLinks = [
    { name: 'Overview', href: '/dashboard', icon: OverviewIcon },
    {
        name: 'Invoices',
        href: '/dashboard/invoices',
        icon: InvoiceIcon,
    },
    { name: 'Inventory', href: '/dashboard/inventory', icon: InventoryIcon },
];

export const worksSpaceLinks = [
    { name: 'Create', href: '/dashboard/create', icon: AddIcon },
    { name: 'Notifications', href: '/dashboard/notifications', icon: NotificationIcon },
];