import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import DataTable from '@/components/common/DataTable';
import AppLayout from '@/layouts/app-layout.js';

const breadcrumbs = [
    {
        title: 'Subscriptions',
        href: '',
    },
];

export default function Index({ subscriptions, statuses, filters: initialFilters }) {
    const [filters, setFilters] = useState({
        search: initialFilters?.search || '',
        status: initialFilters?.status || 'active',
        perPage: initialFilters?.perPage || 10,
        page: subscriptions?.current_page || 1,
        apply: false,
        sort_by: initialFilters?.sort_by || 'created_at',
        sort_order: initialFilters?.sort_order || 'desc',
    });

    useEffect(() => {
        const { apply, ...queryParams } = filters;
        if (filters.apply) {
            router.get(route('admin.subscriptions.index'), queryParams, {
                preserveState: true,
                replace: true,
            });
            setFilters((prev) => ({
                ...prev,
                apply: false,
            }));
        }
    }, [filters.apply]);

    const columns = [
        {
            key: 'user',
            label: 'User',
            render: (row) => (
                <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{row.user?.name || 'N/A'}</span>
                    <span className="text-xs text-gray-500">{row.user?.email || ''}</span>
                </div>
            ),
        },
        {
            key: 'access_level',
            label: 'Access Level',
            render: (row) => {
                if (row.stripe_price === 'price_1U0nQCFulxMQQHJjvEsWv8wc') {
                    return (
                        <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-800 px-2.5 py-0.5 text-xs font-medium">
                            View Only
                        </span>
                    );
                }
                if (row.stripe_price === 'price_1U0nRqFulxMQQHJjA3FJ4s5r') {
                    return (
                        <span className="inline-flex items-center rounded-full bg-green-100 text-green-800 px-2.5 py-0.5 text-xs font-medium">
                            Full Access
                        </span>
                    );
                }
                return (
                    <span className="inline-flex items-center rounded-full bg-yellow-100 text-yellow-800 px-2.5 py-0.5 text-xs font-medium">
                        Trial
                    </span>
                );
            },
        },
        {
            key: 'status',
            label: 'Status',
            render: (row) => {
                const statusColors = {
                    active: 'bg-green-100 text-green-800',
                    trialing: 'bg-blue-100 text-blue-800',
                    canceled: 'bg-red-100 text-red-800',
                    expired: 'bg-gray-100 text-gray-800',
                    past_due: 'bg-yellow-100 text-yellow-800',
                    unpaid: 'bg-orange-100 text-orange-800',
                    incomplete: 'bg-purple-100 text-purple-800',
                    incomplete_expired: 'bg-gray-200 text-gray-600',
                    paused: 'bg-indigo-100 text-indigo-800',
                };
                const color = statusColors[row.stripe_status] || 'bg-gray-100 text-gray-800';
                return (
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>
                        {row.stripe_status}
                    </span>
                );
            },
        },
        {
            key: 'renews',
            label: 'Renews',
            render: (row) => {
                // Active এবং ends_at null হলে মাসিক অটো-রিনিউ ধরা হয়
                if (row.stripe_status === 'active' && !row.ends_at) {
                    return (
                        <div className="flex flex-col gap-1">
                            <span className="inline-flex w-fit items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                                Monthly (Auto)
                            </span>
                            {row.next_renewal_date && (
                                <span className="whitespace-nowrap text-xs text-gray-600">
                                    Next: {new Date(row.next_renewal_date).toLocaleDateString()}
                                </span>
                            )}
                        </div>
                    );
                }
                // Active কিন্তু ends_at আছে (canceled/ending)
                if (row.stripe_status === 'active' && row.ends_at) {
                    return (
                        <span className="text-xs text-gray-600">
                            Ends on {new Date(row.ends_at).toLocaleDateString()}
                        </span>
                    );
                }
                // অন্য স্ট্যাটাস
                return <span className="text-xs text-gray-400">—</span>;
            },
        },
        {
            key: 'trial_ends_at',
            label: 'Trial Ends',
            render: (row) => (
                <span className="whitespace-nowrap">
                    {row.trial_ends_at ? new Date(row.trial_ends_at).toLocaleDateString() : '—'}
                </span>
            ),
        },
        {
            key: 'ends_at',
            label: 'Ends At',
            render: (row) => (
                <span className="whitespace-nowrap">
                    {row.ends_at ? new Date(row.ends_at).toLocaleDateString() : '—'}
                </span>
            ),
        },
        {
            key: 'created_at',
            label: 'Started At',
            render: (row) => (
                <span className="whitespace-nowrap">
                    {new Date(row.created_at).toLocaleDateString()}
                </span>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Subscriptions" />
            <div className="p-4">
                <div className="my-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Subscriptions</h1>
                </div>
                <DataTable
                    data={subscriptions.data}
                    columns={columns}
                    meta={{
                        from: subscriptions.from,
                        to: subscriptions.to,
                        total: subscriptions.total,
                        current_page: subscriptions.current_page,
                        last_page: subscriptions.last_page,
                        searchPlaceholderText: "Search by user name or email..."
                    }}
                    actions={(row) => ({
                        view: true,
                        edit: false,
                        delete: false,
                        search_filter: true,
                        status_filter: true,
                        per_page_filter: true,
                    })}
                    baseRoute="admin.subscriptions"
                    filters={filters}
                    onFilterChange={setFilters}
                    statusOptions={statuses}
                    defaultStatus="active"
                    showSorting={false}
                />
            </div>
        </AppLayout>
    );
}
