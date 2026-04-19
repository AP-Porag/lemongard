import AppLayout from '@/layouts/app-layout';
import MailLayout from '@/components/admin/support/MailLayout';

export default function Index({ messages }: any) {
    return (
        <AppLayout>
            <MailLayout messages={messages} />
        </AppLayout>
    );
}
