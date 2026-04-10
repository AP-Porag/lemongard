// import { Link } from '@inertiajs/react';
// import {
//     SidebarGroup,
//     SidebarGroupLabel,
//     SidebarMenu,
//     SidebarMenuButton,
//     SidebarMenuItem,
// } from '@/components/ui/sidebar';
// import { useCurrentUrl } from '@/hooks/use-current-url';
// import type { NavItem } from '@/types';
//
// export function NavMain({ items = [] }: { items: NavItem[] }) {
//     const { isCurrentUrl } = useCurrentUrl();
//
//     return (
//         <SidebarGroup className="px-2 py-0">
//             <SidebarGroupLabel>Platform</SidebarGroupLabel>
//             <SidebarMenu>
//                 {items.map((item) => (
//                     <SidebarMenuItem key={item.title}>
//                         <SidebarMenuButton
//                             asChild
//                             isActive={isCurrentUrl(item.href)}
//                             tooltip={{ children: item.title }}
//                         >
//                             <Link href={item.href} prefetch>
//                                 {item.icon && <item.icon />}
//                                 <span>{item.title}</span>
//                             </Link>
//                         </SidebarMenuButton>
//                     </SidebarMenuItem>
//                 ))}
//             </SidebarMenu>
//         </SidebarGroup>
//     );
// }

import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { url } = usePage();
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>

            <SidebarMenu>
                {items.map((item) => {
                    const hasChildren = !!item.children?.length;

                    // ✅ Parent is active if any child route matches
                    const isChildActive = item.children?.some(
                        (child) => child.href && url.startsWith(child.href),
                    );

                    // ✅ Open dropdown if child active OR user clicked it
                    const isOpen = openMenu === item.title || isChildActive;

                    // ===============================
                    // Parent with submenu
                    // ===============================
                    if (hasChildren) {
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    isActive={isChildActive}
                                    onClick={() =>
                                        setOpenMenu(isOpen ? null : item.title)
                                    }
                                >
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>

                                    <ChevronRight
                                        className={`ml-auto transition-transform ${
                                            isOpen ? 'rotate-90' : ''
                                        }`}
                                    />
                                </SidebarMenuButton>

                                {isOpen && (
                                    <SidebarMenu className="mt-1 overflow-hidden pl-6">
                                        {item.children!.map((child) => {
                                            const isActive = child.href
                                                ? url.startsWith(child.href)
                                                : undefined;

                                            return (
                                                <SidebarMenuItem
                                                    key={child.title}
                                                >
                                                    <SidebarMenuButton
                                                        asChild
                                                        size="sm"
                                                        isActive={isActive}
                                                        className="w-full overflow-hidden"
                                                    >
                                                        <Link
                                                            href={child.href!}
                                                            prefetch
                                                        >
                                                            {child.icon && (
                                                                <child.icon />
                                                            )}
                                                            <span className="truncate">
                                                                {child.title}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            );
                                        })}
                                    </SidebarMenu>
                                )}
                            </SidebarMenuItem>
                        );
                    }

                    // ===============================
                    // Normal menu (no submenu)
                    // ===============================
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={item.href === url}
                                tooltip={{ children: item.title }}
                            >
                                <Link href={item.href!} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}

