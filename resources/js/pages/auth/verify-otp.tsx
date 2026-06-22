import React from 'react';
import { useForm } from '@inertiajs/react';

export default function VerifyOTP() {
    const { data, setData, post, processing, errors } = useForm({
        otp: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('app.otp.verify.submit'));
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-center text-2xl font-bold">Verify Your Email</h2>
                <p className="mb-4 text-center text-sm text-gray-600">
                    We have sent a 6-digit OTP to your email address. Please enter it below.
                </p>

                <form onSubmit={submit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
                        <input
                            type="text"
                            value={data.otp}
                            onChange={e => setData('otp', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            maxLength="6"
                            required
                        />
                        {errors.otp && <span className="text-sm text-red-600">{errors.otp}</span>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {processing ? 'Verifying...' : 'Verify & Proceed'}
                    </button>
                </form>
            </div>
        </div>
    );
}
