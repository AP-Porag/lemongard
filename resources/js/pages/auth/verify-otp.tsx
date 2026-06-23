// import React from 'react';
import { useForm } from '@inertiajs/react';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

export default function VerifyOTP() {
    const { data, setData, post, processing, errors } = useForm({
        otp: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('app.otp.verify.submit'));
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-yellow-50 to-white px-4">
            <Card className="w-full max-w-md border border-gray-100 shadow-lg">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-semibold text-gray-900">
                        Verify Your Email
                    </CardTitle>

                    <CardDescription>
                        We have sent a 6-digit OTP to your email address.
                        Please enter it below.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={submit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Enter OTP
                            </label>

                            <input
                                type="text"
                                value={data.otp}
                                onChange={(e) =>
                                    setData('otp', e.target.value)
                                }
                                maxLength="6"
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            />

                            {errors.otp && (
                                <p className="text-sm text-red-600">
                                    {errors.otp}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
                            disabled={processing}
                        >
                            {processing
                                ? 'Verifying...'
                                : 'Verify & Proceed'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
