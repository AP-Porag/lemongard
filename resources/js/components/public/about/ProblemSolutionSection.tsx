import { motion } from 'framer-motion';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { LemonSimple, LemonSlice } from '@/components/LemonIcon';

const problems = [
    {
        title: 'Disorganized Information',
        desc: 'Important service and transaction information can be spread across different systems, making it difficult to organize and access when needed.',
    },
    {
        title: 'Wasted Time',
        desc: 'Managing records and reviewing relevant transaction information can take valuable time away from running your business.',
    },
    {
        title: 'Managing records and reviewing relevant transaction information can take valuable time away from running your business.',
        desc: "Managing Your Information",
    },
    {
        title: 'Expensive, Overbuilt Solutions',
        desc: "Many tools are packed with unnecessary features and come at a cost that doesn’t fit most service businesses.",
    },
    {
        title: 'Complex and Costly Solutions',
        desc: 'Many business tools include features that service professionals may not need, often adding unnecessary complexity and expense.',
    },
    {
        title: 'Finding Information Quickly',
        desc: 'Information should be easy to locate and understand. A simple, organized system can make everyday business tasks more efficient.',
    },
];

const solutions = [
    {
        title: 'Shared Database',
        desc: 'Access industry-wide data while contributing your own insights.',
    },
    {
        title: 'Clear Ownership Controls',
        desc: "View all data, while maintaining full control over what you contribute.",
    },
    {
        title: 'Lightning-Fast Search',
        desc: 'Advanced search across all fields delivers results in milliseconds.',
    },
    {
        title: 'Simple, Affordable Pricing',
        desc: '$12.99 per month for full access—no hidden fees.',
    },
    {
        title: 'Built for Professionals',
        desc: 'Enterprise-level capabilities at a price designed for small businesses',
    },
];

const ProblemSolutionSection = () => (
    <section className="section-container py-20 lg:py-32">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            {/* Problems */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="mb-4 flex items-center gap-2">
                    <LemonSimple className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm font-semibold tracking-wide text-yellow-600 uppercase">
                        The Challenge
                    </span>
                </div>

                <h2 className="text-black mb-8 text-3xl font-bold md:text-4xl">
                    The Challenges Service Professionals Face Every Day
                </h2>

                <div className="space-y-6">
                    {problems.map((p) => (
                        <div key={p.title} className="flex items-start gap-3">
                            <X className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                            <div>
                                <h3 className="text-black  font-bold">
                                    {p.title}
                                </h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    {p.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Solution */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="from-navy-600 to-navy-800 relative overflow-hidden rounded-2xl bg-gradient-to-br p-8 text-white md:p-10"
            >
                <LemonSlice
                    className="absolute top-0 right-0 h-32 w-32 text-white"
                    opacity={0.05}
                />
                <LemonSlice
                    className="absolute bottom-0 left-0 h-24 w-24 text-white"
                    opacity={0.05}
                />

                <h3 className="mb-6 text-2xl font-bold">
                    LemonGard’s Solution
                </h3>

                <div className="space-y-5">
                    {solutions.map((s) => (
                        <div key={s.title} className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400" />
                            <div>
                                <h4 className="font-semibold">{s.title}</h4>
                                <p className="mt-1 text-sm text-gray-300">
                                    {s.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <Link
                    href="/register"
                    className="btn-primary mt-8 inline-flex items-center gap-2"
                >
                    Start Your Free Trial
                    <ArrowRight className="h-5 w-5" />
                </Link>

                <p className="mt-3 text-sm text-gray-400">
                    30 days free • No credit card required
                </p>
            </motion.div>
        </div>
    </section>
);

export default ProblemSolutionSection;
