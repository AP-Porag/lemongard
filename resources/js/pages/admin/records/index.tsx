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

export default function Index({ records, industries, services, filters: initialFilters }) {
    const [filters, setFilters] = useState({
        search: initialFilters?.search || '',
        status: initialFilters?.status || '',
        perPage: initialFilters?.perPage || 5,
        industry: initialFilters?.industry || '',
        page: records?.current_page || 1,
    });

    const { auth } = usePage().props;

    useEffect(() => {
        router.get(route('admin.records.index'), filters, {
            preserveState: true,
            replace: true,
        });
    }, [filters.search, filters.status, filters.perPage, filters.page, filters.industry]);

    const columns = [
        {
            key: 'last_name',
            label: 'Last Name',
            render: (row) => row.last_name || '',
        },
        {
            key: 'first_name',
            label: 'First Name',
            render: (row) => row.first_name || '',
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
            key: 'incident_report',
            label: 'Incident',
            render: (row) => (
                <span className="block w-48 truncate">{row.incident_report}</span>
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
                            router.visit(route('admin.records.create'))
                        }
                        className="cursor-pointer bg-navy-600 text-white hover:bg-gray-800"
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
                        searchPlaceholderText: "Search by name, industry, service..."
                    }}
                    actions={(row) => ({
                        view: true,
                        edit: true,
                        delete: true,
                        search_filter: true,
                        status_filter: true,
                        per_page_filter: true,
                    })}
                    baseRoute="admin.records"
                    filters={filters}
                    onFilterChange={setFilters}
                    industries={industries}
                />
            </div>
        </AppLayout>
    );
}
