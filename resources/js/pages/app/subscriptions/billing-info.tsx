import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import {
    CreditCard,
    CalendarDays,
    BadgeCheck,
    CircleDollarSign,
    Receipt,
    AlertCircle,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';


interface BillingInfoProps {
    billingInfo: {
        subscription_tier: string | null;
        subscription_status: string | null;
        plan_price: string | null;
        next_billing_date: string | null;
        trial_ends_at: string | null;
        card_brand: string | null;
        card_last_four: string | null;
        started_at: string | null;
        ends_at: string | null;
    };
}

import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Billing Details',
        href: '',
    },
];

export default function BillingInfoPage({ billingInfo }: BillingInfoProps) {
    const getStatusBadge = () => {
        switch (billingInfo.subscription_status) {
            case 'active':
                return (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        Active
                    </Badge>
                );

            case 'trial':
                return (
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                        Trial
                    </Badge>
                );

            case 'cancelled':
                return (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                        Cancelled
                    </Badge>
                );

            case 'expired':
                return (
                    <Badge className="bg-gray-200 text-gray-700 hover:bg-gray-200">
                        Expired
                    </Badge>
                );

            default:
                return <Badge variant="secondary">Unknown</Badge>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Billing Information" />

            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Billing Information
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage and review your subscription details and payment
                        information.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* LEFT SIDE */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Subscription Overview */}
                        <Card className="border-0 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <BadgeCheck className="h-5 w-5 text-[#FF6B00]" />
                                    Subscription Overview
                                </CardTitle>

                                {/* {getStatusBadge()} */}
                            </CardHeader>

                            <CardContent className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <p className="text-sm text-slate-500">
                                            Current Plan
                                        </p>

                                        <div className="flex items-center gap-2">
                                            <CircleDollarSign className="h-5 w-5 text-[#FF6B00]" />

                                            <h3 className="text-lg font-semibold text-slate-900">
                                                {billingInfo.subscription_tier
                                                    ?.replace(/_/g, ' ')
                                                    .replace(/\b\w/g, (c) => c.toUpperCase()) || 'N/A'}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-sm text-slate-500">
                                            Monthly Price
                                        </p>

                                        <h3 className="text-lg font-semibold text-slate-900">
                                            {billingInfo.subscription_tier === 'tier_1_view_only'
                                                ? '$14.99'
                                                : billingInfo.subscription_tier === 'tier_2_full_access'
                                                    ? '$19.99'
                                                    : 'N/A'}
                                        </h3>
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <p className="text-sm text-slate-500">
                                            {billingInfo.started_at
                                                ? billingInfo.subscription_tier === 'trial'
                                                    ? 'Trial started'
                                                    : 'Subscription started'
                                                : ''}
                                        </p>

                                        <div className="flex items-center gap-2">
                                            <CalendarDays className="h-5 w-5 text-slate-500" />

                                            <span className="font-medium text-slate-900">
                                                {billingInfo.started_at ||
                                                    'N/A'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-sm text-slate-500">
                                            {billingInfo.subscription_tier === 'trial'
                                                ? 'Trial Ends At'
                                                : 'Next Billing Date'}
                                        </p>

                                        <div className="flex items-center gap-2">
                                            <Receipt className="h-5 w-5 text-slate-500" />

                                            <span className="font-medium text-slate-900">
                                                {billingInfo.subscription_tier === 'trial'
                                                    ? billingInfo.trial_ends_at || 'N/A'
                                                    : billingInfo.next_billing_date || 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* {billingInfo.trial_ends_at && (
                                    <>
                                        <Separator />

                                        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                                            <div className="flex items-start gap-3">
                                                <AlertCircle className="mt-0.5 h-5 w-5 text-blue-600" />

                                                <div>
                                                    <h4 className="font-semibold text-blue-900">
                                                        Trial Information
                                                    </h4>

                                                    <p className="mt-1 text-sm text-blue-700">
                                                        Your free trial ends on{' '}
                                                        <span className="font-semibold">
                                                            {
                                                                billingInfo.trial_ends_at
                                                            }
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )} */}
                            </CardContent>
                        </Card>

                        {/* Billing Period */}
                        {billingInfo.subscription_tier !== 'trial' && (
                            <Card className="border-0 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Billing Period
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-5">
                                    <div className="flex items-center justify-between rounded-xl border p-4">
                                        <div>
                                            <p className="text-sm text-slate-500">
                                                Subscription Ends
                                            </p>

                                            <p className="mt-1 font-semibold text-slate-900">
                                                {billingInfo.ends_at || 'Auto Renew'}
                                            </p>
                                        </div>

                                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                            Monthly Billing
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="space-y-6">
                        {/* Payment Method */}
                        {/* <Card className="border-0 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <CreditCard className="h-5 w-5 text-[#FF6B00]" />
                                    Payment Method
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                <div className="rounded-2xl border bg-slate-50 p-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-500">
                                                Card Brand
                                            </p>

                                            <h3 className="mt-1 text-lg font-semibold text-slate-900 uppercase">
                                                {billingInfo.card_brand ||
                                                    'N/A'}
                                            </h3>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-sm text-slate-500">
                                                Card Number
                                            </p>

                                            <h3 className="mt-1 text-lg font-semibold text-slate-900">
                                                ****{' '}
                                                {billingInfo.card_last_four ||
                                                    '----'}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card> */}

                        {/* Billing Notes */}
                        <Card className="border-0 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Billing Notes
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-3 text-sm text-slate-600">
                                <p>
                                    • Your subscription renews automatically
                                    every month.
                                </p>

                                <p>
                                    • You can cancel your subscription anytime.
                                </p>

                                <p>
                                    • Access will remain active until the end of
                                    the current billing cycle.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
