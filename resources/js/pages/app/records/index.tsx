import React, { useState, useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import DataTable from '@/components/common/DataTable';
import AppLayout from '@/layouts/app-layout.js';

const breadcrumbs = [
    {
        title: 'All Records',
        href: '',
    },
];

export default function Index({ records, filters: initialFilters }) {
    const [filters, setFilters] = useState({
        search: initialFilters?.search || '',
        status: initialFilters?.status || '',
        perPage: initialFilters?.perPage || 5,
        page: records?.current_page || 1,
    });

    const { auth } = usePage().props;

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
            key: 'service',
            label: 'Service',
            render: (row) => (
                <span className="block w-48 truncate">{row.service}</span>
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
            key: 'industry',
            label: 'Industry',
            render: (row) => (
                <span className="block w-48 truncate">{row.industry}</span>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="All Records" />

            <div className="p-4">
                <div className="my-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">All Records</h1>

                    <Button
                        onClick={() =>
                            router.visit(route('app.records.create'))
                        }
                        className="cursor-pointer bg-black text-white hover:bg-gray-800"
                    >
                        <Plus className="mr-2" /> Create Record
                    </Button>
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

                        return {
                            view: false,
                            edit: isOwner,
                            delete: isOwner,

                            // 🔥 ONLY THIS IS IMPORTANT
                            disabled: !isOwner,

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
