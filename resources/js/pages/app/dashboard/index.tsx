import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/app/dashboard',
    },
];

interface Record {
    id: number;
    first_name: string;
    last_name: string;
    service: string;
    city: string;
    created_at: string;
}

interface Stats {
    total_records: number;
    my_records: number;
    recent_records: Record[];
}

export default function Dashboard({ stats }: { stats: Stats }) {
    const { auth } = usePage().props;

    const user = auth?.user;

    const status = user?.subscription_status;
    const trialEndsAt = user?.trial_ends_at;

    const now = new Date();
    const trialEnd = trialEndsAt ? new Date(trialEndsAt) : null;

    const isTrialExpired = trialEnd ? now > trialEnd : false;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-[#F6F8FB] p-6">
                <div className="mx-auto max-w-7xl space-y-8">
                    {/* HEADER */}
                    <div className="gap flex justify-between rounded-2xl border border-slate-200 bg-gradient-to-r from-[#0B1F3A] to-[#0F2A4A] p-8 text-white shadow-sm">
                        <div className="max-w-2xl">
                            <h1 className="text-3xl font-semibold tracking-tight text-white">
                                Welcome to LemonGard
                            </h1>
                            <p className="mt-2 text-sm text-white">
                                CRM dashboard • records overview • subscription
                                insights
                            </p>
                        </div>
                        <div>🍋</div>
                    </div>

                    {/* KPI GRID */}
                    <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-3">
                        {/* TOTAL */}
                        <Card className="border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                                            Total Records
                                        </p>
                                        <p className="mt-2 text-3xl font-semibold text-[#0B1F3A]">
                                            {stats.total_records}
                                        </p>
                                    </div>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B1F3A]/10 text-[#0B1F3A]">
                                        📊
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* MY RECORDS */}
                        <Card className="border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                                            My Records
                                        </p>
                                        <p className="mt-2 text-3xl font-semibold text-[#0B1F3A]">
                                            {stats.my_records}
                                        </p>
                                    </div>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700">
                                        👤
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* STATUS */}
                        <Card className="border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                                            Subscription Status
                                        </p>
                                        <p className="mt-2 text-sm font-semibold text-emerald-600">
                                            {status === 'trial'
                                                ? 'Trial Active'
                                                : status === 'expired'
                                                  ? 'Trial Expired'
                                                  : status === 'active'
                                                    ? 'Active Plan'
                                                    : 'Unknown'}
                                        </p>
                                    </div>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                                        ⚡
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* RECENT TABLE */}
                    <div className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                            <h2 className="text-sm font-semibold text-[#0B1F3A]">
                                Recent Records
                            </h2>
                            <span className="text-xs text-slate-500">
                                Latest system activity
                            </span>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {stats.recent_records.map((record) => (
                                <div
                                    key={record.id}
                                    className="flex items-center justify-between px-6 py-4 hover:bg-slate-50"
                                >
                                    <div className="min-w-0">
                                        <p className="truncate font-medium text-[#0B1F3A]">
                                            {record.first_name}{' '}
                                            {record.last_name}
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            {record.service} • {record.city}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                            {new Date(
                                                record.created_at,
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
