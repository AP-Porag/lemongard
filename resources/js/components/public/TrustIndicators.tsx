import { Users, Database, Shield, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import LemonIcon from './LemonIcon';

const stats = [
    {
        icon: Users,
        value: '500+',
        label: 'Active Users',
        hasLemon: true,
    },
    {
        icon: Database,
        value: '50K+',
        label: 'Records Managed',
        hasLemon: false,
    },
    {
        icon: Shield,
        value: '99.9%',
        label: 'Uptime Guarantee',
        hasLemon: true,
    },
    {
        icon: TrendingUp,
        value: '3x',
        label: 'Productivity Boost',
        hasLemon: true,
    },
];

/**
 * Trust Indicators Section
 * Social proof stats with icons and lemon decorations
 */
const TrustIndicators = () => {
    return (
        <section className="section-bg border-t border-gray-100 bg-gray-50 py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <p className="mb-8 bg-gray-50 text-center text-sm">
                    Trusted by service professionals across multiple industries
                </p>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-2 gap-8 md:grid-cols-4"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="relative inline-flex">
                                <div className="rounded-full bg-yellow-100 p-3">
                                    <stat.icon className="h-6 w-6 text-yellow-600" />
                                </div>
                                {stat.hasLemon && (
                                    <LemonIcon className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400" />
                                )}
                            </div>
                            <div className="text-navy-600 mt-4 text-4xl font-bold">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-500">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TrustIndicators;
