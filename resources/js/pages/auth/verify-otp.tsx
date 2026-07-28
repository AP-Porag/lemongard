import { FormEvent, useEffect, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

interface PageProps {
    email: string;
}

export default function VerifyOTP() {
    const { email } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors } = useForm({
        email: email,
        otp: '',
    });

    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        if (countdown <= 0) return;

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    const submit = (e: FormEvent) => {
        e.preventDefault();

        post(route('otp.verify.submit'));
    };

    const resendOtp = () => {
        if (countdown > 0) return;

        post(route('otp.resend'), {
            data: {
                email: data.email,
            },
            preserveScroll: true,
            onSuccess: () => {
                setCountdown(30);
            },
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-yellow-50 to-white px-4">
            <Card className="w-full max-w-md border border-gray-100 shadow-lg">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-semibold text-gray-900">
                        Verify Your Email
                    </CardTitle>

                    <CardDescription>
                        We've sent a 6-digit verification code to
                    </CardDescription>

                    <p className="font-medium text-yellow-600">
                        {email}
                    </p>
                </CardHeader>

                <CardContent>
                    <form onSubmit={submit} className="space-y-5">
                        <input
                            type="hidden"
                            value={data.email}
                        />

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Enter OTP
                            </label>

                            <input
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                maxLength={6}
                                value={data.otp}
                                onChange={(e) =>
                                    setData(
                                        'otp',
                                        e.target.value.replace(/\D/g, '')
                                    )
                                }
                                className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-center text-xl tracking-[0.4em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                                placeholder="000000"
                                required
                            />

                            {errors.otp && (
                                <p className="text-sm text-red-600">
                                    {errors.otp}
                                </p>
                            )}

                            {errors.email && (
                                <p className="text-sm text-red-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
                        >
                            {processing
                                ? 'Verifying...'
                                : 'Verify & Continue'}
                        </Button>

                        <div className="text-center">
                            <p className="text-sm text-gray-500">
                                Didn't receive the code?
                            </p>

                            <button
                                type="button"
                                onClick={resendOtp}
                                disabled={processing || countdown > 0}
                                className="mt-2 text-sm font-medium text-yellow-600 transition hover:text-yellow-700 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {countdown > 0
                                    ? `Resend OTP in ${countdown}s`
                                    : 'Resend OTP'}
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
