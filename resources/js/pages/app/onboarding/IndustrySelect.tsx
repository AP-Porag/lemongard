import { useForm } from '@inertiajs/react';

export default function IndustrySelect({ industries }) {
    const { data, setData, post, processing } = useForm({
        industry_id: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/app/onboarding/industry');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow">
                <h1 className="mb-4 text-xl font-bold">
                    Select Your Industry
                </h1>

                <form onSubmit={submit}>
                    <select
                        className="w-full rounded border p-3"
                        value={data.industry_id}
                        onChange={(e) =>
                            setData('industry_id', e.target.value)
                        }
                    >
                        <option value="">Select industry</option>
                        {industries.map((i) => (
                            <option key={i.id} value={i.id}>
                                {i.name}
                            </option>
                        ))}
                    </select>

                    <button
                        disabled={processing}
                        className="mt-4 w-full rounded bg-yellow-400 p-3 font-semibold"
                    >
                        Continue to Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
}
