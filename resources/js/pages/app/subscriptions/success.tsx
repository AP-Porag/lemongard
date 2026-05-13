import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
    plan: string;
}

export default function SubscriptionSuccess({ plan }: Props) {
    return (
        <AppLayout>
            <Head title="Subscription Success" />

            <div className="flex min-h-[80vh] items-center justify-center px-4 py-10">
                <Card className="w-full max-w-2xl border-yellow-200 shadow-xl">
                    <CardContent className="flex flex-col items-center space-y-6 p-10 text-center">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-yellow-100">
                            <CheckCircle2 className="h-14 w-14 text-yellow-500" />
                        </div>

                        <div className="space-y-3">
                            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Subscription Successful
                            </h1>

                            <p className="mx-auto max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
                                Your{' '}
                                <span className="font-semibold capitalize">
                                    {plan}
                                </span>{' '}
                                subscription has been activated successfully.
                                Welcome to LemonGard.
                            </p>

                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                You now have access to your subscription
                                features and dashboard tools.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                            <Button
                                asChild
                                className="bg-yellow-500 text-slate-900 hover:bg-yellow-400"
                            >
                                <Link href="/app/dashboard">
                                    Go To Dashboard
                                </Link>
                            </Button>

                            <Button variant="outline" asChild>
                                <Link href="/app/subscription">
                                    Manage Subscription
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
