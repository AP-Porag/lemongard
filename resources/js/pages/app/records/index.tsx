import React, { useState, useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import DataTable from '@/components/common/DataTable';
import AppLayout from '@/layouts/app-layout.js';
import { Badge } from '@/components/ui/badge';

const breadcrumbs = [
    {
        title: 'All Records',
        href: '',
    },
];

export default function Index({
    records,
    has_full_access,
    filters: initialFilters,
}) {
    const [filters, setFilters] = useState({
        search: initialFilters?.search || '',
        status: initialFilters?.status || '',
        perPage: initialFilters?.perPage || 5,
        page: records?.current_page || 1,
    });

    const { auth } = usePage().props;
    const user = auth?.user;

    const canCreateRecord = user?.has_full_access;

    const isFullAccessActive =
        user?.subscription_tier === 'tier_2_full_access' &&
        user?.subscription_status === 'active';

    const canManageRecords =
        user?.subscription_tier === 'tier_2_full_access' &&
        user?.subscription_status === 'active';

    useEffect(() => {
        router.get(route('app.records.index'), filters, {
            preserveState: true,
            replace: true,
        });
    }, [filters.search, filters.status, filters.perPage, filters.page]);

    const columns = [
        {
            key: 'first_name',
            label: 'Name',
            render: (row) => {
                const first = row.first_name || '';
                const last = row.last_name || '';
                return `${first} ${last}`.trim();
            },
        },
        {
            key: 'industry',
            label: 'Industry',
            render: (row) => (
                <span className="block w-30 truncate">
                    {/* Method 1: If using with('industry') */}
                    {row.industry?.name || 'N/A'}

                    {/* Method 2: If using join and select */}
                    {/* {row.industry_name || 'N/A'} */}

                    {/* Method 3: If using manual mapping */}
                    {/* {industries?.find(i => i.id === row.industry)?.name || 'N/A'} */}
                </span>
            ),
        },
        // {
        //     key: 'services',
        //     label: 'Services',
        //     render: (row) => (
        //         <div className="flex flex-wrap gap-1">
        //             {row.services?.length > 0 ? (
        //                 row.services.map((service) => (
        //                     <span
        //                         key={service.id}
        //                         className="inline-flex items-center rounded-sm bg-yellow-500 px-2 py-0.5 text-xs font-medium text-white"
        //                     >
        //                         {service.name}
        //                     </span>
        //                 ))
        //             ) : (
        //                 <span className="text-gray-400">N/A</span>
        //             )}
        //         </div>
        //     ),
        // },
        {
            key: 'services',
            label: 'Services',
            render: (row) => (
                <div className="flex flex-wrap gap-1">
                    {row.services?.length > 0 ? (
                        <>
                            {row.services.slice(0, 4).map((service) => (
                                <span
                                    key={service.id}
                                    className="inline-flex items-center rounded-md bg-yellow-500 px-2 py-0.5 text-xs font-medium text-white"
                                >
                                    {service.name}
                                </span>
                            ))}
                            {row.services.length > 4 && (
                                <span className="inline-flex items-center rounded-md bg-gray-400 px-2 py-0.5 text-xs font-medium text-white">
                                    +{row.services.length - 4} more
                                </span>
                            )}
                        </>
                    ) : (
                        <span className="text-gray-400 text-sm">N/A</span>
                    )}
                </div>
            ),
        },
        {
            key: 'price',
            label: 'Price',
            render: (row) => (
                <span className="block w-48 truncate">$ {row.price}</span>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            render: (row) => (
                <span className="block w-48 truncate">
                    <Badge
                        className={
                            row.status?.trim()
                                ? 'bg-green-600 text-white hover:bg-green-600 px-3 py-1'
                                : 'bg-yellow-500 text-white hover:bg-yellow-500 px-3 py-1'
                        }
                    >
                        {row.status?.trim()
                            ? row.status
                                .toLowerCase()
                                .split(' ')
                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ')
                            : 'Not Resolved'}
                    </Badge>
                </span>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="All Records" />

            <div className="p-4">
                <div className="my-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">All Records</h1>

                    {canCreateRecord && (
                        <Button
                            onClick={() =>
                                router.visit(route('app.records.create'))
                            }
                            className="cursor-pointer bg-navy-600 text-white hover:bg-gray-800"
                        >
                            <Plus className="mr-2" /> Create Record
                        </Button>
                    )}
                </div>

                <DataTable
                    data={records.data}
                    columns={columns}
                    meta={{
                        from: records.from,
                        to: records.to,
                        total: records.total,
                        current_page: records.current_page,
                        last_page: records.last_page,
                    }}
                    actions={(row) => {
                        const isOwner = auth?.user?.id === row.user_id;

                        const canEditDelete = canCreateRecord && isOwner;

                        const isResolved = row.status === 'resolved';

                        return {
                            view: true,

                            // 🔥 Only full access + owner can edit/delete
                            edit: canEditDelete,
                            delete: false,

                            // 🔥 Resolve: Only show if not resolved AND has permission
                            resolve: !isResolved && canEditDelete,

                            // 🔥 Disabled: True if already resolved OR no permission
                            disabled: isResolved || !canEditDelete,

                            search_filter: true,
                            status_filter: true,
                            per_page_filter: true,
                        };
                    }}
                    baseRoute="app.records"
                    filters={filters}
                    onFilterChange={setFilters}
                />
            </div>
        </AppLayout>
    );
}
