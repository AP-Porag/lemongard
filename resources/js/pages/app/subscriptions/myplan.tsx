import React from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Check, Pencil, Trash2, AlertTriangle } from 'lucide-react';

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
}

export default function MyPlan({
    user,
    is_trial,
    is_subscribed,
    trial_ends_at,
}: Props) {
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
            name: 'Tier 1 view only',
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
            name: 'Tier 2 full access',
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

    // const isCurrent = (tier: SubscriptionTier) => {
    //     return String(user.subscription_tier) === String(tier);
    // };

    return (
        <AppLayout>
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
                            {user.subscription_tier
                                ?.replaceAll('_', ' ')
                                .toLowerCase()
                                .replace(/\b\w/g, (char) => char.toUpperCase())}
                        </Badge>
                    </div>
                </div>

                {/* ❌ TRIAL EXPIRED */}
                {isTrialExpired && status === 'trial' && (
                    <Card className="mb-6 border-red-200 bg-red-50">
                        <CardContent className="flex items-start gap-3 pt-6">
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
                        <CardContent className="flex items-start gap-3 pt-6">
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
                {status === 'active' && (
                    <Card className="mb-6 border-green-200 bg-green-50">
                        <CardContent className="flex items-start gap-3 pt-6">
                            <Check className="mt-0.5 h-5 w-5 text-green-600" />

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

                                    <p>Next billing: N/A</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* ❌ NO PLAN */}
                {status !== 'trial' && status !== 'active' && (
                    <Card className="mb-6 border-gray-200 bg-gray-50">
                        <CardContent className="pt-6">
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
                        console.log(isCurrent);

                        return (
                            <Card
                                key={tier.key}
                                className="relative border border-gray-200"
                            >
                                {isCurrent && (
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

                                    {isFullAccess ? (
                                        <Button
                                            disabled
                                            className="w-full bg-yellow-100 text-yellow-800"
                                        >
                                            Active Plan
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() =>
                                                (window.location.href = route(
                                                    'app.checkout',
                                                    tier.name,
                                                ))
                                            }
                                        >
                                            Select Plan
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
