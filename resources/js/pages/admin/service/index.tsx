import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import DataTable from '@/components/common/DataTable';
import AppLayout from '@/layouts/app-layout.js';

const breadcrumbs = [
    {
        title: 'All Services',
        href: '',
    },
];

export default function Index({ services, filters: initialFilters }) {
    const [filters, setFilters] = useState({
        search: initialFilters?.search || '',
        perPage: initialFilters?.perPage || 5,
        page: services?.current_page || 1,
        sortBy: initialFilters?.sortBy || 'name', // Service name by default
        sortDirection: initialFilters?.sortDirection || 'asc',
    });

    // ✅ FIX: debounce search (important)
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(route('admin.services.index'), filters, {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            });
        }, 400); // debounce delay

        return () => clearTimeout(timeout);
    }, [filters.search, filters.perPage, filters.page]);



    const sortedServices = services?.data || [];

    const columns = [
        {
            key: 'industry',
            label: 'Industry Name',
            sortable: true, // Mark as sortable
            render: (row) => (
                <span className="block truncate font-medium text-gray-800">
                    {row.industry?.name ?? '-'}
                </span>
            ),
        },
        {
            key: 'name',
            label: 'Service Name',
            sortable: true,
            render: (row) => (
                <span className="block truncate font-medium text-gray-800">
                    {row.name}
                </span>
            ),
        }
    ];
    const handleDelete = (id) => {
        if (!confirm('Are you sure you want to delete this industry?')) return;

        router.delete(route('admin.services.destroy', id), {
            preserveScroll: true,
        });
    };
    // Handle sort click
    const handleSort = (key) => {
        setFilters(prev => ({
            ...prev,
            sortBy: key,
            sortDirection: prev.sortBy === key && prev.sortDirection === 'asc' ? 'desc' : 'asc',
            page: 1, // Reset to first page when sorting
        }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="All Services" />

            <div className="p-4">
                <div className="my-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">All Services</h1>

                    <Button
                        onClick={() =>
                            router.visit(route('admin.services.create'))
                        }
                        className="cursor-pointer bg-navy-600 text-white hover:bg-gray-800"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Create Service
                    </Button>
                </div>

                <DataTable
                    data={sortedServices}
                    columns={columns}
                    meta={{
                        from: services.from,
                        to: services.to,
                        total: services.total,
                        current_page: services.current_page,
                        last_page: services.last_page,
                        searchPlaceholderText: "Search by name..."
                    }}
                    actions={(row) => ({
                        view: false,
                        edit: true,
                        delete: true,

                        onDelete: () => handleDelete(row.id), // 🔥 THIS IS THE KEY

                        search_filter: true,
                        per_page_filter: true,
                    })}
                    baseRoute="admin.services"
                    filters={filters}
                    onFilterChange={setFilters}
                    onSort={handleSort}
                />
            </div>
        </AppLayout>
    );
}
