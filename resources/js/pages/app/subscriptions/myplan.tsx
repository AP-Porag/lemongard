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
    ends_at;
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
    ends_at,
}: Props) {
    console.log('next date' + is_cancelled);

    const status = user.subscription_status;
    const purchasedPlan = user.subscription_tier ?? null;

    const isTrialExpired =
        status === 'trial' &&
        (trial_ends_at || user.trial_ends_at) &&
        new Date(trial_ends_at || (user.trial_ends_at as string)).getTime() <
            Date.now();

    const isSubscriptionEnded = ends_at
        ? new Date(ends_at).getTime() < Date.now()
        : false;

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

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // // ==========================================
    // // 👑 TIER 1: VIEW ONLY BUTTON FUNCTIONS
    // // ==========================================

    // // ১. বাটনের টেক্সট নির্ধারণ
    // const getTier1ButtonText = () => {
    //     if (isSubscriptionEnded || !user.subscription_tier) {
    //         return 'Select Plan';
    //     }
    //     if (user.subscription_tier === 'tier_1_view_only') {
    //         if (is_cancelled || on_grace_period) {
    //             return 'Resume Plan'; // ক্যান্সেল করা থাকলে এবং গ্রেস পিরিয়ডে থাকলে রিজুম
    //         }
    //         return 'Active Plan';
    //     }
    //     if (user.subscription_tier === 'tier_2_full_access') {
    //         return 'Not Available'; // টায়ার ২ একটিভ থাকলে এটা লকড
    //     }
    //     return 'Select Plan';
    // };

    // // ২. বাটন ডিজেবল হবে কি না (Return true/false)
    // const isTier1Disabled = () => {
    //     if (isSubscriptionEnded || !user.subscription_tier) {
    //         return false; // এক্সপায়ার বা প্ল্যান না থাকলে সবসময় একটিভ
    //     }
    //     if (user.subscription_tier === 'tier_1_view_only') {
    //         if (is_cancelled || on_grace_period) {
    //             return false; // রিজুম করার জন্য বাটনটি একটিভ থাকবে
    //         }
    //         return true; // নরমাল একটিভ থাকলে ক্লিক করার দরকার নাই (Disabled)
    //     }
    //     if (user.subscription_tier === 'tier_2_full_access') {
    //         return true; // ফুল এক্সেস থাকলে ভিউ অনলি ডাউনগ্রেড বাটন ডিজেবল
    //     }
    //     return false;
    // };

    // // ৩. বাটনের ক্লিক হ্যান্ডলার অ্যাকশন
    // const handleTier1Click = () => {
    //     if (
    //         user.subscription_tier === 'tier_1_view_only' &&
    //         (is_cancelled || on_grace_period)
    //     ) {
    //         // যদি রিজুম কন্ডিশন হয়, তবে রিজুম রাউটে পাঠাবে
    //         window.location.href = route('app.subscription.plan.resume'); // (এখানে আপনার সঠিক রিজুম রাউটের নাম দিন)
    //         return;
    //     }
    //     // নরমাল চেকআউট
    //     window.location.href = route('app.checkout', 'tier_1_view_only');
    // };

    // // ==========================================
    // // 👑 TIER 2: FULL ACCESS BUTTON FUNCTIONS
    // // ==========================================

    // // ১. বাটনের টেক্সট নির্ধারণ
    // const getTier2ButtonText = () => {
    //     if (isSubscriptionEnded || !user.subscription_tier) {
    //         return 'Select Plan';
    //     }
    //     if (user.subscription_tier === 'tier_2_full_access') {
    //         if (is_cancelled || on_grace_period) {
    //             return 'Resume Plan'; // ক্যান্সেল করা থাকলে এবং গ্রেস পিরিয়ডে থাকলে রিজুম
    //         }
    //         return 'Active Plan';
    //     }
    //     if (user.subscription_tier === 'tier_1_view_only') {
    //         return 'Upgrade Plan'; // ভিউ অনলি থাকলে এটাকে আপগ্রেড দেখাবে
    //     }
    //     return 'Select Plan';
    // };

    // // ২. বাটন ডিজেবল হবে কি না (Return true/false)
    // const isTier2Disabled = () => {
    //     if (isSubscriptionEnded || !user.subscription_tier) {
    //         return false; // এক্সপায়ার বা প্ল্যান না থাকলে সবসময় একটিভ
    //     }
    //     if (user.subscription_tier === 'tier_2_full_access') {
    //         if (is_cancelled || on_grace_period) {
    //             return false; // রিজুম করার সুযোগ দিতে বাটন একটিভ থাকবে
    //         }
    //         return true; // নরমাল একটিভ থাকলে ডিজেবল
    //     }
    //     if (user.subscription_tier === 'tier_1_view_only') {
    //         return false; // ভিউ অনলি ইউজার ফুল এক্সেসে আপগ্রেড করতে পারবে (Active)
    //     }
    //     return false;
    // };

    // // ৩. বাটনের ক্লিক হ্যান্ডলার অ্যাকশন
    // const handleTier2Click = () => {
    //     if (
    //         user.subscription_tier === 'tier_2_full_access' &&
    //         (is_cancelled || on_grace_period)
    //     ) {
    //         // রিজুম রাউট অ্যাকশন
    //         window.location.href = route('app.subscription.plan.resume'); // (এখানে আপনার সঠিক রিজুম রাউটের নাম দিন)
    //         return;
    //     }
    //     // নরমাল চেকআউট বা আপগ্রেড
    //     window.location.href = route('app.checkout', 'tier_2_full_access');
    // };
    // ==========================================
    // 👑 TIER 1: VIEW ONLY BUTTON FUNCTIONS
    // ==========================================

    // ১. বাটনের টেক্সট নির্ধারণ
    const getTier1ButtonText = () => {
        if (isSubscriptionEnded || !user.subscription_tier) {
            return 'Select Plan';
        }
        if (user.subscription_tier === 'tier_1_view_only') {
            // ✅ যদি ক্যান্সেলড হয় কিন্তু এখনো গ্রেস পিরিয়ড থাকে
            if (is_cancelled || on_grace_period) {
                return 'Resume Subscription';
            }
            return 'Active Plan';
        }
        if (user.subscription_tier === 'tier_2_full_access') {
            return 'Not Available';
        }
        return 'Select Plan';
    };

    // ২. বাটন ডিজেবল হবে কি না (Return true/false)
    const isTier1Disabled = () => {
        if (isSubscriptionEnded || !user.subscription_tier) {
            return false;
        }
        if (user.subscription_tier === 'tier_1_view_only') {
            // ✅ রিজুম করার জন্য বাটনটি একটিভ (false) রাখতে হবে
            if (is_cancelled || on_grace_period) {
                return false;
            }
            return true;
        }
        if (user.subscription_tier === 'tier_2_full_access') {
            return true;
        }
        return false;
    };

    // ৩. বাটনের ক্লিক হ্যান্ডলার অ্যাকশন
    const handleTier1Click = () => {
        // ✅ যদি এটি কারেন্ট প্ল্যান হয় এবং ক্যান্সেলড থাকে, তবে রিজুম রাউটে হিট করবে
        if (
            user.subscription_tier === 'tier_1_view_only' &&
            (is_cancelled || on_grace_period)
        ) {
            router.get(route('app.subscription.plan.resume'));
            return;
        }
        window.location.href = route('app.checkout', 'tier_1_view_only');
    };

    // ==========================================
    // 👑 TIER 2: FULL ACCESS BUTTON FUNCTIONS
    // ==========================================

    // ১. বাটনের টেক্সট নির্ধারণ
    const getTier2ButtonText = () => {
        if (isSubscriptionEnded || !user.subscription_tier) {
            return 'Select Plan';
        }
        if (user.subscription_tier === 'tier_2_full_access') {
            // ✅ যদি ক্যান্সেলড হয় কিন্তু এখনো গ্রেস পিরিয়ড থাকে
            if (is_cancelled || on_grace_period) {
                return 'Resume Subscription';
            }
            return 'Active Plan';
        }
        if (user.subscription_tier === 'tier_1_view_only') {
            return 'Upgrade Plan';
        }
        return 'Select Plan';
    };

    // ২. বাটন ডিজেবল হবে কি না (Return true/false)
    const isTier2Disabled = () => {
        if (isSubscriptionEnded || !user.subscription_tier) {
            return false;
        }
        if (user.subscription_tier === 'tier_2_full_access') {
            // ✅ রিজুম করার জন্য বাটনটি একটিভ (false) রাখতে হবে
            if (is_cancelled || on_grace_period) {
                return false;
            }
            return true;
        }
        if (user.subscription_tier === 'tier_1_view_only') {
            return false;
        }
        return false;
    };

    // ৩. বাটনের ক্লিক হ্যান্ডলার অ্যাকশন
    const handleTier2Click = () => {
        // ✅ যদি এটি কারেন্ট প্ল্যান হয় এবং ক্যান্সেলড থাকে, তবে রিজুম রাউটে হিট করবে
        if (
            user.subscription_tier === 'tier_2_full_access' &&
            (is_cancelled || on_grace_period)
        ) {
            router.get(route('app.subscription.plan.resume'));
            return;
        }
        window.location.href = route('app.checkout', 'tier_2_full_access');
    };
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
                                            ? next_billing_date
                                            : 'N/A'}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <Button
                                    disabled={is_cancelled}
                                    onClick={() => setOpen(true)}
                                    className="bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                                >
                                    {is_cancelled
                                        ? 'Plan Cancelled'
                                        : 'Cancel Plan'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* ❌ SUBCRIPTION CANCELLED*/}
                {isSubscriptionEnded ? (
                    <Card className="mb-6 border-gray-200 bg-gray-50">
                        <CardContent>
                            <p className="text-sm text-gray-600">
                                You have no active plan.
                            </p>
                        </CardContent>
                    </Card>
                ) : is_cancelled ? (
                    <Card className="mb-6 border-gray-200 bg-gray-50">
                        <CardContent>
                            <p className="text-sm text-gray-600">
                                Your subscription has been cancelled. You will
                                continue to have access until the end of your
                                billing period.
                            </p>
                        </CardContent>
                    </Card>
                ) : null}

                {/* PLANS */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {tiers.map((tier) => {
                        const isCurrent = isCurrentPlan(tier.key);

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

                                    {/* ⚡ CLEAN CONDITION COMPONENT CALL */}
                                    {tier.key === 'tier_1_view_only' ? (
                                        <Button
                                            disabled={isTier1Disabled()}
                                            onClick={handleTier1Click}
                                            className={`w-full ${
                                                isTier1Disabled()
                                                    ? 'cursor-not-allowed bg-gray-100 text-gray-500 opacity-50'
                                                    : 'cursor-pointer bg-navy-600 text-white hover:bg-navy-700'
                                            }`}
                                        >
                                            {getTier1ButtonText()}
                                        </Button>
                                    ) : (
                                        <Button
                                            disabled={isTier2Disabled()}
                                            onClick={handleTier2Click}
                                            className={`w-full ${
                                                isTier2Disabled()
                                                    ? 'cursor-not-allowed bg-gray-100 text-gray-500 opacity-50'
                                                    : 'cursor-pointer bg-navy-600 text-white hover:bg-navy-700'
                                            }`}
                                        >
                                            {getTier2ButtonText()}
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

// import React from 'react';
// import { Head, router } from '@inertiajs/react';
// import AppLayout from '@/layouts/app-layout';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Eye, Check, Pencil, Trash2, AlertTriangle } from 'lucide-react';
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogDescription,
//     DialogFooter,
// } from '@/components/ui/dialog';

// import { useState } from 'react';
// import type { BreadcrumbItem } from '@/types';

// const breadcrumbs: BreadcrumbItem[] = [
//     {
//         title: 'My Plan',
//         href: '',
//     },
// ];

// type SubscriptionTier = 'tier_1_view_only' | 'tier_2_full_access';
// type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'cancelled';

// interface Props {
//     user: {
//         subscription_tier?: SubscriptionTier | null;
//         subscription_status: SubscriptionStatus;
//         trial_ends_at?: string | null;
//     };
//     is_trial: boolean;
//     is_subscribed: boolean;
//     trial_ends_at: string | null;
//     on_grace_period: boolean;
//     next_billing_date: string | null;
//     subscription_status: string | null;
//     is_cancelled: boolean;
//     ends_at;
// }

// export default function MyPlan({
//     user,
//     is_trial,
//     is_subscribed,
//     trial_ends_at,
//     on_grace_period,
//     next_billing_date,
//     subscription_status,
//     is_cancelled,
//     ends_at,
// }: Props) {
//     console.log('next date' + is_cancelled);
//     // ✅ FIX: single source of truth (no fake status computation)
//     const status = user.subscription_status;

//     const purchasedPlan = user.subscription_tier ?? null;

//     // ✅ FIX: safe fallback + consistent date source
//     const isTrialExpired =
//         status === 'trial' &&
//         (trial_ends_at || user.trial_ends_at) &&
//         new Date(trial_ends_at || (user.trial_ends_at as string)).getTime() <
//             Date.now();

//     const isSubscriptionEnded = ends_at
//         ? new Date(ends_at).getTime() < Date.now()
//         : false;

//     const tiers = [
//         {
//             key: 'tier_1_view_only' as SubscriptionTier,
//             name: 'tier_1_view_only',
//             price: '$14.99/month',
//             price_id: 'view_only',
//             description:
//                 'View all shared records. No create, edit or delete permissions.',
//             features: [
//                 { label: 'View all records', icon: Eye },
//                 { label: 'Search & filter data', icon: Check },
//                 { label: 'No create permissions', icon: Trash2 },
//                 { label: 'No edit permissions', icon: Pencil },
//             ],
//         },
//         {
//             key: 'tier_2_full_access' as SubscriptionTier,
//             name: 'tier_2_full_access',
//             price: '$19.99/month',
//             price_id: 'full_access',
//             description:
//                 'Add, edit and delete your own records with full dataset access.',
//             features: [
//                 { label: 'View all records', icon: Eye },
//                 { label: 'Add records', icon: Check },
//                 { label: 'Edit own records', icon: Pencil },
//                 { label: 'Delete own records', icon: Trash2 },
//             ],
//         },
//     ];
//     const isCurrentPlan = (tier: SubscriptionTier) => {
//         return user.subscription_tier === tier;
//     };
//     const isFullAccess = () => {
//         return user.subscription_tier === 'tier_2_full_access';
//     };
//     const isViewOnly = user.subscription_tier === 'tier_1_view_only';

//     // const isCurrent = (tier: SubscriptionTier)=> {
//     //     return String(user.subscription_tier) === String(tier);
//     // };
//     const [open, setOpen] = useState(false);
//     const [loading, setLoading] = useState(false);
//     return (
//         <AppLayout breadcrumbs={breadcrumbs}>
//             <Head title="Subscription Plan" />

//             <div className="mx-auto max-w-5xl px-4 py-10">
//                 {/* HEADER */}
//                 <div className="mb-8">
//                     <h1 className="text-2xl font-semibold text-gray-900">
//                         Subscription Plans
//                     </h1>

//                     <p className="mt-1 text-gray-500">
//                         Choose a plan and upgrade anytime
//                     </p>

//                     <div className="mt-4 flex items-center gap-2">
//                         <Badge className="bg-yellow-500 text-white">
//                             {is_cancelled
//                                 ? 'You Have No Plan'
//                                 : user.subscription_tier
//                                       ?.replaceAll('_', ' ')
//                                       .toLowerCase()
//                                       .replace(/\b\w/g, (char) =>
//                                           char.toUpperCase(),
//                                       )}
//                         </Badge>
//                     </div>
//                 </div>

//                 {/* ❌ TRIAL EXPIRED */}
//                 {isTrialExpired && status === 'trial' && (
//                     <Card className="mb-6 border-red-200 bg-red-50">
//                         <CardContent className="flex items-start gap-3">
//                             <AlertTriangle className="mt-0.5 h-5 w-5 text-red-600" />

//                             <div>
//                                 <h3 className="font-semibold text-gray-900">
//                                     Your trial has expired
//                                 </h3>

//                                 <p className="mt-1 text-sm text-gray-600">
//                                     Please choose a subscription plan to
//                                     continue using LemonGard.
//                                 </p>

//                                 <div className="mt-2 text-sm text-gray-500">
//                                     <p>
//                                         Trial ended on:{' '}
//                                         {trial_ends_at || user.trial_ends_at
//                                             ? new Date(
//                                                   trial_ends_at ||
//                                                       (user.trial_ends_at as string),
//                                               ).toLocaleDateString()
//                                             : 'N/A'}
//                                     </p>
//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 )}

//                 {/* ✅ TRIAL ACTIVE */}
//                 {status === 'trial' && !isTrialExpired && (
//                     <Card className="mb-6 border-yellow-200 bg-yellow-50">
//                         <CardContent className="flex items-start gap-3">
//                             <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-600" />

//                             <div>
//                                 <h3 className="font-semibold text-gray-900">
//                                     Trial Mode Active
//                                 </h3>

//                                 <p className="mt-1 text-sm text-gray-600">
//                                     You are currently exploring the platform.
//                                 </p>

//                                 <div className="mt-2 text-sm text-gray-500">
//                                     <p>
//                                         Trial ends on:{' '}
//                                         {trial_ends_at || user.trial_ends_at
//                                             ? new Date(
//                                                   trial_ends_at ||
//                                                       (user.trial_ends_at as string),
//                                               ).toLocaleDateString()
//                                             : 'N/A'}
//                                     </p>
//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 )}

//                 {/* 💳 ACTIVE SUBSCRIPTION */}
//                 {status === 'active' && !is_cancelled && (
//                     <Card className="mb-6 border-green-200 bg-green-50">
//                         <CardContent className="flex justify-between gap-3">
//                             <div>
//                                 <h3 className="font-semibold text-gray-900">
//                                     Active Subscription
//                                 </h3>

//                                 <p className="mt-1 text-sm text-gray-600">
//                                     You are on a paid plan.
//                                 </p>

//                                 <div className="mt-2 text-sm text-gray-500">
//                                     <p>
//                                         Plan:{' '}
//                                         <span className="font-medium text-gray-700">
//                                             {user.subscription_tier
//                                                 ?.replaceAll('_', ' ')
//                                                 .replace(/\b\w/g, (char) =>
//                                                     char.toUpperCase(),
//                                                 )}
//                                         </span>
//                                     </p>
//                                     <p>
//                                         Next billing:{' '}
//                                         {next_billing_date
//                                             ? next_billing_date
//                                             : 'N/A'}
//                                     </p>
//                                 </div>
//                             </div>
//                             <div>
//                                 <Button
//                                     disabled={is_cancelled}
//                                     onClick={() => setOpen(true)}
//                                     className="bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
//                                 >
//                                     {is_cancelled
//                                         ? 'Plan Cancelled'
//                                         : 'Cancel Plan'}
//                                 </Button>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 )}

//                 {/* ❌ SUBCRIPTION CANCELLED*/}
//                 {isSubscriptionEnded ? (
//                     <Card className="mb-6 border-gray-200 bg-gray-50">
//                         <CardContent>
//                             <p className="text-sm text-gray-600">
//                                 You have no active plan.
//                             </p>
//                         </CardContent>
//                     </Card>
//                 ) : is_cancelled ? (
//                     <Card className="mb-6 border-gray-200 bg-gray-50">
//                         <CardContent>
//                             <p className="text-sm text-gray-600">
//                                 Your subscription has been cancelled. You will
//                                 continue to have access until the end of your
//                                 billing period.
//                             </p>
//                         </CardContent>
//                     </Card>
//                 ) : null}

//                 {/* PLANS */}
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                     {tiers.map((tier) => {
//                         const isCurrent = isCurrentPlan(tier.key);
//                         const disableButton =
//                             user.subscription_tier === 'tier_2_full_access' ||
//                             user.subscription_tier === tier.key;
//                         const isPlanCancelledLocked =
//                             is_cancelled && user.subscription_tier === tier.key;

//                         const isSubscriptionEnded = ends_at
//                             ? new Date(ends_at).getTime() < Date.now()
//                             : false;

//                         // Current active tier
//                         const isCurrentTier =
//                             user.subscription_tier === tier.key;

//                         // Cancelled current tier
//                         const isPlanCancelled = is_cancelled && isCurrentTier;

//                         // FINAL CLICK LOGIC
//                         const isClickable = isSubscriptionEnded
//                             ? true // expired হলে সব clickable
//                             : user.subscription_tier === 'tier_2_full_access'
//                               ? false // tier_2_full_access active থাকলে কিছুই clickable না
//                               : user.subscription_tier === 'tier_1_view_only'
//                                 ? tier.key === 'tier_2_full_access' // শুধু tier_2_full_access clickable
//                                 : !disableButton;

//                         // Final disabled state
//                         const isDisabled = isPlanCancelled || !isClickable;

//                         return (
//                             <Card
//                                 key={tier.key}
//                                 className="relative border border-gray-200"
//                             >
//                                 {isCurrent && !is_cancelled && (
//                                     <div className="absolute top-4 right-4">
//                                         <Badge className="bg-yellow-500 text-white">
//                                             Current Plan
//                                         </Badge>
//                                     </div>
//                                 )}

//                                 <CardHeader>
//                                     <CardTitle className="text-gray-900">
//                                         {tier.name
//                                             .replace(/_/g, ' ')
//                                             .toLowerCase()
//                                             .replace(/\b\w/g, (c) =>
//                                                 c.toUpperCase(),
//                                             )}
//                                     </CardTitle>
//                                     <p className="text-sm text-gray-500">
//                                         {tier.description}
//                                     </p>
//                                 </CardHeader>

//                                 <CardContent>
//                                     <p className="mb-4 text-2xl font-bold text-gray-900">
//                                         {tier.price}
//                                     </p>

//                                     <ul className="mb-6 space-y-3">
//                                         {tier.features.map((f, i) => {
//                                             const Icon = f.icon;
//                                             return (
//                                                 <li
//                                                     key={i}
//                                                     className="flex items-center gap-2 text-sm text-gray-700"
//                                                 >
//                                                     <Icon className="h-4 w-4 text-yellow-600" />
//                                                     {f.label}
//                                                 </li>
//                                             );
//                                         })}
//                                     </ul>

//                                     {/* {isFullAccess() ? (
//                                         <Button
//                                             disabled={
//                                                 is_cancelled &&
//                                                 user.subscription_tier !==
//                                                     tier.key
//                                             }
//                                             className={`w-full ${
//                                                 user.subscription_tier ===
//                                                 tier.key
//                                                     ? 'cursor-default bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800'
//                                                     : is_cancelled
//                                                       ? 'cursor-pointer bg-green-600 text-white hover:bg-green-700'
//                                                       : 'cursor-pointer bg-gray-100 text-gray-500 hover:bg-gray-200'
//                                             }`}
//                                         >
//                                             {is_cancelled
//                                                 ? 'Re-activate Plan'
//                                                 : user.subscription_tier ===
//                                                     tier.key
//                                                   ? 'Active Plan'
//                                                   : 'Select Plan'}
//                                         </Button>
//                                     ) : (
//                                         <Button
//                                             disabled={
//                                                 is_cancelled
//                                                     ? false
//                                                     : disableButton
//                                             }
//                                             onClick={() => {
//                                                 if (
//                                                     is_cancelled ||
//                                                     !disableButton
//                                                 ) {
//                                                     window.location.href =
//                                                         route(
//                                                             'app.checkout',
//                                                             tier.name,
//                                                         );
//                                                 }
//                                             }}
//                                             className={`cursor-pointer ${
//                                                 is_cancelled
//                                                     ? 'bg-navy-600 text-white hover:bg-green-700'
//                                                     : disableButton
//                                                       ? 'cursor-not-allowed opacity-50'
//                                                       : ''
//                                             }`}
//                                         >
//                                             {is_cancelled &&
//                                             user.subscription_tier === tier.key
//                                                 ? 'Reactivate Subscription'
//                                                 : disableButton
//                                                   ? 'Not Available'
//                                                   : 'Select Plan'}
//                                         </Button>
//                                     )} */}

//                                     {isFullAccess() ? (
//                                         <Button
//                                             disabled={isDisabled}
//                                             onClick={() => {
//                                                 if (isDisabled) return;

//                                                 window.location.href = route(
//                                                     'app.checkout',
//                                                     tier.name,
//                                                 );
//                                             }}
//                                             className={`w-full ${
//                                                 user.subscription_tier ===
//                                                 tier.key
//                                                     ? isSubscriptionEnded
//                                                         ? 'cursor-pointer bg-green-600 text-white hover:bg-green-700'
//                                                         : 'cursor-default bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800'
//                                                     : is_cancelled ||
//                                                         isSubscriptionEnded
//                                                       ? 'cursor-pointer bg-green-600 text-white hover:bg-green-700'
//                                                       : isDisabled
//                                                         ? 'cursor-not-allowed bg-gray-100 text-gray-500 opacity-50'
//                                                         : 'cursor-pointer bg-gray-100 text-gray-500 hover:bg-gray-200'
//                                             }`}
//                                         >
//                                             {isSubscriptionEnded
//                                                 ? 'Select Plan'
//                                                 : is_cancelled
//                                                   ? 'Plan Cancelled'
//                                                   : user.subscription_tier ===
//                                                       tier.key
//                                                     ? 'Active Plan'
//                                                     : 'Select Plan'}
//                                         </Button>
//                                     ) : (
//                                         <Button
//                                             disabled={isDisabled}
//                                             onClick={() => {
//                                                 if (isDisabled) return;

//                                                 window.location.href = route(
//                                                     'app.checkout',
//                                                     tier.name,
//                                                 );
//                                             }}
//                                             className={`cursor-pointer ${
//                                                 isSubscriptionEnded
//                                                     ? 'bg-navy-600 text-white hover:bg-green-700'
//                                                     : is_cancelled
//                                                       ? 'bg-navy-600 text-white hover:bg-green-700'
//                                                       : isDisabled
//                                                         ? 'cursor-not-allowed opacity-50'
//                                                         : ''
//                                             }`}
//                                         >
//                                             {isSubscriptionEnded
//                                                 ? 'Select Plan'
//                                                 : is_cancelled && isCurrentTier
//                                                   ? 'Plan Cancelled'
//                                                   : disableButton
//                                                     ? 'Not Available'
//                                                     : 'Select Plan'}
//                                         </Button>
//                                     )}
//                                 </CardContent>
//                             </Card>
//                         );
//                     })}
//                 </div>
//             </div>
//             <Dialog open={open} onOpenChange={setOpen}>
//                 <DialogContent>
//                     <DialogHeader>
//                         <DialogTitle>Cancel Subscription</DialogTitle>
//                         <DialogDescription>
//                             Are you sure you want to cancel your plan? You will
//                             still have access until your billing period ends.
//                         </DialogDescription>
//                     </DialogHeader>

//                     <DialogFooter className="flex gap-2">
//                         <Button
//                             variant="outline"
//                             onClick={() => setOpen(false)}
//                         >
//                             No, Keep Plan
//                         </Button>

//                         <Button
//                             className="bg-red-600 text-white hover:bg-red-700"
//                             disabled={loading}
//                             onClick={() => {
//                                 setLoading(true);

//                                 router.get(
//                                     route('app.subscription.plan.cancel'),
//                                     {
//                                         onFinish: () => {
//                                             setLoading(false);
//                                             setOpen(false);
//                                         },
//                                     },
//                                 );
//                             }}
//                         >
//                             {loading ? 'Cancelling...' : 'Yes, Cancel'}
//                         </Button>
//                     </DialogFooter>
//                 </DialogContent>
//             </Dialog>
//         </AppLayout>
//     );
// }
