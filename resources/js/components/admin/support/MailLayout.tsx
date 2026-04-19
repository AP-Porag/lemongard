import { useState } from 'react';
import MailSidebar from '@/components/admin/support/MailSidebar';
import MailContent from '@/components/admin/support/MailContent';

export default function MailLayout({ messages }: any) {
    const [selectedMail, setSelectedMail] = useState<any>(null);
    const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');

    const handleSelect = (mail: any) => {
        setSelectedMail(mail);
        setMobileView('detail');
    };

    const handleBack = () => {
        setMobileView('list');
        setSelectedMail(null);
    };

    return (
        <div className="flex h-screen w-full bg-gray-50">
            {/* SIDEBAR */}
            <div
                className={`w-full bg-white md:w-[380px] md:border-r ${mobileView === 'detail' ? 'hidden md:flex' : 'flex'} `}
            >
                <MailSidebar
                    messages={messages}
                    onSelect={handleSelect}
                    selected={selectedMail}
                />
            </div>

            {/* CONTENT */}
            <div
                className={`flex flex-1 flex-col ${mobileView === 'list' ? 'hidden md:flex' : 'flex'} `}
            >
                {selectedMail ? (
                    <MailContent mail={selectedMail} onBack={handleBack} />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                        Select a message to view
                    </div>
                )}
            </div>
        </div>
    );
}
