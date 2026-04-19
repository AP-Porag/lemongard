import { GlobalConstant } from '@/utils/GlobalConstant';
import { formatMailTime } from '@/utils/helper';
import { router } from '@inertiajs/react';

export default function MailListItem({ mail, active, onClick }: any) {
    const fullName = `${mail.first_name || ''} ${mail.last_name || ''}`.trim();

    // 30 word preview
    const preview =
        mail.message?.split(' ').slice(0, 30).join(' ') +
        (mail.message?.split(' ').length > 30 ? '...' : '');

    const handleClick = () => {
        onClick?.();

        if (mail.status === 'unread') {
            router.post(
                `/admin/support/${mail.id}/status`,
                {
                    status: 'read',
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                },
            );
        }
    };

    const handleResolve = (e: any) => {
        e.stopPropagation();

        router.post(
            `/admin/support/${mail.id}/status`,
            {
                status: 'resolved',
            },
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    return (
        <div
            onClick={handleClick}
            className={`cursor-pointer border-b p-4 hover:bg-gray-50 ${
                active ? 'bg-gray-100' : ''
            }`}
        >
            {/* NAME + RESOLVE */}
            <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">{fullName}</p>

                <div className="flex items-center gap-3">
                    {/* RESOLVE SECTION */}
                    <div className="flex items-center gap-1">
                        <input
                            type="checkbox"
                            checked={mail.status === GlobalConstant.RESOLVED}
                            onChange={handleResolve}
                            onClick={(e) => e.stopPropagation()}
                            className="h-3 w-3 cursor-pointer"
                        />

                        <span
                            onClick={(e) => {
                                e.stopPropagation();
                                handleResolve(e);
                            }}
                            className="cursor-pointer text-[11px] text-gray-500 hover:text-gray-700"
                        >
                            Click to resolve
                        </span>
                    </div>

                    {/* SEPARATOR */}
                    <span className="text-gray-300">•</span>
                </div>
            </div>

            {/* SUBJECT */}
            <p className="mt-1 text-sm font-medium text-gray-800">
                {mail.subject}
            </p>

            {/* MESSAGE PREVIEW */}
            <p className="mt-1 line-clamp-2 text-xs text-gray-500">{preview}</p>

            {/* STATUS + TIME */}
            <div className="mt-2 flex items-center gap-2">
                {/* STATUS */}
                <span
                    className={`rounded-full px-2 py-0.5 text-[11px] ${
                        mail.status === 'unread'
                            ? 'bg-blue-100 text-blue-600'
                            : mail.status === 'resolved'
                              ? 'bg-green-100 text-green-600'
                              : 'bg-gray-200 text-gray-600'
                    }`}
                >
                    {mail.status || 'read'}
                </span>

                {/* DOT */}
                <span className="text-gray-300">•</span>

                {/* PUSH TIME TO END */}
                <span className="ml-auto text-xs text-gray-400">
                    {formatMailTime(mail?.created_at)}
                </span>
            </div>
        </div>
    );
}

// import { formatMailTime } from '@/utils/helper';

// // export default function MailListItem({ mail, active, onClick }: any) {
// //     const fullName = `${mail.first_name || ''} ${mail.last_name || ''}`.trim();

// //     // 30 word preview
// //     const preview =
// //         mail.message?.split(' ').slice(0, 30).join(' ') +
// //         (mail.message?.split(' ').length > 30 ? '...' : '');

// //     return (
// //         <div
// //             onClick={onClick}
// //             className={`cursor-pointer border-b p-4 hover:bg-gray-50 ${
// //                 active ? 'bg-gray-100' : ''
// //             }`}
// //         >
// //             {/* NAME */}
// //             <div className="flex items-center justify-between">
// //                 <p className="text-lg font-semibold">{fullName}</p>

// //                 <span className="text-xs text-gray-400">
// //                     {formatMailTime(mail?.created_at)}
// //                 </span>
// //             </div>

// //             {/* SUBJECT */}
// //             <p className="mt-1 text-sm font-medium text-gray-800">
// //                 {mail.subject}
// //             </p>

// //             {/* MESSAGE PREVIEW */}
// //             <p className="mt-1 line-clamp-2 text-xs text-gray-500">{preview}</p>

// //             {/* STATUS */}
// //             <div className="mt-2">
// //                 <span
// //                     className={`rounded-full px-2 py-0.5 text-[11px] ${
// //                         mail.status === 'unread'
// //                             ? 'bg-blue-100 text-blue-600'
// //                             : 'bg-gray-200 text-gray-600'
// //                     }`}
// //                 >
// //                     {mail.status || 'read'}
// //                 </span>
// //             </div>
// //         </div>
// //     );
// // }

// import { formatMailTime } from '@/utils/helper';
// import { router } from '@inertiajs/react';

// export default function MailListItem({ mail, active, onClick }: any) {
//     const fullName = `${mail.first_name || ''} ${mail.last_name || ''}`.trim();

//     // 30 word preview
//     const preview =
//         mail.message?.split(' ').slice(0, 30).join(' ') +
//         (mail.message?.split(' ').length > 30 ? '...' : '');

//     const handleClick = () => {
//         onClick?.();

//         // only update if unread
//         if (mail.status === 'unread') {
//             router.post(
//                 `/admin/support/${mail.id}/status`,
//                 {
//                     status: 'read',
//                 },
//                 {
//                     preserveScroll: true,
//                     preserveState: true,
//                 },
//             );
//         }
//     };

//     return (
//         <div
//             onClick={handleClick}
//             className={`cursor-pointer border-b p-4 hover:bg-gray-50 ${
//                 active ? 'bg-gray-100' : ''
//             }`}
//         >
//             {/* NAME */}
//             <div className="flex items-center justify-between">
//                 <p className="text-lg font-semibold">{fullName}</p>

//                 <span className="text-xs text-gray-400">
//                     {formatMailTime(mail?.created_at)}
//                 </span>
//             </div>

//             {/* SUBJECT */}
//             <p className="mt-1 text-sm font-medium text-gray-800">
//                 {mail.subject}
//             </p>

//             {/* MESSAGE PREVIEW */}
//             <p className="mt-1 line-clamp-2 text-xs text-gray-500">{preview}</p>

//             {/* STATUS */}
//             <div className="mt-2">
//                 <span
//                     className={`rounded-full px-2 py-0.5 text-[11px] ${
//                         mail.status === 'unread'
//                             ? 'bg-blue-100 text-blue-600'
//                             : 'bg-gray-200 text-gray-600'
//                     }`}
//                 >
//                     {mail.status || 'read'}
//                 </span>
//             </div>
//         </div>
//     );
// }
