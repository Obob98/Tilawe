import { AddIcon, InventoryIcon, InvoiceIcon, NotificationIcon, OverviewIcon, ReviewIcon } from '@/assets/SVGComponents';

export const CEOAnalyticsLinks = [
    { name: 'Analytics', href: '/dashboard', icon: OverviewIcon },
    {
        name: 'Invoices',
        href: '/dashboard/invoices',
        icon: InvoiceIcon,
    },
];

export const CEOWorksSpaceLinks = [
    { name: 'Review Center', href: '/dashboard/reviewcenter', icon: ReviewIcon },
    { name: 'Notifications', href: '/dashboard/notifications', icon: NotificationIcon },
];

export const adminAnalyticsLinks = [
    { name: 'Analytics', href: '/dashboard', icon: OverviewIcon },
    // {
    //     name: 'Invoices',
    //     href: '/dashboard/invoices',
    //     icon: InvoiceIcon,
    // },
    // { name: 'Inventory', href: '/dashboard/inventory', icon: InventoryIcon },
];

export const adminworksSpaceLinks = [
    { name: 'Create', href: '/dashboard/create', icon: AddIcon },
    { name: 'Notifications', href: '/dashboard/notifications', icon: NotificationIcon },
];

export const BranchManagerAnalyticsLinks = [
    { name: 'Analytics', href: '/dashboard', icon: OverviewIcon },
    {
        name: 'Invoices',
        href: '/dashboard/invoices',
        icon: InvoiceIcon,
    },
    { name: 'Inventory', href: '/dashboard/inventory', icon: InventoryIcon },
];

export const BranchManagerWorksSpaceLinks = [
    { name: 'Create', href: '/dashboard/create', icon: AddIcon },
    { name: 'Notifications', href: '/dashboard/notifications', icon: NotificationIcon },
];