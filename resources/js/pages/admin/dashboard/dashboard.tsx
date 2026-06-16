// import AppLayout from '@/layouts/app-layout';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { usePage } from '@inertiajs/react';

// import {
//     PieChart,
//     Pie,
//     BarChart,
//     Cell,
//     Bar,
//     XAxis,
//     YAxis,
//     Tooltip,
//     ResponsiveContainer,
// } from 'recharts';

// interface Stats {
//     total_subscriber: number;
//     trialing: number;
//     active: number;
//     canceled: number;
//     past_due: number;
//     trial_expired: number;
//     total_revenue: number;
//     plan_distribution: number;

//     monthly_subscriptions: {
//         month: string;
//         total: number;
//     }[];
//     monthly_revenue: {
//         month: string;
//         total_revenue: number;
//     }[];
// }

// export default function Dashboard() {
//     const { stats } = usePage<{ stats: Stats }>().props;

//     const COLORS = ['#FBC028', '#12317C', '#facc15', '#ef4444', '#a855f7'];

//     const data = stats.plan_distribution.map((item: any) => ({
//         name: item.name
//             .replace(/_/g, ' ')
//             .toLowerCase()
//             .replace(/\b\w/g, (c) => c.toUpperCase()),
//         value: item.total,
//     }));
//     const dataWithColors = data.map((item: any, index: number) => ({
//         ...item,
//         fill: COLORS[index % COLORS.length],
//     }));

//     console.log(stats.monthly_revenue);

//     return (
//         <AppLayout>
//             <div className="space-y-6 p-6">
//                 {/* TOP STATS */}
//                 <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
//                     <Card className="bg-blue-900 text-white">
//                         <CardHeader>
//                             <CardTitle>Total Revenue</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             {new Intl.NumberFormat('en-US', {
//                                 style: 'currency',
//                                 currency: 'USD',
//                             }).format(stats.total_revenue)}
//                         </CardContent>
//                     </Card>
//                     <Card className="bg-blue-900 text-white">
//                         <CardHeader>
//                             <CardTitle>Total Subscriber</CardTitle>
//                         </CardHeader>
//                         <CardContent>{stats.total_subscriber}</CardContent>
//                     </Card>

//                     <Card className="bg-blue-900 text-white">
//                         <CardHeader>
//                             <CardTitle>Trialing</CardTitle>
//                         </CardHeader>
//                         <CardContent>{stats.trialing}</CardContent>
//                     </Card>

//                     <Card className="bg-blue-900 text-white">
//                         <CardHeader>
//                             <CardTitle>Active</CardTitle>
//                         </CardHeader>
//                         <CardContent>{stats.active}</CardContent>
//                     </Card>

//                     <Card className="bg-blue-900 text-white">
//                         <CardHeader>
//                             <CardTitle>Trial Expired</CardTitle>
//                         </CardHeader>
//                         <CardContent>{stats.trial_expired}</CardContent>
//                     </Card>
//                     <Card className="bg-blue-900 text-white">
//                         <CardHeader>
//                             <CardTitle>Canceled</CardTitle>
//                         </CardHeader>
//                         <CardContent>{stats.canceled}</CardContent>
//                     </Card>

//                     <Card className="bg-blue-900 text-white">
//                         <CardHeader>
//                             <CardTitle>Past Due</CardTitle>
//                         </CardHeader>
//                         <CardContent>{stats.past_due}</CardContent>
//                     </Card>
//                 </div>

