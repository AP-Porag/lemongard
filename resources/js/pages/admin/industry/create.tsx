import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';

import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Industry',
        href: '',
    },
];

export default function CreateIndustry() {
    const [form, setForm] = useState({
        name: '',
    });

    const [errors, setErrors] = useState<any>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            setErrors({ name: 'Industry name is required' });
            return;
        }

        router.post(route('admin.industries.store'), form, {
            preserveScroll: true,

            onError: (err) => {
                setErrors(err);
            },

            onSuccess: () => {
                setForm({ name: '' });

                // redirect to index page after success
                router.visit(route('admin.industries.index'));
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Industry" />

            <div className="mx-auto mt-6 w-full max-w-7xl p-4">
                <div className="rounded-xl bg-white p-6 shadow">
                    <h1 className="mb-6 text-xl font-bold">Create Industry</h1>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">
                                Industry Name
                            </label>

                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                                placeholder="Enter industry name"
                            />

                            {errors.name && (
                                <p className="text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full cursor-pointer bg-black text-white"
                        >
                            Save Industry
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
