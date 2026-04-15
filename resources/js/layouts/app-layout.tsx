// import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
// import type { AppLayoutProps } from '@/types';
// import { useEffect } from 'react';
// import { usePage } from '@inertiajs/react';
// import { toast } from 'sonner'; // shadcn toast

// export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
//     <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
//         {children}
//     </AppLayoutTemplate>
// );

import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';

export default function AppLayout({
    children,
    breadcrumbs,
    ...props
}: AppLayoutProps) {
    const { props: pageProps } = usePage();

    const success = pageProps.flash?.success;
    const error = pageProps.flash?.error;
    const warning = pageProps.flash?.warning;

    useEffect(() => {
        if (!success && !error && !warning) return;

        const timer = setTimeout(() => {
            if (success) toast.success(success);
            if (error) toast.error(error);
            if (warning) toast.warning(warning);
        }, 50);

        return () => clearTimeout(timer);
    }, [success, error, warning]);

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
        </AppLayoutTemplate>
    );
}
