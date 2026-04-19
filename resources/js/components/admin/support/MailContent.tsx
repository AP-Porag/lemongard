import { formatMailTime } from '@/utils/helper';

export default function MailContent({ mail, onBack }: any) {
    if (!mail) {
        return (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
                No message selected
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col">
            {/* HEADER */}
            <div className="flex items-start justify-between border-b bg-white p-6">
                <div className="flex items-center gap-3">
                    <button
                        className="text-sm text-gray-500 md:hidden"
                        onClick={onBack}
                    >
                        ← Back
                    </button>

                    {/* <div className="h-10 w-10 rounded-full bg-orange-200" /> */}

                    <div>
                        <p className="font-semibold">
                            {mail?.first_name ?? 'Unknown'}
                        </p>
                        <p className="text-sm text-gray-500">
                            {mail?.subject ?? '-'}
                        </p>
                    </div>
                </div>

                <p className="hidden text-xs text-gray-500 md:block">
                    {formatMailTime(mail?.created_at)}
                </p>
            </div>

            {/* BODY */}
            <div className="flex-1 space-y-4 overflow-y-auto p-6 text-sm text-gray-700">
                <p>{mail?.message ?? mail?.preview}</p>
            </div>

            {/* REPLY */}
            {/* <div className="border-t bg-white p-4">
                <textarea
                    className="w-full resize-none rounded-lg border p-3 text-sm outline-none"
                    rows={3}
                    placeholder="Reply..."
                />

                <div className="mt-3 flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input type="checkbox" className="accent-black" />
                        Mute thread
                    </label>

                    <button className="rounded-lg bg-black px-4 py-2 text-sm text-white">
                        Send
                    </button>
                </div>
            </div> */}
        </div>
    );
}
