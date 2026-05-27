import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Record',
        href: '',
    },
];

export default function Create({ userId, industries, allServices }) {
    const { flash } = usePage().props;
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        user_id: userId || '',
        first_name: '',
        last_name: '',
        phone_cell: '',
        phone_home: '',
        industry: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        services: [], // Array of selected service IDs
        price: '',
        incident_report: '',
    });

    const [errors, setErrors] = useState({});

    // Filter services based on selected industry
    const filteredServices = allServices?.filter(
        service => service.industry_id === parseInt(form.industry)
    ) || [];

    // Format phone number
    const formatPhoneNumber = (value) => {
        const numbers = value.replace(/\D/g, '').slice(0, 15);
        const parts = [];
        for (let i = 0; i < numbers.length; i += 3) {
            parts.push(numbers.slice(i, i + 3));
        }
        return parts.join('-');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Phone formatting
        if (name === 'phone_cell' || name === 'phone_home') {
            setForm({
                ...form,
                [name]: formatPhoneNumber(value),
            });
            return;
        }

        // Reset services when industry changes
        if (name === 'industry') {
            setForm({
                ...form,
                industry: value,
                services: [], // Reset services array
            });
            return;
        }

        setForm({
            ...form,
            [name]: value,
        });
    };

    // Handle checkbox change for service selection
    const handleServiceToggle = (serviceId) => {
        setForm(prev => ({
            ...prev,
            services: prev.services.includes(serviceId)
                ? prev.services.filter(id => id !== serviceId) // Remove if already selected
                : [...prev.services, serviceId] // Add if not selected
        }));
    };

    // Select all services
    const selectAllServices = () => {
        const allServiceIds = filteredServices.map(service => service.id.toString());
        setForm({
            ...form,
            services: allServiceIds,
        });
    };

    // Deselect all services
    const deselectAllServices = () => {
        setForm({
            ...form,
            services: [],
        });
    };

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);

        router.post(route('app.records.store'), form, {
            onError: (err) => {
                setErrors(err);
            },
            onSuccess: () => {
                // Reset form after successful submission
                setForm({
                    user_id: userId || '',
                    first_name: '',
                    last_name: '',
                    phone_cell: '',
                    phone_home: '',
                    industry: '',
                    street: '',
                    city: '',
                    state: '',
                    zip: '',
                    services: [],
                    price: '',
                    incident_report: '',
                });
                setErrors({});
                toast.success('Record created successfully!');
            },
            onFinish: () => setLoading(false),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Record" />

            <div className="mx-auto mt-6 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-xl bg-white p-4 shadow sm:p-6">
                    <h1 className="mb-6 text-2xl font-bold">Create Record</h1>

                    <form onSubmit={submit} className="grid grid-cols-2 gap-4">
                        <input type="hidden" name="user_id" value={form.user_id} />

                        {/* First Name */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="first_name"
                                value={form.first_name}
                                onChange={handleChange}
                                className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.first_name
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:border-yellow-400'
                                    }`}
                                placeholder="Enter first name"
                            />
                            {errors.first_name && (
                                <p className="mt-1 text-sm text-red-500">{errors.first_name}</p>
                            )}
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="last_name"
                                value={form.last_name}
                                onChange={handleChange}
                                className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.last_name
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:border-yellow-400'
                                    }`}
                                placeholder="Enter last name"
                            />
                            {errors.last_name && (
                                <p className="mt-1 text-sm text-red-500">{errors.last_name}</p>
                            )}
                        </div>

                        {/* Phone Cell */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Phone Cell
                            </label>
                            <input
                                type="text"
                                name="phone_cell"
                                value={form.phone_cell}
                                onChange={handleChange}
                                maxLength={15}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="XXX-XXX-XXXX"
                            />
                            {errors.phone_cell && (
                                <p className="mt-1 text-sm text-red-500">{errors.phone_cell}</p>
                            )}
                        </div>

                        {/* Phone Home */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Phone Home
                            </label>
                            <input
                                type="text"
                                name="phone_home"
                                value={form.phone_home}
                                onChange={handleChange}
                                maxLength={15}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="XXX-XXX-XXXX"
                            />
                            {errors.phone_home && (
                                <p className="mt-1 text-sm text-red-500">{errors.phone_home}</p>
                            )}
                        </div>

                        {/* Industry */}
                        <div className="col-span-2">
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Industry <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="industry"
                                value={form.industry}
                                onChange={handleChange}
                                className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.industry
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:border-yellow-400'
                                    }`}
                            >
                                <option value="">Select Industry</option>
                                {industries?.map((industry) => (
                                    <option key={industry.id} value={industry.id}>
                                        {industry.name}
                                    </option>
                                ))}
                            </select>
                            {errors.industry && (
                                <p className="mt-1 text-sm text-red-500">{errors.industry}</p>
                            )}
                        </div>

                        {/* Services - Checkbox List */}
                        <div className="col-span-2">
                            <div className="mb-3 flex items-center justify-between">
                                <label className="block text-sm font-medium text-gray-700">
                                    Services <span className="text-red-500">*</span>
                                </label>

                                {form.industry && filteredServices.length > 0 && (
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={selectAllServices}
                                            className="text-xs text-blue-600 hover:text-blue-800"
                                        >
                                            Select All
                                        </button>
                                        <span className="text-gray-300">|</span>
                                        <button
                                            type="button"
                                            onClick={deselectAllServices}
                                            className="text-xs text-red-600 hover:text-red-800"
                                        >
                                            Deselect All
                                        </button>
                                    </div>
                                )}
                            </div>

                            {!form.industry ? (
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center text-gray-500">
                                    Please select an industry first
                                </div>
                            ) : filteredServices.length === 0 ? (
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center text-gray-500">
                                    No services available for this industry
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3 rounded-lg border border-gray-200 p-4 md:grid-cols-3 lg:grid-cols-4">
                                    {filteredServices.map((service) => (
                                        <label
                                            key={service.id}
                                            className="flex cursor-pointer items-center space-x-2 rounded-lg p-2 hover:bg-gray-50"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={form.services.includes(service.id.toString())}
                                                onChange={() => handleServiceToggle(service.id.toString())}
                                                className="h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-400"
                                            />
                                            <span className="text-sm text-gray-700">
                                                {service.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            )}

                            {errors.services && (
                                <p className="mt-1 text-sm text-red-500">{errors.services}</p>
                            )}

                            {/* Show selected count */}
                            {form.services.length > 0 && (
                                <div className="mt-3 text-sm text-gray-600">
                                    {form.services.length} service(s) selected
                                </div>
                            )}
                        </div>

                        {/* Street */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Street
                            </label>
                            <input
                                type="text"
                                name="street"
                                value={form.street}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="Enter street address"
                            />
                            {errors.street && (
                                <p className="mt-1 text-sm text-red-500">{errors.street}</p>
                            )}
                        </div>

                        {/* City */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                City
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="Enter city"
                            />
                            {errors.city && (
                                <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                            )}
                        </div>

                        {/* State */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                State
                            </label>
                            <input
                                type="text"
                                name="state"
                                value={form.state}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="Enter state"
                                maxLength={2}
                            />
                            {errors.state && (
                                <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                            )}
                        </div>

                        {/* Zip */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                ZIP Code
                            </label>
                            <input
                                type="text"
                                name="zip"
                                value={form.zip}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="Enter ZIP code"
                                maxLength={10}
                            />
                            {errors.zip && (
                                <p className="mt-1 text-sm text-red-500">{errors.zip}</p>
                            )}
                        </div>

                        {/* Price */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Price
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                <input
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    step="0.01"
                                    min="0"
                                    className="w-full rounded-lg border border-gray-300 pl-7 pr-3 py-2 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    placeholder="0.00"
                                />
                            </div>
                            {errors.price && (
                                <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                            )}
                        </div>

                        {/* Incident Report - Full Width */}
                        <div className="col-span-2">
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Incident Report
                            </label>
                            <textarea
                                name="incident_report"
                                value={form.incident_report}
                                onChange={handleChange}
                                rows="5"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="Describe the incident in detail..."
                            />
                            {errors.incident_report && (
                                <p className="mt-1 text-sm text-red-500">{errors.incident_report}</p>
                            )}
                        </div>

                        {/* Submit Button - Full Width */}
                        <div className="col-span-2 mt-4">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black py-2 text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Saving...
                                    </span>
                                ) : (
                                    'Save Record'
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
