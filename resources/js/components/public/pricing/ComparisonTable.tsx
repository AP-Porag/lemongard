import { CheckCircle2, XCircle, Eye, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { LemonSimple } from '../LemonIcon';

interface Row {
    feature: string;
    view: boolean;
    full: boolean;
}

const sections: { title: string; rows: Row[] }[] = [
    {
        title: 'Database Access',
        rows: [
            { feature: 'Access Shared Database', view: true, full: true },
            { feature: 'Search All Fields', view: true, full: true },
            { feature: 'Advanced Filtering', view: true, full: true },
            { feature: 'View All Records', view: true, full: true },
            { feature: 'Export Data', view: true, full: true },
        ],
    },
    {
        title: 'Data Management',
        rows: [
            { feature: 'Add New Records', view: false, full: true },
            { feature: 'Edit Own Records', view: false, full: true },
            { feature: 'Delete Own Records', view: false, full: true },
            { feature: 'Data Ownership Control', view: false, full: true },
        ],
    },
    {
        title: 'Features & Support',
        rows: [
            { feature: 'Mobile Access', view: true, full: true },
            { feature: 'Email Support', view: true, full: true },
            { feature: 'Priority Support', view: false, full: true },
            { feature: 'Early Access to Features', view: false, full: true },
        ],
    },
    {
        title: 'Trial & Billing',
        rows: [
            { feature: '30-Day Free Trial', view: true, full: true },
            { feature: 'Monthly Billing', view: true, full: true },
            { feature: 'Cancel Anytime', view: true, full: true },
        ],
    },
];

const Check = () => <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />;
const Cross = () => <XCircle className="mx-auto h-5 w-5 text-gray-400" />;

const ComparisonTable = () => (
    <section className="section-container py-16 lg:py-24">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
        >
            <span className="mb-4 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-yellow-600 uppercase">
                <LemonSimple className="h-5 w-5 text-yellow-500" /> Detailed
                Comparison
            </span>
            <h2 className="text-navy-600 mb-4 text-3xl font-bold md:text-4xl">
                See What's Included
            </h2>
            <p className="text-lg text-muted-foreground">
                Compare plans side by side
            </p>
        </motion.div>

        {/* Desktop table */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto hidden max-w-4xl md:block"
        >
            <div className="overflow-hidden rounded-2xl border border-border">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-card">
                            <th className="text-navy-600 w-1/2 p-4 text-left font-semibold">
                                Features
                            </th>
                            <th className="w-1/4 p-4 text-center">
                                <span className="text-navy-600 flex items-center justify-center gap-2 font-semibold">
                                    <Eye className="h-5 w-5" /> View Only
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    $14.99/mo
                                </span>
                            </th>
                            <th className="w-1/4 bg-yellow-50 p-4 text-center">
                                <span className="text-navy-600 flex items-center justify-center gap-2 font-semibold">
                                    <Zap className="h-5 w-5 text-yellow-500" />{' '}
                                    Full Access
                                </span>
                                <span className="text-xs font-medium text-yellow-600">
                                    $19.99/mo
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sections.map((s) => (
                            <>
                                <tr key={s.title}>
                                    <td
                                        colSpan={3}
                                        className="text-navy-600 bg-secondary/50 px-4 py-2 text-xs font-semibold tracking-wide uppercase"
                                    >
                                        {s.title}
                                    </td>
                                </tr>
                                {s.rows.map((r, i) => (
                                    <tr
                                        key={r.feature}
                                        className={
                                            i % 2 === 0
                                                ? 'bg-card'
                                                : 'bg-secondary/30'
                                        }
                                    >
                                        <td className="p-4 text-muted-foreground">
                                            {r.feature}
                                        </td>
                                        <td className="p-4">
                                            {r.view ? <Check /> : <Cross />}
                                        </td>
                                        <td className="bg-yellow-50/50 p-4">
                                            {r.full ? <Check /> : <Cross />}
                                        </td>
                                    </tr>
                                ))}
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>

        {/* Mobile cards */}
        <div className="mx-auto max-w-sm space-y-6 md:hidden">
            {sections.map((s) => (
                <div
                    key={s.title}
                    className="rounded-xl border border-border bg-card p-4"
                >
                    <h3 className="text-navy-600 mb-3 text-sm font-semibold tracking-wide uppercase">
                        {s.title}
                    </h3>
                    <ul className="space-y-3">
                        {s.rows.map((r) => (
                            <li
                                key={r.feature}
                                className="flex items-center justify-between text-sm"
                            >
                                <span className="text-muted-foreground">
                                    {r.feature}
                                </span>
                                <span className="ml-2 flex shrink-0 gap-3">
                                    {r.view ? (
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <XCircle className="h-4 w-4 text-gray-400" />
                                    )}
                                    {r.full ? (
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <XCircle className="h-4 w-4 text-gray-400" />
                                    )}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </section>
);

export default ComparisonTable;
