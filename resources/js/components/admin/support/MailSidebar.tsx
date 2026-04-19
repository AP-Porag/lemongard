import { useState, useMemo } from 'react';
import MailListItem from '@/components/admin/support/MailListItem';

export default function MailSidebar({
    messages = [],
    onSelect,
    selected,
}: any) {
    const [search, setSearch] = useState('');

    const filteredMessages = useMemo(() => {
        const keyword = search.toLowerCase().trim();

        if (!keyword) return messages;

        return messages.filter((mail: any) => {
            const fullName =
                `${mail.first_name || ''} ${mail.last_name || ''}`.toLowerCase();

            return (
                fullName.includes(keyword) ||
                (mail.subject || '').toLowerCase().includes(keyword) ||
                (mail.message || '').toLowerCase().includes(keyword)
            );
        });
    }, [search, messages]);

    return (
        <div className="flex h-full w-full flex-col">
            {/* SEARCH */}
            <div className="border-b p-4">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Search by name, subject, message..."
                />
            </div>

            {/* LIST */}
            <div className="flex-1 overflow-y-auto">
                {filteredMessages.length > 0 ? (
                    filteredMessages.map((mail: any) => (
                        <MailListItem
                            key={mail.id}
                            mail={mail}
                            active={selected?.id === mail.id}
                            onClick={() => onSelect(mail)}
                        />
                    ))
                ) : (
                    <div className="p-6 text-center text-sm text-gray-500">
                        No messages found
                    </div>
                )}
            </div>
        </div>
    );
}
