import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import DataTable from '@/components/common/DataTable';
import AppLayout from '@/layouts/app-layout.js';

const breadcrumbs = [
    {
        title: 'All Industries',
        href: '',
    },
];

export default function Index({ industries, filters: initialFilters }) {
    const [filters, setFilters] = useState({
        search: initialFilters?.search || '',
        perPage: initialFilters?.perPage || 5,
        page: industries?.current_page || 1,
    });

    // ✅ FIX: debounce search (important)
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(route('industries.index'), filters, {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            });
        }, 400); // debounce delay

        return () => clearTimeout(timeout);
    }, [filters.search, filters.perPage, filters.page]);

    const columns = [
        {
            key: 'name',
            label: 'Industry Name',
            render: (row) => (
                <span className="block truncate font-medium text-gray-800">
                    {row.name}
                </span>
            ),
        },
    ];
    const handleDelete = (id) => {
        if (!confirm('Are you sure you want to delete this industry?')) return;

        router.delete(route('industries.destroy', id), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="All Industries" />

            <div className="p-4">
                <div className="my-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">All Industries</h1>

                    <Button
                        onClick={() => router.visit(route('industries.create'))}
                        className="cursor-pointer bg-black text-white hover:bg-gray-800"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Create Industry
                    </Button>
                </div>

                <DataTable
                    data={industries.data}
                    columns={columns}
                    meta={{
                        from: industries.from,
                        to: industries.to,
                        total: industries.total,
                        current_page: industries.current_page,
                        last_page: industries.last_page,
                    }}
                    actions={(row) => ({
                        view: false,
                        edit: true,
                        delete: true,

                        onDelete: () => handleDelete(row.id), // 🔥 THIS IS THE KEY

                        search_filter: true,
                        per_page_filter: true,
                    })}
                    baseRoute="industries"
                    filters={filters}
                    onFilterChange={setFilters}
                />
            </div>
        </AppLayout>
    );
}
