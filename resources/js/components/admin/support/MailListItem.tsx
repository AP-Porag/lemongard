import { formatMailTime } from '@/utils/helper';

export default function MailListItem({ mail, active, onClick }: any) {
    const fullName = `${mail.first_name || ''} ${mail.last_name || ''}`.trim();

    // 30 word preview
    const preview =
        mail.message?.split(' ').slice(0, 30).join(' ') +
        (mail.message?.split(' ').length > 30 ? '...' : '');

    return (
        <div
            onClick={onClick}
            className={`cursor-pointer border-b p-4 hover:bg-gray-50 ${
                active ? 'bg-gray-100' : ''
            }`}
        >
            {/* NAME */}
            <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">{fullName}</p>

                <span className="text-xs text-gray-400">
                    {formatMailTime(mail?.created_at)}
                </span>
            </div>

            {/* SUBJECT */}
            <p className="mt-1 text-sm font-medium text-gray-800">
                {mail.subject}
            </p>

            {/* MESSAGE PREVIEW */}
            <p className="mt-1 line-clamp-2 text-xs text-gray-500">{preview}</p>

            {/* STATUS */}
            <div className="mt-2">
                <span
                    className={`rounded-full px-2 py-0.5 text-[11px] ${
                        mail.status === 'unread'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-200 text-gray-600'
                    }`}
                >
                    {mail.status || 'read'}
                </span>
            </div>
        </div>
    );
}
