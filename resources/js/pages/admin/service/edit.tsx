import React, { useState, useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';

import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Service',
        href: '',
    },
];

type Industry = {
    id: number;
    name: string;
};

type Service = {
    id: number;
    name: string;
    industry_id: number | string;
};

type Props = {
    service: Service;
    industries: Industry[];
};

export default function EditService() {
    const { service, industries = [] } = usePage().props as Props;

    const [form, setForm] = useState({
        name: '',
        industry_id: '',
    });

    const [errors, setErrors] = useState<any>({});

    // ✅ FIX: sync Inertia props -> form state
    useEffect(() => {
        if (service) {
            setForm({
                name: service.name || '',
                industry_id: service.industry_id || '',
            });
        }
    }, [service]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        setErrors((prev: any) => ({
            ...prev,
            [e.target.name]: '',
        }));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        // FRONTEND VALIDATION
        if (!form.name.trim()) {
            setErrors({ name: 'Service name is required' });
            return;
        }

        router.put(route('admin.services.update', service.id), form, {
            preserveScroll: true,

            onError: (err) => {
                setErrors(err);
            },

            onSuccess: () => {
                router.visit(route('admin.services.index'));
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Service" />

            <div className="mx-auto mt-6 w-full max-w-7xl p-4">
                <div className="rounded-xl bg-white p-6 shadow">
                    <h1 className="mb-6 text-xl font-bold">
                        Edit Service
                    </h1>

                    <form onSubmit={submit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Service Name */}
                            <div>
                                <label className="text-sm font-medium">
                                    Service Name
                                </label>

                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full rounded border px-3 py-2"
                                    placeholder="Enter service name"
                                />

                                {errors.name && (
                                    <p className="text-sm text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Industry Dropdown */}
                            <div>
                                <label className="text-sm font-medium">
                                    Industry
                                </label>

                                <select
                                    name="industry_id"
                                    value={form.industry_id}
                                    onChange={handleChange}
                                    className="w-full rounded border px-3 py-2"
                                >
                                    <option value="">
                                        Select Industry
                                    </option>

                                    {industries.map((industry) => (
                                        <option
                                            key={industry.id}
                                            value={industry.id}
                                        >
                                            {industry.name}
                                        </option>
                                    ))}
                                </select>

                                {errors.industry_id && (
                                    <p className="text-sm text-red-500">
                                        {errors.industry_id}
                                    </p>
                                )}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full cursor-pointer bg-black text-white"
                        >
                            Update Service
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