//                 {/* SUBSCRIPTION CHART */}
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Monthly Subscriptions</CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                         <div className="h-80">
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <BarChart data={stats.monthly_subscriptions}>
//                                     <XAxis
//                                         dataKey="month"
//                                         tickFormatter={(value) => {
//                                             // মাসের নাম Jan, Feb স্টাইলে করার জন্য
//                                             const date = new Date(value);
//                                             return date.toLocaleString(
//                                                 'default',
//                                                 { month: 'short' },
//                                             );
//                                         }}
//                                         fontSize={12}
//                                         tickLine={false}
//                                         axisLine={false}
//                                     />
//                                     <YAxis
//                                         fontSize={12}
//                                         tickLine={false}
//                                         axisLine={false}
//                                         // যদি সংখ্যাগুলো বড় হয় তবে কমা দেওয়ার জন্য
//                                         tickFormatter={(value) =>
//                                             value.toLocaleString()
//                                         }
//                                     />
//                                     <Tooltip
//                                         cursor={{ fill: '#f3f4f6' }} // হোভার করলে হালকা ব্যাকগ্রাউন্ড
//                                         formatter={(value) => [
//                                             value.toLocaleString(),
//                                             'Total Subscriptions',
//                                         ]}
//                                         labelFormatter={(label) => {
//                                             const date = new Date(label);
//                                             return date.toLocaleString(
//                                                 'default',
//                                                 {
//                                                     month: 'long',
//                                                     year: 'numeric',
//                                                 },
//                                             );
//                                         }}
//                                     />
//                                     <Bar
//                                         dataKey="total"
//                                         fill="#12327E"
//                                         radius={[4, 4, 0, 0]} // বারের উপরের কোণা রাউন্ড করার জন্য
//                                     />
//                                 </BarChart>
//                             </ResponsiveContainer>
//                         </div>
//                     </CardContent>
//                 </Card>
//                 {/* TIER CHART */}
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Subscriptions by Plan</CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                         <div className="flex h-80 items-center justify-center">
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <PieChart>
//                                     <Pie
//                                         data={dataWithColors}
//                                         dataKey="value"
//                                         nameKey="name"
//                                         cx="50%"
//                                         cy="50%"
//                                         outerRadius={120}
//                                         label
//                                     />

//                                     <Tooltip />
//                                 </PieChart>
//                             </ResponsiveContainer>
//                         </div>
//                     </CardContent>
//                 </Card>
//                 {/* MONTHLY REVENUE CHART */}
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Monthly Revenue</CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                         <div className="h-80">
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <BarChart data={stats.monthly_revenue}>
//                                     <XAxis
//                                         dataKey="month"
//                                         tickFormatter={(value) => {
//                                             // মাসের নাম Jan, Feb স্টাইলে করার জন্য
//                                             const date = new Date(value);
//                                             return date.toLocaleString(
//                                                 'default',
//                                                 { month: 'short' },
//                                             );
//                                         }}
//                                     />
//                                     <YAxis
//                                         // Dollar format (যেমন: $1,200) করার জন্য
//                                         tickFormatter={(value) =>
//                                             `$${value.toLocaleString()}`
//                                         }
//                                     />
//                                     <Tooltip
//                                         // Tooltip-এর ভেতরের টেক্সট "Monthly Revenue" করার জন্য
//                                         formatter={(value, name) => [
//                                             `$${value.toLocaleString()}`,
//                                             name
//                                                 .replace(/_/g, ' ')
//                                                 .replace(/\b\w/g, (l) =>
//                                                     l.toUpperCase(),
//                                                 ),
//                                         ]}
//                                         // Tooltip-এর হেডার/ডেট ফরম্যাট করার জন্য
//                                         labelFormatter={(label) => {
//                                             const date = new Date(label);
//                                             return date.toLocaleString(
//                                                 'default',
//                                                 {
//                                                     month: 'long',
//                                                     year: 'numeric',
//                                                 },
//                                             );
//                                         }}
//                                     />
//                                     <Bar
//                                         dataKey="monthly_revenue"
//                                         name="monthly_revenue" // এখানে নাম দিলে formatter সেটাকে Title Case করবে
//                                         fill="#12327E"
//                                         radius={[4, 4, 0, 0]}
//                                     />
//                                 </BarChart>
//                             </ResponsiveContainer>
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>
//         </AppLayout>
//     );
// }

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
