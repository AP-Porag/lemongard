import { Link, usePage } from '@inertiajs/react';
import {
    BadgeCheck,
    BarChart3,
    CreditCard,
    Database,
    Factory,
    LayoutDashboard,
    PlusCircle,
    Receipt,
    Search,
    Table,
    User,
    Users,
    Zap,
} from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';
import AppLogo from './app-logo';

export const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'User Management',
        icon: Users,
        children: [
            {
                title: 'All Users',
                href: '/admin/users',
                icon: User,
            },
            {
                title: 'Subscriptions',
                href: '/admin/subscriptions',
                icon: CreditCard,
            },
        ],
    },
    {
        title: 'Industries',
        href: '/admin/industries',
        icon: Factory,
    },
    {
        title: 'Records Management',
        icon: Database,
        children: [
            {
                title: 'All Records',
                href: '/admin/records',
                icon: Table,
            },
            {
                title: 'Add Record',
                href: '/admin/records/create',
                icon: PlusCircle,
            },
        ],
    },
    {
        title: 'Reports',
        icon: BarChart3,
        children: [
            {
                title: 'By Subscriber',
                href: '/admin/reports/subscribers',
                icon: Users,
            },
            {
                title: 'By Records',
                href: '/admin/reports/records',
                icon: Database,
            },
        ],
    },
];

export const appSidebar: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/app/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Records',
        icon: Database,
        children: [
            {
                title: 'All Records',
                href: '/app/records',
                icon: Search,
            },
            {
                title: 'My Records',
                href: '/app/my/records',
                icon: User,
            },
            {
                title: 'Add Record',
                href: '/app/records/create',
                icon: PlusCircle,
            },
        ],
    },
    {
        title: 'Subscription',
        icon: CreditCard,
        children: [
            {
                title: 'My Plan',
                href: '/app/subscription',
                icon: BadgeCheck,
            },
            {
                title: 'Billing History',
                href: '/app/billing',
                icon: Receipt,
            },
        ],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Upgrade Plan',
        href: '/app/subscription',
        icon: Zap,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props as any;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link
                                href={
                                    auth.user.role === 'admin'
                                        ? '/admin/dashboard'
                                        : '/app/dashboard'
                                }
                                prefetch
                            >
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {auth.user.role === 'admin' ? (
                    <NavMain items={mainNavItems} />
                ) : (
                    <NavMain items={appSidebar} />
                )}
            </SidebarContent>
            <SidebarFooter>
                {auth.user.role === 'user' && (
                    <div className="rounded-xl bg-gray-100 p-4">
                        <h3 className="text-sm font-semibold text-gray-900">
                            Grow with LemonGard
                        </h3>

                        <p className="mt-1 text-xs leading-relaxed text-gray-600">
                            Unlock full access to shared industry data, add your
                            own records, and manage everything in one place.
                        </p>

                        <Link
                            href="/app/subscription"
                            className="mt-3 block w-full rounded-lg bg-black px-3 py-2 text-center text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                Upgrade Plan
                            </span>
                        </Link>
                    </div>
                )}

                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
