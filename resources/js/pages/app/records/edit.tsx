import React, { useState, useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Edit({ record, userId }) {
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
        service: '',
        price: '',
        incident_report: '',
    });

    const [errors, setErrors] = useState({});

    // ✅ Load data from DB
    useEffect(() => {
        if (record) {
            setForm({
                user_id: record.user_id || '',
                first_name: record.first_name || '',
                last_name: record.last_name || '',
                phone_cell: record.phone_cell || '',
                phone_home: record.phone_home || '',
                industry: record.industry || '',
                street: record.street || '',
                city: record.city || '',
                state: record.state || '',
                zip: record.zip || '',
                service: record.service || '',
                price: record.price || '',
                incident_report: record.incident_report || '',
            });
        }
    }, [record]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);

        router.put(route('records.update', record.id), form, {
            onError: (err) => {
                setErrors(err);
            },

            onFinish: () => setLoading(false),
        });
    };

    return (
        <AppLayout>
            <Head title="Edit Record" />

            <div className="mx-auto mt-6 max-w-3xl rounded-xl bg-white p-6 shadow">
                <h1 className="mb-6 text-2xl font-bold">Edit Record</h1>

                <form onSubmit={submit} className="grid grid-cols-2 gap-4">
                    {/* First Name */}
                    <div>
                        <label className="text-sm font-medium">
                            First Name
                        </label>
                        <input
                            name="first_name"
                            value={form.first_name}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        />
                        {errors.first_name && (
                            <p className="text-sm text-red-500">
                                {errors.first_name}
                            </p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="text-sm font-medium">Last Name</label>
                        <input
                            name="last_name"
                            value={form.last_name}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        />
                        {errors.last_name && (
                            <p className="text-sm text-red-500">
                                {errors.last_name}
                            </p>
                        )}
                    </div>

                    {/* Phone Cell */}
                    <div>
                        <label className="text-sm font-medium">
                            Phone Cell
                        </label>
                        <input
                            name="phone_cell"
                            value={form.phone_cell}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        />
                        {errors.phone_cell && (
                            <p className="text-sm text-red-500">
                                {errors.phone_cell}
                            </p>
                        )}
                    </div>

                    {/* Phone Home */}
                    <div>
                        <label className="text-sm font-medium">
                            Phone Home
                        </label>
                        <input
                            name="phone_home"
                            value={form.phone_home}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        />
                    </div>

                    {/* Industry */}
                    <div>
                        <label className="text-sm font-medium">Industry</label>
                        <input
                            name="industry"
                            value={form.industry}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        />
                        {errors.industry && (
                            <p className="text-sm text-red-500">
                                {errors.industry}
                            </p>
                        )}
                    </div>

                    {/* Street */}
                    <div>
                        <label className="text-sm font-medium">Street</label>
                        <input
                            name="street"
                            value={form.street}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        />
                        {errors.street && (
                            <p className="text-sm text-red-500">
                                {errors.street}
                            </p>
                        )}
                    </div>

                    {/* City */}
                    <div>
                        <label className="text-sm font-medium">City</label>
                        <input
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        />
                        {errors.city && (
                            <p className="text-sm text-red-500">
                                {errors.city}
                            </p>
                        )}
                    </div>

                    {/* State */}
                    <div>
                        <label className="text-sm font-medium">State</label>
                        <input
                            name="state"
                            value={form.state}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        />
                        {errors.state && (
                            <p className="text-sm text-red-500">
                                {errors.state}
                            </p>
                        )}
                    </div>

                    {/* Zip */}
                    <div>
                        <label className="text-sm font-medium">Zip</label>
                        <input
                            name="zip"
                            value={form.zip}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        />
                        {errors.zip && (
                            <p className="text-sm text-red-500">{errors.zip}</p>
                        )}
                    </div>

                    {/* Service */}
                    <div>
                        <label className="text-sm font-medium">Service</label>
                        <input
                            name="service"
                            value={form.service}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        />
                        {errors.service && (
                            <p className="text-sm text-red-500">
                                {errors.service}
                            </p>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <label className="text-sm font-medium">Price</label>
                        <input
                            name="price"
                            type="number"
                            value={form.price}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        />
                        {errors.price && (
                            <p className="text-sm text-red-500">
                                {errors.price}
                            </p>
                        )}
                    </div>

                    {/* Incident Report */}
                    <div className="col-span-2">
                        <label className="text-sm font-medium">
                            Incident Report
                        </label>
                        <textarea
                            name="incident_report"
                            value={form.incident_report}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                            rows="4"
                        />
                    </div>

                    {/* Submit */}
                    <div className="col-span-2">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white"
                        >
                            {loading ? 'Updating...' : 'Update Record'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
