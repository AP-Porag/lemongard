import { Link, usePage } from '@inertiajs/react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    className?: string;
    activeClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
    ({ href, className, activeClassName, children, ...props }, ref) => {
        const { url } = usePage();

        const isActive = url === href || (href !== '/' && url.startsWith(href));

        return (
            <Link
                ref={ref}
                href={href}
                className={cn(className, isActive && activeClassName)}
                {...props}
            >
                {children}
            </Link>
        );
    },
);

NavLink.displayName = 'NavLink';

export { NavLink };
