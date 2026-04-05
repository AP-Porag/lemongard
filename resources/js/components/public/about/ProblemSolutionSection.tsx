import { motion } from 'framer-motion';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { LemonSimple, LemonSlice } from '@/components/LemonIcon';

const problems = [
    {
        title: 'Isolated Information',
        desc: 'Critical data locked in individual systems with no way to share or access collective knowledge',
    },
    {
        title: 'Wasted Time',
        desc: 'Repeatedly researching the same clients, services, and pricing information',
    },
    {
        title: 'No Ownership Control',
        desc: "Existing platforms don't respect data ownership—you can't control what you contributed",
    },
    {
        title: 'Expensive Solutions',
        desc: "Enterprise CRM tools with features you don't need and prices you can't afford",
    },
    {
        title: 'Poor Search',
        desc: 'Outdated interfaces that make finding information frustratingly slow',
    },
];

const solutions = [
    {
        title: 'Shared Database',
        desc: 'Access industry-wide data while contributing your own insights',
    },
    {
        title: 'Smart Ownership',
        desc: "View everything, edit only what's yours",
    },
    {
        title: 'Lightning Fast',
        desc: 'Advanced search across all fields in milliseconds',
    },
    {
        title: 'Affordable',
        desc: '$49/month for complete access—no hidden fees',
    },
    {
        title: 'Professional',
        desc: 'Enterprise features at small business prices',
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

                <h2 className="text-navy-600 mb-8 text-3xl font-bold md:text-4xl">
                    The Problems Service Professionals Face Every Day
                </h2>

                <div className="space-y-6">
                    {problems.map((p) => (
                        <div key={p.title} className="flex items-start gap-3">
                            <X className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                            <div>
                                <h3 className="text-navy-600 font-semibold">
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
                    LemonGard's Solution
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
                    href="/#trial"
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
