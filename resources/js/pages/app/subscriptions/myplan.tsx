import React from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Check, Pencil, Trash2, AlertTriangle } from 'lucide-react';

type SubscriptionTier = 'view_only' | 'full_access';
type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'cancelled';

interface Props {
    auth: {
        user: {
            subscription_tier?: SubscriptionTier | null;
            subscription_status: SubscriptionStatus;
            trial_ends_at?: string | null;
        };
    };
}

export default function MyPlan({ auth }: Props) {
    const user = auth.user;

    const status = user.subscription_status;

    const purchasedPlan = user.subscription_tier ?? null;

    /**
     * ✅ NEW: client-side safety check (optional visual fallback)
     */
    const isTrialExpired =
        status === 'trial' &&
        user.trial_ends_at &&
        new Date(user.trial_ends_at).getTime() < Date.now();

    const tiers = [
        {
            key: 'view_only' as SubscriptionTier,
            title: 'Tier 1 – View Only',
            price: '$14.99/month',
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
            key: 'full_access' as SubscriptionTier,
            title: 'Tier 2 – Full Access',
            price: '$19.99/month',
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

    const handleSelectPlan = (tier: SubscriptionTier) => {
        router.get(`/app/checkout/${tier}`);
    };

    const isCurrentPlan = (tier: SubscriptionTier) => {
        return purchasedPlan === tier;
    };

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

                    {/* STATUS BADGE (UNCHANGED) */}
                    <div className="mt-4 flex items-center gap-2">
                        <Badge className="bg-yellow-500 text-white">
                            {status.toUpperCase()}
                        </Badge>
                    </div>
                </div>

                {/* ✅ NEW: Trial expired warning (logic only) */}
                {isTrialExpired && (
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
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* TRIAL INFO (UNCHANGED LOGIC) */}
                {status === 'trial' && !isTrialExpired && (
                    <Card className="mb-6 border-yellow-200 bg-yellow-50">
                        <CardContent className="flex items-start gap-3 pt-6">
                            <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-600" />
                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    Trial Mode Active
                                </h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    You are currently exploring the platform. No
                                    subscription purchased yet.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* PLANS GRID (UNCHANGED) */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {tiers.map((tier) => {
                        const isCurrent = isCurrentPlan(tier.key);

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
                                        {tier.title}
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

                                    {isCurrent ? (
                                        <Button
                                            disabled
                                            className="w-full bg-yellow-100 text-yellow-800"
                                        >
                                            Active Plan
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() =>
                                                handleSelectPlan(tier.key)
                                            }
                                            className="w-full bg-yellow-500 text-white hover:bg-yellow-600"
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
