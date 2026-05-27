//

import React, { useState, useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import DataTable from '@/components/common/DataTable';
import AppLayout from '@/layouts/app-layout.js';
import { Badge } from '@/components/ui/badge';

const breadcrumbs = [
    {
        title: 'My Records',
        href: '',
    },
];

export default function Index({
    records,
    industries,
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
    console.log(canCreateRecord);

    const canManageRecords =
        user?.subscription_tier === 'tier_2_full_access' &&
        user?.subscription_status === 'active';
    const handleDelete = (row) => {
        if (!confirm('Are you sure you want to delete this record?')) return;

        router.delete(route('app.my-records.destroy', row.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Record deleted successfully');
            },
        });
    };

    useEffect(() => {
        router.get(route('app.my-records.index'), filters, {
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
                <span className="block w-48 truncate">
                    {/* Method 1: If using with('industry') */}
                    {row.industry?.name || 'N/A'}

                    {/* Method 2: If using join and select */}
                    {/* {row.industry_name || 'N/A'} */}

                    {/* Method 3: If using manual mapping */}
                    {/* {industries?.find(i => i.id === row.industry)?.name || 'N/A'} */}
                </span>
            ),
        },
        {
            key: 'services',
            label: 'Services',
            render: (row) => (
                <div className="flex flex-wrap gap-1">
                    {row.services?.length > 0 ? (
                        row.services.map((service) => (
                            <span
                                key={service.id}
                                className="inline-flex items-center rounded-sm bg-yellow-600 px-2 py-0.5 text-xs font-medium text-white"
                            >
                                {service.name}
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-400">N/A</span>
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
            <Head title="My Records" />
            <div className="p-4">
                <div className="my-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">My Records</h1>
                    {canCreateRecord && (
                        <Button
                            onClick={() =>
                                router.visit(route('app.records.create'))
                            }
                            className="cursor-pointer bg-black text-white hover:bg-gray-800"
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

                        const canModify = canCreateRecord && isOwner;

                        const canEditDelete = canCreateRecord && isOwner;

                        const isResolved = row.status === 'resolved';

                        return {
                            view: true,
                            // disabled: !canEditDelete,
                            // resolve: true && !isResolved && canEditDelete,
                            resolve: !isResolved && canEditDelete,     // Single "resolve" property
                            disabled: isResolved || !canEditDelete,
                            edit: canModify,
                            delete: false,
                            search_filter: true,
                            status_filter: true,
                            per_page_filter: true,
                        };
                    }}
                    baseRoute="app.my-records"
                    filters={filters}
                    onFilterChange={setFilters}
                />
            </div>
        </AppLayout>
    );
}
