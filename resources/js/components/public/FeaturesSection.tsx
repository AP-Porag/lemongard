import { Database, Lock, CreditCard, Shield, Zap, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { LemonSimple, LemonSlice } from './LemonIcon';

const features = [
    {
        icon: Database,
        title: 'Shared Data Access',
        description:
            'Search and view all records across the platform. Access the collective knowledge of your industry in real-time.',
        badge: { icon: Shield, text: 'Enterprise Security' },
    },
    {
        icon: Lock,
        title: 'Your Data, Your Control',
        description:
            'Edit and manage only the records you create. Your contributions remain yours while benefiting from shared visibility.',
        badge: { icon: Zap, text: 'Lightning Fast' },
    },
    {
        icon: CreditCard,
        title: 'Subscription Simplicity',
        description:
            'Transparent monthly billing with instant access. Start with 30 days free, cancel anytime with no penalties.',
        badge: { icon: Tag, text: 'Flexible Pricing' },
    },
];

/**
 * Features Section
 * Three feature cards with lemon slice pattern backgrounds
 */
const FeaturesSection = () => {
    return (
        <section id="features" className="section-container section-padding">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <div className="flex items-center justify-center gap-2">
                    <LemonSimple className="h-8 w-8 text-yellow-500" />
                    <h2 className="text-navy-600 text-3xl font-bold md:text-4xl lg:text-5xl">
                        Everything You Need to Succeed
                    </h2>
                </div>
                <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-500 md:text-xl">
                    Built for service professionals who demand reliability,
                    security, and performance
                </p>
            </motion.div>

            {/* Features Grid */}
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
                        className="feature-card group"
                    >
                        {/* Background Lemon Slice Pattern */}
                        <div className="pointer-events-none absolute inset-0 overflow-hidden">
                            <LemonSlice
                                className="absolute top-4 right-4 h-20 w-20"
                                opacity={0.06}
                            />
                            <LemonSlice
                                className="absolute bottom-8 left-6 h-16 w-16"
                                opacity={0.04}
                            />
                            <LemonSlice
                                className="absolute top-1/2 right-1/4 h-24 w-24"
                                opacity={0.03}
                            />
                        </div>

                        {/* Icon */}
                        <div className="relative flex h-15 w-15 items-center justify-center rounded-full bg-yellow-100">
                            <feature.icon className="h-8 w-8 text-yellow-600" />
                        </div>

                        {/* Content */}
                        <h3 className="text-navy-600 relative mt-6 text-2xl font-semibold">
                            {feature.title}
                        </h3>
                        <p className="relative mt-4 leading-relaxed text-gray-500">
                            {feature.description}
                        </p>

                        {/* Bottom Badge */}
                        <div className="text-navy-600 relative mt-6 flex items-center gap-2 text-sm font-medium">
                            <feature.badge.icon className="h-4 w-4" />
                            <LemonSimple className="h-3 w-3 text-yellow-500" />
                            <span>{feature.badge.text}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default FeaturesSection;
