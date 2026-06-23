import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import {
    Users,
    UserCheck,
    Zap,
    ArrowRight,
    Clock,
    MapPin,
    Briefcase,
} from 'lucide-react';
import { Link } from '@inertiajs/react';

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

    // Subscription Status Logic
    const getStatusColor = (status: string | undefined) => {
        switch (status) {
            case 'active':
                return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'trial':
                return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'expired':
                return 'bg-rose-100 text-rose-700 border-rose-200';
            default:
                return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
                <div className="mx-auto max-w-7xl space-y-8">
                    {/* WELCOME BANNER */}
                    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[#0B1F3A] p-8 text-white shadow-lg">
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">
                                    Welcome back, {user?.name || 'User'}!
                                </h1>
                                <p className="mt-2 text-slate-300">
                                    Manage your records and track subscription
                                    insights in one place.
                                </p>
                            </div>
                            {/* <div className="mt-6 md:mt-0">
                                <Link
                                    href={route('app.records.create')} // আপনার রাউট অনুযায়ী চেঞ্জ করুন
                                    className="inline-flex items-center rounded-xl bg-yellow-500 px-5 py-2.5 text-sm font-semibold text-[#0B1F3A] transition hover:bg-yellow-400"
                                >
                                    Add New Record{' '}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </div> */}
                        </div>
                        {/* Abstract Background Shape */}
                        <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-white/5 blur-3xl"></div>
                    </div>

                    {/* KPI GRID */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {/* TOTAL RECORDS */}
                        {/* <Card className="overflow-hidden border-none shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                                        <Users className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium tracking-wider text-slate-500 uppercase">
                                            Total Records
                                        </p>
                                        <h3 className="text-3xl font-bold text-slate-900">
                                            {stats.total_records.toLocaleString()}
                                        </h3>
                                    </div>
                                </div>
                            </CardContent>
                        </Card> */}

                        {/* MY RECORDS */}
                        <Card className="overflow-hidden border-none shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                                        <UserCheck className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium tracking-wider text-slate-500 uppercase">
                                            My Records
                                        </p>
                                        <h3 className="text-3xl font-bold text-slate-900">
                                            {stats.my_records.toLocaleString()}
                                        </h3>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* SUBSCRIPTION STATUS */}
                        {/* <Card className="overflow-hidden border-none shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                                        <Zap className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium tracking-wider text-slate-500 uppercase">
                                            Status
                                        </p>
                                        <Badge
                                            variant="outline"
                                            className={`mt-1 font-semibold ${getStatusColor(user?.subscription_status)}`}
                                        >
                                            {user?.subscription_status ===
                                            'trial'
                                                ? 'Free Trial'
                                                : user?.subscription_status ===
                                                    'active'
                                                  ? 'Premium Active'
                                                  : 'Basic Access'}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card> */}
                    </div>

                    {/* RECENT RECORDS TABLE SECTION */}
                    <Card className="border-none shadow-sm ring-1 ring-slate-200">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 bg-white/50 px-6 py-4">
                            <CardTitle className="text-lg font-bold text-slate-800">
                                Recent Activity
                            </CardTitle>
                            <Link
                                href="/app/records"
                                className="text-sm font-medium text-indigo-600 hover:underline"
                            >
                                Search All
                            </Link>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase">
                                        <tr>
                                            <th className="px-6 py-3">
                                                User Information
                                            </th>
                                            <th className="px-6 py-3">
                                                Location & Service
                                            </th>
                                            <th className="px-6 py-3 text-right">
                                                Date Added
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {stats.recent_records.length > 0 ? (
                                            stats.recent_records.map(
                                                (record) => (
                                                    <tr
                                                        key={record.id}
                                                        className="group transition hover:bg-slate-50/80"
                                                    >
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700">
                                                                    {
                                                                        record
                                                                            .first_name[0]
                                                                    }
                                                                    {
                                                                        record
                                                                            .last_name[0]
                                                                    }
                                                                </div>
                                                                <p className="font-semibold text-slate-900">
                                                                    {
                                                                        record.first_name
                                                                    }{' '}
                                                                    {
                                                                        record.last_name
                                                                    }
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="space-y-1">
                                                                <div className="flex items-center text-sm text-slate-600">
                                                                    <Briefcase className="mr-1.5 h-3.5 w-3.5 text-slate-400" />
                                                                    {
                                                                        record.service
                                                                    }
                                                                </div>
                                                                <div className="flex items-center text-xs text-slate-400">
                                                                    <MapPin className="mr-1.5 h-3 w-3" />
                                                                    {
                                                                        record.city
                                                                    }
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-right text-sm text-slate-500">
                                                            <div className="flex items-center justify-end gap-1.5">
                                                                <Clock className="h-3.5 w-3.5" />
                                                                {new Date(
                                                                    record.created_at,
                                                                ).toLocaleDateString(
                                                                    undefined,
                                                                    {
                                                                        month: 'short',
                                                                        day: 'numeric',
                                                                        year: 'numeric',
                                                                    },
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ),
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={3}
                                                    className="px-6 py-12 text-center text-slate-400"
                                                >
                                                    No records found. Start
                                                    adding some!
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
