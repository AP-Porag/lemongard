import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import LemonIcon from './LemonIcon';

const pricingFeatures = [
    'Full platform access from day one',
    'Search across all shared records',
    'Secure data ownership and privacy',
    'Priority support included',
    'No long-term contracts',
];

const planFeatures = [
    'Unlimited record access',
    'Full CRM features',
    'Advanced search & filters',
    'Data export tools',
    'API access',
];

/**
 * Pricing Section
 * Two-column layout with features list and pricing card
 */
const PricingSection = () => {
    return (
        <section id="pricing" className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    {/* Left Column - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-800">
                            <LemonIcon className="h-4 w-4 text-yellow-500" />
                            <span>Best Pricing</span>
                        </div>

                        {/* Headline */}
                        <h2 className="text-navy-600 mt-6 text-3xl font-bold md:text-4xl">
                            Professional Tools,{' '}
                            <span className="text-yellow-500">
                                Predictable Pricing
                            </span>
                        </h2>

                        {/* Description */}
                        <p className="mt-6 text-lg text-gray-500">
                            Everything you need to manage your clients and grow
                            your business, with transparent pricing and no
                            surprises.
                        </p>

                        {/* Features List */}
                        <div className="mt-8 space-y-4">
                            {pricingFeatures.map((feature) => (
                                <div
                                    key={feature}
                                    className="flex items-center gap-3"
                                >
                                    <div className="relative">
                                        <Check className="h-5 w-5 text-yellow-500" />
                                        <LemonIcon className="absolute -top-1 -right-1 h-2 w-2 text-yellow-400" />
                                    </div>
                                    <span className="text-gray-700">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <a href="#plans" className="btn-primary mt-8">
                            View Pricing Plans
                            <ArrowRight className="h-5 w-5" />
                        </a>
                    </motion.div>

                    {/* Right Column - Pricing Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-xl transition-all duration-300 hover:border-yellow-400"
                    >
                        {/* Decorative Lemon */}
                        <LemonIcon className="absolute top-4 right-4 h-16 w-16 text-yellow-400 opacity-20" />

                        {/* Plan Badge */}
                        <span className="bg-navy-600 rounded-lg px-4 py-2 text-sm font-medium text-white">
                            Professional Plan
                        </span>

                        {/* Price */}
                        <div className="mt-6">
                            <span className="text-navy-600 text-5xl font-bold">
                                $49
                            </span>
                            <span className="text-xl text-gray-500">
                                /month
                            </span>
                        </div>

                        {/* Savings */}
                        <p className="mt-2 text-sm font-medium text-yellow-600">
                            or $490/year (Save 16%)
                        </p>

                        {/* Features List */}
                        <div className="mt-8 space-y-4">
                            {planFeatures.map((feature) => (
                                <div
                                    key={feature}
                                    className="flex items-center gap-3"
                                >
                                    <Check className="h-5 w-5 text-yellow-500" />
                                    <span className="text-gray-700">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <a
                            href="#trial"
                            className="btn-primary mt-8 w-full justify-center"
                        >
                            Start Free Trial
                            <ArrowRight className="h-5 w-5" />
                        </a>

                        {/* Small Text */}
                        <p className="mt-4 text-center text-xs text-gray-500">
                            30 days free • No credit card required
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
