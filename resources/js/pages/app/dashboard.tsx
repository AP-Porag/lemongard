import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function Dashboard({ breadcrumbs }: any) {
    const [open, setOpen] = useState(true);
    const [step, setStep] = useState(1);

    const { data, setData, post, processing, errors, reset } = useForm({
        industry: '',
        first_name: '',
        last_name: '',
        phone_cell: '',
        phone_home: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        service: '',
        price: '',
        incident_report: '',
    });

    const steps = [
        {
            title: 'Basic Info',
            fields: ['industry', 'first_name', 'last_name'],
        },
        {
            title: 'Contact Info',
            fields: ['phone_cell', 'phone_home'],
        },
        {
            title: 'Details',
            fields: [
                'street',
                'city',
                'state',
                'zip',
                'service',
                'price',
                'incident_report',
            ],
        },
    ];

    // ---------------- STEP VALIDATION (FRONTEND ONLY) ----------------
    const validateStep = () => {
        return steps[step - 1].fields.every((field) => {
            const value = data[field as keyof typeof data];
            return value !== '' && value !== null;
        });
    };

    const nextStep = () => {
        if (!validateStep()) return;
        setStep((prev) => prev + 1);
    };

    const prevStep = () => setStep((prev) => prev - 1);

    // ---------------- SUBMIT ----------------
    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('app.record.store'), {
            preserveScroll: true,

            onSuccess: () => {
                setOpen(false); // ✅ modal close only on success
                reset(); // clear form
                setStep(1); // reset step
            },

            onError: () => {
                setOpen(true); // ❗ keep modal open on backend error
            },
        });
    };

    const Input = ({ value, onChange, placeholder, error }: any) => (
        <div>
            <input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full rounded-lg border px-3 py-2 text-sm outline-none ${
                    error ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <h4>App Dashboard</h4>

            {/* ---------------- MODAL ---------------- */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
                        {/* HEADER */}
                        <div className="border-b p-5">
                            <h2 className="font-semibold">
                                Step {step} of {steps.length} —{' '}
                                {steps[step - 1].title}
                            </h2>

                            <div className="mt-2 h-2 w-full rounded bg-gray-200">
                                <div
                                    className="h-2 bg-black transition-all"
                                    style={{
                                        width: `${(step / steps.length) * 100}%`,
                                    }}
                                />
                            </div>
                        </div>

                        {/* FORM */}
                        <form onSubmit={submit} className="space-y-4 p-6">
                            {/* STEP 1 */}
                            {step === 1 && (
                                <div className="grid gap-4 md:grid-cols-2">
                                    <Input
                                        value={data.industry}
                                        onChange={(e: any) =>
                                            setData('industry', e.target.value)
                                        }
                                        placeholder="Industry"
                                        error={errors.industry}
                                    />
                                    <Input
                                        value={data.first_name}
                                        onChange={(e: any) =>
                                            setData(
                                                'first_name',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="First Name"
                                        error={errors.first_name}
                                    />
                                    <Input
                                        value={data.last_name}
                                        onChange={(e: any) =>
                                            setData('last_name', e.target.value)
                                        }
                                        placeholder="Last Name"
                                        error={errors.last_name}
                                    />
                                </div>
                            )}

                            {/* STEP 2 */}
                            {step === 2 && (
                                <div className="grid gap-4 md:grid-cols-2">
                                    <Input
                                        value={data.phone_cell}
                                        onChange={(e: any) =>
                                            setData(
                                                'phone_cell',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Phone Cell"
                                        error={errors.phone_cell}
                                    />
                                    <Input
                                        value={data.phone_home}
                                        onChange={(e: any) =>
                                            setData(
                                                'phone_home',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Phone Home"
                                        error={errors.phone_home}
                                    />
                                </div>
                            )}

                            {/* STEP 3 */}
                            {step === 3 && (
                                <div className="grid gap-4 md:grid-cols-2">
                                    <Input
                                        value={data.street}
                                        onChange={(e: any) =>
                                            setData('street', e.target.value)
                                        }
                                        placeholder="Street"
                                        error={errors.street}
                                    />
                                    <Input
                                        value={data.city}
                                        onChange={(e: any) =>
                                            setData('city', e.target.value)
                                        }
                                        placeholder="City"
                                        error={errors.city}
                                    />
                                    <Input
                                        value={data.state}
                                        onChange={(e: any) =>
                                            setData('state', e.target.value)
                                        }
                                        placeholder="State"
                                        error={errors.state}
                                    />
                                    <Input
                                        value={data.zip}
                                        onChange={(e: any) =>
                                            setData('zip', e.target.value)
                                        }
                                        placeholder="Zip"
                                        error={errors.zip}
                                    />
                                    <Input
                                        value={data.service}
                                        onChange={(e: any) =>
                                            setData('service', e.target.value)
                                        }
                                        placeholder="Service"
                                        error={errors.service}
                                    />
                                    <Input
                                        value={data.price}
                                        onChange={(e: any) =>
                                            setData('price', e.target.value)
                                        }
                                        placeholder="Price"
                                        error={errors.price}
                                    />

                                    <div className="md:col-span-2">
                                        <textarea
                                            value={data.incident_report}
                                            onChange={(e) =>
                                                setData(
                                                    'incident_report',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border p-2"
                                            placeholder="Incident Report"
                                        />
                                        {errors.incident_report && (
                                            <p className="text-xs text-red-500">
                                                {errors.incident_report}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* BUTTONS */}
                            <div className="flex justify-between pt-4">
                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="rounded border px-4 py-2"
                                    >
                                        Back
                                    </button>
                                )}

                                {step < steps.length && (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="ml-auto rounded bg-black px-4 py-2 text-white"
                                    >
                                        Next
                                    </button>
                                )}

                                {step === steps.length && (
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="ml-auto rounded bg-black px-4 py-2 text-white disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Save'}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
