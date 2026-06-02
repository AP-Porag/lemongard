import AppLayout from '@/layouts/app-layout';
import MailLayout from '@/components/admin/support/MailLayout';
import type { BreadcrumbItem } from '@/types';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Support',
        href: '',
    },
];

export default function Index({ messages }: any) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <MailLayout messages={messages} />
        </AppLayout>
    );
}
