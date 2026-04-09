import { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

export default function Dashboard({ breadcrumbs }: any) {
    const { props } = usePage() as any;

    const user = props.auth?.user;

    // ✅ first login source
    const isFirstLogin =
        props.flash?.showOnboardingModal ?? user?.is_first_login ?? false;

    // ✅ modal state
    const [open, setOpen] = useState(Boolean(isFirstLogin));

    const [step, setStep] = useState(1);
    const [localErrors, setLocalErrors] = useState<any>({});
    const [showToast, setShowToast] = useState(false);

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

    const getError = (field: string) => {
        return errors[field] || localErrors[field];
    };

    const validateStep = () => {
        const currentFields = steps[step - 1].fields;
        let newErrors: any = {};

        currentFields.forEach((field) => {
            const value = data[field as keyof typeof data];

            if (!value || value === '') {
                newErrors[field] = 'This field is required';
            }
        });

        setLocalErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (!validateStep()) return;
        setLocalErrors({});
        setStep((prev) => prev + 1);
    };

    const prevStep = () => setStep((prev) => prev - 1);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('records.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
                reset();
                setStep(1);

                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            },
            onError: () => {
                setOpen(true);
            },
        });
    };

    const Input = ({ value, onChange, placeholder, field }: any) => {
        const error = getError(field);

        return (
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
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            {/* HEADER */}
            <div className="mb-4 flex items-center justify-between">
                <h4>App Dashboard</h4>

                {user?.email && (
                    <div className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm shadow-sm">
                        <span className="text-gray-500">Logged in as:</span>{' '}
                        <span className="font-medium text-gray-900">
                            {user.email}
                        </span>
                    </div>
                )}
            </div>

            {/* TOAST */}
            {showToast && (
                <div className="fixed top-5 right-5 z-50 rounded-lg bg-green-600 px-4 py-2 text-white shadow-lg">
                    Record Submitted Successfully
                </div>
            )}

            {/* MODAL */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
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

                        <form onSubmit={submit} className="space-y-4 p-6">
                            {step === 1 && (
                                <div className="grid gap-4 md:grid-cols-2">
                                    <Input
                                        value={data.industry}
                                        onChange={(e: any) =>
                                            setData('industry', e.target.value)
                                        }
                                        placeholder="Industry"
                                        field="industry"
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
                                        field="first_name"
                                    />
                                    <Input
                                        value={data.last_name}
                                        onChange={(e: any) =>
                                            setData('last_name', e.target.value)
                                        }
                                        placeholder="Last Name"
                                        field="last_name"
                                    />
                                </div>
                            )}

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
                                        field="phone_cell"
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
                                        field="phone_home"
                                    />
                                </div>
                            )}

                            {step === 3 && (
                                <div className="grid gap-4 md:grid-cols-2">
                                    <Input
                                        value={data.street}
                                        onChange={(e: any) =>
                                            setData('street', e.target.value)
                                        }
                                        placeholder="Street"
                                        field="street"
                                    />
                                    <Input
                                        value={data.city}
                                        onChange={(e: any) =>
                                            setData('city', e.target.value)
                                        }
                                        placeholder="City"
                                        field="city"
                                    />
                                    <Input
                                        value={data.state}
                                        onChange={(e: any) =>
                                            setData('state', e.target.value)
                                        }
                                        placeholder="State"
                                        field="state"
                                    />
                                    <Input
                                        value={data.zip}
                                        onChange={(e: any) =>
                                            setData('zip', e.target.value)
                                        }
                                        placeholder="Zip"
                                        field="zip"
                                    />
                                    <Input
                                        value={data.service}
                                        onChange={(e: any) =>
                                            setData('service', e.target.value)
                                        }
                                        placeholder="Service"
                                        field="service"
                                    />
                                    <Input
                                        value={data.price}
                                        onChange={(e: any) =>
                                            setData('price', e.target.value)
                                        }
                                        placeholder="Price"
                                        field="price"
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
                                        {getError('incident_report') && (
                                            <p className="text-xs text-red-500">
                                                {getError('incident_report')}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

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

            {/* CONTENT */}
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70"
                        >
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20" />
                        </div>
                    ))}
                </div>

                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20" />
                </div>
            </div>
        </AppLayout>
    );
}
