//

import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import DataTable from '@/components/common/DataTable';
import AppLayout from '@/layouts/app-layout.js';

const breadcrumbs = [
    {
        title: 'Users',
        href: '/users/create',
    },
];

export default function Index({ records, filters: initialFilters }) {
    const [filters, setFilters] = useState({
        search: initialFilters?.search || '',
        status: initialFilters?.status || '',
        perPage: initialFilters?.perPage || 5,
        page: records?.current_page || 1,
    });
    const handleDelete = (row) => {
        if (!confirm('Are you sure you want to delete this record?')) return;

        router.delete(route('records.destroy', row.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Record deleted successfully');
            },
        });
    };

    useEffect(() => {
        router.get(route('app.my-records'), filters, {
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
            <Head title="Users" />
            <div className="p-4">
                <div className="my-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Records</h1>
                    <Button
                        onClick={() => router.visit(route('records.create'))}
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
                    actions={(row) => ({
                        view: false,
                        edit: true,
                        delete: row.user_type !== 'admin',
                        search_filter: true,
                        status_filter: true,
                        per_page_filter: true,
                    })}
                    baseRoute="records"
                    filters={filters}
                    onFilterChange={setFilters}
                />
            </div>
        </AppLayout>
    );
}
