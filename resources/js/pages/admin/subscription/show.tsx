import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout.js';
const breadcrumbs = [
    {
        title: 'Subscription Details',
        href: '',
    },
];

export default function Show({ subscription }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Subscription Details" />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Subscription Details</h1>
                <div className="bg-white shadow rounded p-6 space-y-3">
                    <div><strong>User:</strong> {subscription.user?.name} ({subscription.user?.email})</div>
                    <div><strong>Type:</strong> {subscription.type}</div>
                    <div><strong>Status:</strong> {subscription.stripe_status}</div>
                    <div><strong>Stripe ID:</strong> {subscription.stripe_id}</div>
                    <div><strong>Plan:</strong>  {subscription.stripe_price === 'price_1U0nQCFulxMQQHJjvEsWv8wc'
                        ? 'View Only'
                        : subscription.stripe_price === 'price_1U0nRqFulxMQQHJjA3FJ4s5r'
                            ? 'Full Access'
                            : 'Trial'}</div>
                    <div><strong>Quantity:</strong> {subscription.quantity || '—'}</div>
                    <div><strong>Trial Ends:</strong> {subscription.trial_ends_at ? new Date(subscription.trial_ends_at).toLocaleDateString() : '—'}</div>
                    <div><strong>Ends At:</strong> {subscription.ends_at ? new Date(subscription.ends_at).toLocaleDateString() : '—'}</div>
                    <div><strong>Created:</strong> {new Date(subscription.created_at).toLocaleString()}</div>
                </div>
            </div>
        </AppLayout>
    );
}
