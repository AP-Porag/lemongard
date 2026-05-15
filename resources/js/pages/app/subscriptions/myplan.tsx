import React from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Check, Pencil, Trash2, AlertTriangle } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';

import { useState } from 'react';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Plan',
        href: '',
    },
];

type SubscriptionTier = 'tier_1_view_only' | 'tier_2_full_access';
type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'cancelled';

interface Props {
    user: {
        subscription_tier?: SubscriptionTier | null;
        subscription_status: SubscriptionStatus;
        trial_ends_at?: string | null;
    };
    is_trial: boolean;
    is_subscribed: boolean;
    trial_ends_at: string | null;
    on_grace_period: boolean;
    next_billing_date: string | null;
    subscription_status: string | null;
    is_cancelled: boolean;
}

export default function MyPlan({
    user,
    is_trial,
    is_subscribed,
    trial_ends_at,
    on_grace_period,
    next_billing_date,
    subscription_status,
    is_cancelled,
}: Props) {
    console.log('Canceled' + is_cancelled);
    // ✅ FIX: single source of truth (no fake status computation)
    const status = user.subscription_status;

    const purchasedPlan = user.subscription_tier ?? null;

    // ✅ FIX: safe fallback + consistent date source
    const isTrialExpired =
        status === 'trial' &&
        (trial_ends_at || user.trial_ends_at) &&
        new Date(trial_ends_at || (user.trial_ends_at as string)).getTime() <
            Date.now();

    const tiers = [
        {
            key: 'tier_1_view_only' as SubscriptionTier,
            name: 'tier_1_view_only',
            price: '$14.99/month',
            price_id: 'view_only',
            description:
                'View all shared records. No create, edit or delete permissions.',
            features: [
                { label: 'View all records', icon: Eye },
                { label: 'Search & filter data', icon: Check },
                { label: 'No create permissions', icon: Trash2 },
                { label: 'No edit permissions', icon: Pencil },
            ],
        },
        {
            key: 'tier_2_full_access' as SubscriptionTier,
            name: 'tier_2_full_access',
            price: '$19.99/month',
            price_id: 'full_access',
            description:
                'Add, edit and delete your own records with full dataset access.',
            features: [
                { label: 'View all records', icon: Eye },
                { label: 'Add records', icon: Check },
                { label: 'Edit own records', icon: Pencil },
                { label: 'Delete own records', icon: Trash2 },
            ],
        },
    ];
    const isCurrentPlan = (tier: SubscriptionTier) => {
        return user.subscription_tier === tier;
    };
    const isFullAccess = () => {
        return user.subscription_tier === 'tier_2_full_access';
    };
    const isViewOnly = user.subscription_tier === 'tier_1_view_only';
    // const isCurrent = (tier: SubscriptionTier)=> {
    //     return String(user.subscription_tier) === String(tier);
    // };
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Subscription Plan" />

            <div className="mx-auto max-w-5xl px-4 py-10">
                {/* HEADER */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Subscription Plans
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Choose a plan and upgrade anytime
                    </p>

                    <div className="mt-4 flex items-center gap-2">
                        <Badge className="bg-yellow-500 text-white">
                            {is_cancelled
                                ? 'You Have No Plan'
                                : user.subscription_tier
                                      ?.replaceAll('_', ' ')
                                      .toLowerCase()
                                      .replace(/\b\w/g, (char) =>
                                          char.toUpperCase(),
                                      )}
                        </Badge>
                    </div>
                </div>

                {/* ❌ TRIAL EXPIRED */}
                {isTrialExpired && status === 'trial' && (
                    <Card className="mb-6 border-red-200 bg-red-50">
                        <CardContent className="flex items-start gap-3">
                            <AlertTriangle className="mt-0.5 h-5 w-5 text-red-600" />

                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    Your trial has expired
                                </h3>

                                <p className="mt-1 text-sm text-gray-600">
                                    Please choose a subscription plan to
                                    continue using LemonGard.
                                </p>

                                <div className="mt-2 text-sm text-gray-500">
                                    <p>
                                        Trial ended on:{' '}
                                        {trial_ends_at || user.trial_ends_at
                                            ? new Date(
                                                  trial_ends_at ||
                                                      (user.trial_ends_at as string),
                                              ).toLocaleDateString()
                                            : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* ✅ TRIAL ACTIVE */}
                {status === 'trial' && !isTrialExpired && (
                    <Card className="mb-6 border-yellow-200 bg-yellow-50">
                        <CardContent className="flex items-start gap-3">
                            <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-600" />

                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    Trial Mode Active
                                </h3>

                                <p className="mt-1 text-sm text-gray-600">
                                    You are currently exploring the platform.
                                </p>

                                <div className="mt-2 text-sm text-gray-500">
                                    <p>
                                        Trial ends on:{' '}
                                        {trial_ends_at || user.trial_ends_at
                                            ? new Date(
                                                  trial_ends_at ||
                                                      (user.trial_ends_at as string),
                                              ).toLocaleDateString()
                                            : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* 💳 ACTIVE SUBSCRIPTION */}
                {status === 'active' && !is_cancelled && (
                    <Card className="mb-6 border-green-200 bg-green-50">
                        <CardContent className="flex justify-between gap-3">
                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    Active Subscription
                                </h3>

                                <p className="mt-1 text-sm text-gray-600">
                                    You are on a paid plan.
                                </p>

                                <div className="mt-2 text-sm text-gray-500">
                                    <p>
                                        Plan:{' '}
                                        <span className="font-medium text-gray-700">
                                            {user.subscription_tier
                                                ?.replaceAll('_', ' ')
                                                .replace(/\b\w/g, (char) =>
                                                    char.toUpperCase(),
                                                )}
                                        </span>
                                    </p>

                                    <p>
                                        Next billing:{' '}
                                        {next_billing_date
                                            ? new Date(
                                                  Number(next_billing_date) *
                                                      1000,
                                              ).toLocaleDateString()
                                            : 'N/A'}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <Button
                                    disabled={!is_cancelled}
                                    onClick={() => setOpen(true)}
                                    className="bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                                >
                                    {!is_cancelled
                                        ? 'Plan Cancelled'
                                        : 'Cancel Plan'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* ❌ NO PLAN */}
                {is_cancelled && (
                    <Card className="mb-6 border-gray-200 bg-gray-50">
                        <CardContent className="">
                            <p className="text-sm text-gray-600">
                                No active subscription found.
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* PLANS */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {tiers.map((tier) => {
                        const isCurrent = isCurrentPlan(tier.key);
                        const disableButton =
                            user.subscription_tier === 'tier_2_full_access' ||
                            user.subscription_tier === tier.key;

                        return (
                            <Card
                                key={tier.key}
                                className="relative border border-gray-200"
                            >
                                {isCurrent && !is_cancelled && (
                                    <div className="absolute top-4 right-4">
                                        <Badge className="bg-yellow-500 text-white">
                                            Current Plan
                                        </Badge>
                                    </div>
                                )}

                                <CardHeader>
                                    <CardTitle className="text-gray-900">
                                        {tier.name
                                            .replace(/_/g, ' ')
                                            .toLowerCase()
                                            .replace(/\b\w/g, (c) =>
                                                c.toUpperCase(),
                                            )}
                                    </CardTitle>
                                    <p className="text-sm text-gray-500">
                                        {tier.description}
                                    </p>
                                </CardHeader>

                                <CardContent>
                                    <p className="mb-4 text-2xl font-bold text-gray-900">
                                        {tier.price}
                                    </p>

                                    <ul className="mb-6 space-y-3">
                                        {tier.features.map((f, i) => {
                                            const Icon = f.icon;
                                            return (
                                                <li
                                                    key={i}
                                                    className="flex items-center gap-2 text-sm text-gray-700"
                                                >
                                                    <Icon className="h-4 w-4 text-yellow-600" />
                                                    {f.label}
                                                </li>
                                            );
                                        })}
                                    </ul>

                                    {/* {isFullAccess() ? (
                                        <Button
                                            disabled={
                                                !is_cancelled &&
                                                user.subscription_tier !==
                                                    tier.key
                                            }
                                            className={`w-full ${
                                                user.subscription_tier ===
                                                tier.key
                                                    ? 'cursor-default bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800'
                                                    : 'cursor-pointer bg-gray-100 text-gray-500 hover:bg-gray-200'
                                            }`}
                                        >
                                            {user.subscription_tier === tier.key
                                                ? 'Active Plan'
                                                : 'Select Plan'}
                                        </Button>
                                    ) : (
                                        <Button
                                            disabled={disableButton}
                                            onClick={() =>
                                                !disableButton &&
                                                (window.location.href = route(
                                                    'app.checkout',
                                                    tier.name,
                                                ))
                                            }
                                            className={`cursor-pointer ${
                                                disableButton
                                                    ? 'cursor-not-allowed opacity-50'
                                                    : ''
                                            }`}
                                        >
                                            {disableButton
                                                ? 'Not Available'
                                                : 'Select Plan'}
                                        </Button>
                                    )} */}

                                    {isFullAccess() ? (
                                        <Button
                                            disabled={
                                                !is_cancelled &&
                                                user.subscription_tier !==
                                                    tier.key
                                            }
                                            className={`w-full ${
                                                user.subscription_tier ===
                                                tier.key
                                                    ? 'cursor-default bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800'
                                                    : is_cancelled
                                                      ? 'cursor-pointer bg-green-600 text-white hover:bg-green-700'
                                                      : 'cursor-pointer bg-gray-100 text-gray-500 hover:bg-gray-200'
                                            }`}
                                        >
                                            {is_cancelled
                                                ? 'Re-activate Plan'
                                                : user.subscription_tier ===
                                                    tier.key
                                                  ? 'Active Plan'
                                                  : 'Select Plan'}
                                        </Button>
                                    ) : (
                                        <Button
                                            disabled={
                                                is_cancelled
                                                    ? false
                                                    : disableButton
                                            }
                                            onClick={() => {
                                                if (
                                                    is_cancelled ||
                                                    !disableButton
                                                ) {
                                                    window.location.href =
                                                        route(
                                                            'app.checkout',
                                                            tier.name,
                                                        );
                                                }
                                            }}
                                            className={`cursor-pointer ${
                                                is_cancelled
                                                    ? 'bg-navy-600 text-white hover:bg-green-700'
                                                    : disableButton
                                                      ? 'cursor-not-allowed opacity-50'
                                                      : ''
                                            }`}
                                        >
                                            {is_cancelled &&
                                            user.subscription_tier === tier.key
                                                ? 'Reactivate Subscription'
                                                : disableButton
                                                  ? 'Not Available'
                                                  : 'Select Plan'}
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Cancel Subscription</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to cancel your plan? You will
                            still have access until your billing period ends.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            No, Keep Plan
                        </Button>

                        <Button
                            className="bg-red-600 text-white hover:bg-red-700"
                            disabled={loading}
                            onClick={() => {
                                setLoading(true);

                                router.get(
                                    route('app.subscription.plan.cancel'),
                                    {
                                        onFinish: () => {
                                            setLoading(false);
                                            setOpen(false);
                                        },
                                    },
                                );
                            }}
                        >
                            {loading ? 'Cancelling...' : 'Yes, Cancel'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
