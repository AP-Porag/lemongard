import { Link, usePage } from '@inertiajs/react';
import { BadgeCheck, BarChart3, CreditCard, Database, LayoutDashboard, LayoutGrid, PlusCircle,
    Receipt, Search, Table, User, Users, Zap } from 'lucide-react';
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

// const mainNavItems: NavItem[] = [
//     {
//         title: 'Dashboard',
//         href: '/app/dashboard',
//         icon: LayoutGrid,
//     },
// ];

export const mainNavItems:NavItem[] = [
    {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
    },

    {
        title: "User Management",
        icon: Users,
        children: [
            {
                title: "All Users",
                href: "/admin/users",
                icon: User,
            },
            {
                title: "Subscriptions",
                href: "/admin/subscriptions",
                icon: CreditCard,
            },
        ],
    },

    {
        title: "Records Management",
        icon: Database,
        children: [
            {
                title: "All Records",
                href: "/admin/records",
                icon: Table,
            },
            {
                title: "Add Record",
                href: "/admin/records/create",
                icon: PlusCircle,
            },
        ],
    },

    {
        title: "Reports",
        icon: BarChart3,
        children: [
            {
                title: "By Subscriber",
                href: "/admin/reports/subscribers",
                icon: Users,
            },
            {
                title: "By Records",
                href: "/admin/reports/records",
                icon: Database,
            },
        ],
    },

    // {
    //     title: "System",
    //     icon: Settings,
    //     children: [
    //         {
    //             title: "General Settings",
    //             href: "/admin/settings",
    //             icon: Settings2,
    //         },
    //     ],
    // },
];

export const appSidebar:NavItem[] = [
    {
        title: "Dashboard",
        href: "/app/dashboard",
        icon: LayoutDashboard,
    },

    {
        title: "Records",
        icon: Database,
        children: [
            {
                title: "All Records",
                href: "/app/records",
                icon: Search,
            },
            {
                title: "My Records",
                href: "/app/my-records",
                icon: User,
            },
            {
                title: "Add Record",
                href: "/app/records/create",
                icon: PlusCircle,
            },
        ],
    },

    {
        title: "Subscription",
        icon: CreditCard,
        children: [
            {
                title: "My Plan",
                href: "/app/subscription",
                icon: BadgeCheck,
            },
            {
                title: "Billing History",
                href: "/app/billing",
                icon: Receipt,
            },
        ],
    },

    // {
    //     title: "Account",
    //     icon: Settings,
    //     children: [
    //         {
    //             title: "Profile Settings",
    //             href: "/settings/profile",
    //             icon: UserCog",
    //         },
    //         {
    //             title: "Security",
    //             href: "/settings/password",
    //             icon: Lock,
    //         },
    //         {
    //             title: "Two-Factor Auth",
    //             href: "/settings/two-factor",
    //             icon: ShieldCheck,
    //         },
    //     ],
    // },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Upgrade Plan',
        href: '#',
        icon: Zap,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props;
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={auth.user.role === 'admin'?'/admin/dashboard':'/app/dashboard'} prefetch>
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
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
