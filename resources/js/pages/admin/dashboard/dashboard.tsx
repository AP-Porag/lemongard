import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePage } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';

import {
    PieChart,
    Pie,
    BarChart,
    Cell,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';

import {
    Users,
    UserCheck,
    Clock,
    XCircle,
    AlertTriangle,
    TrendingUp,
    DollarSign,
    Activity,
} from 'lucide-react';

interface Stats {
    total_subscriber: number;
    trialing: number;
    active: number;
    canceled: number;
    past_due: number;
    trial_expired: number;
    total_revenue: number;

    plan_distribution: {
        name: string;
        total: number;
    }[];

    monthly_subscriptions: {
        month: string;
        total: number;
    }[];

    monthly_revenue: {
        month: string;
        total_revenue: number;
    }[];
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '',
    },
];
export default function Dashboard() {
    const { stats } = usePage<{ stats: Stats }>().props;

    const COLORS = ['#12327C', '#FBC028', '#22c55e', '#ef4444', '#a855f7'];

    const formatMoney = (value: number) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value);

    const kpis = [
        {
            title: 'Total Revenue',
            value: formatMoney(stats.total_revenue),
            icon: DollarSign,
            color: 'bg-blue-950',
        },
        {
            title: 'Total Subscribers',
            value: stats.total_subscriber,
            icon: Users,
            color: 'bg-blue-900',
        },
        {
            title: 'Active',
            value: stats.active,
            icon: UserCheck,
            color: 'bg-emerald-600',
        },
        {
            title: 'On Trial',
            value: stats.trialing,
            icon: Clock,
            color: 'bg-yellow-500',
        },
        {
            title: 'Canceled',
            value: stats.canceled,
            icon: XCircle,
            color: 'bg-red-500',
        },
        {
            title: 'Past Due',
            value: stats.past_due,
            icon: AlertTriangle,
            color: 'bg-orange-500',
        },
        {
            title: 'Trial Expired',
            value: stats.trial_expired,
            icon: Activity,
            color: 'bg-purple-600',
        },
    ];

    const planData = stats.plan_distribution.map((item) => ({
        name: item.name
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/\b\w/g, (c) => c.toUpperCase()),
        value: item.total,
    }));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="min-h-screen space-y-6 bg-slate-50 p-6">
                {/* HEADER */}
                <div className="rounded-xl bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-white shadow-sm">
                    <h1 className="text-2xl font-semibold">
                        Dashboard Overview
                    </h1>
                    <p className="text-sm text-white/70">
                        Real-time subscription analytics & revenue insights
                    </p>
                </div>

                {/* KPI GRID */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {kpis.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Card key={index} className="border-none shadow-sm">
                                <CardContent className="flex items-center justify-between p-5">
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            {item.title}
                                        </p>
                                        <p className="text-xl font-semibold">
                                            {item.value}
                                        </p>
                                    </div>
                                    <div
                                        className={`rounded-full p-3 text-white ${item.color}`}
                                    >
                                        <Icon size={18} />
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* CHARTS GRID */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* SUBSCRIPTIONS */}
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle>Monthly Subscriptions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={stats.monthly_subscriptions}
                                    >
                                        <XAxis
                                            dataKey="month"
                                            tickFormatter={(value) =>
                                                new Date(value).toLocaleString(
                                                    'default',
                                                    { month: 'short' },
                                                )
                                            }
                                        />
                                        <YAxis />
                                        <Tooltip
                                            // এটি টুলটিপের উপরের হেডার বা লেবেল (মাসের নাম) ঠিক করবে
                                            labelFormatter={(value) => {
                                                return new Date(
                                                    value,
                                                ).toLocaleString('default', {
                                                    month: 'long',
                                                    year: 'numeric',
                                                });
                                            }}
                                            // আপনি চাইলে ডেটা আইটেমের নামও সুন্দর করতে পারেন
                                            formatter={(value) => [
                                                value,
                                                'Total Subscriptions',
                                            ]}
                                        />
                                        <Bar
                                            dataKey="total"
                                            fill="#12327C"
                                            radius={[6, 6, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* PLAN DISTRIBUTION */}
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle>Subscriptions by Plan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={planData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={110}
                                            label
                                        >
                                            {planData.map((_, index) => (
                                                <Cell
                                                    key={index}
                                                    fill={
                                                        COLORS[
                                                        index %
                                                        COLORS.length
                                                        ]
                                                    }
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* REVENUE */}
                    <Card className="shadow-sm lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Monthly Revenue</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stats.monthly_revenue}>
                                        <XAxis
                                            dataKey="month"
                                            tickFormatter={(value) =>
                                                new Date(value).toLocaleString(
                                                    'default',
                                                    { month: 'short' },
                                                )
                                            }
                                        />
                                        <YAxis
                                            tickFormatter={(value) =>
                                                `$${value.toLocaleString()}`
                                            }
                                        />
                                        <Tooltip
                                            // টুলটিপের উপরে মাসের পুরো নাম দেখানোর জন্য
                                            labelFormatter={(value) => {
                                                return new Date(
                                                    value,
                                                ).toLocaleString('default', {
                                                    month: 'long',
                                                    year: 'numeric',
                                                });
                                            }}
                                            formatter={(value: number) => [
                                                formatMoney(value),
                                                'Revenue',
                                            ]}
                                        />
                                        <Bar
                                            dataKey="monthly_revenue"
                                            fill="#FBC028"
                                            radius={[6, 6, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
