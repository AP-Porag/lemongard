import { UserPlus, Database, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { LemonWhole, LemonSimple } from './LemonIcon';

const steps = [
    {
        number: '1',
        icon: UserPlus,
        title: 'Sign Up Free',
        description:
            'Start your 30-day trial, no credit card needed. Create your account in seconds.',
    },
    {
        number: '2',
        icon: Database,
        title: 'Add Your Data',
        description:
            'Contribute your records and explore the shared database. See the power of collective data.',
    },
    {
        number: '3',
        icon: TrendingUp,
        title: 'Subscribe & Grow',
        description:
            'Continue with monthly access after your trial ends. Scale your business with confidence.',
    },
];

/**
 * How It Works Section
 * Three-step process with connecting line
 */
const HowItWorksSection = () => {
    return (
        <section id="how-it-works" className="section-padding">
            <div className="relative overflow-hidden bg-gradient-to-br from-[hsl(224_76%_33%)] via-[hsl(224_76%_25%)] to-[hsl(225,90%,8%)] p-8 lg:p-16">
                {/* Decorative Whole Lemon */}
                <LemonWhole
                    className="absolute top-8 right-8 h-24 w-24"
                    opacity={0.15}
                />
                <LemonWhole
                    className="absolute bottom-8 left-8 h-16 w-16"
                    opacity={0.1}
                />

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 text-center"
                >
                    <h2 className="text-3xl font-bold text-white md:text-4xl">
                        Get Started in Minutes
                    </h2>
                    <p className="sub-text mt-4 text-lg text-gray-400">
                        Three simple steps to transform your workflow
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <div className="relative mt-16">
                    {/* Connection Line (hidden on mobile) */}
                    <div
                        className="absolute top-8 right-1/6 left-1/6 hidden h-1 rounded-full bg-yellow-400 md:block"
                        style={{
                            left: 'calc(16.666% + 2rem)',
                            right: 'calc(16.666% + 2rem)',
                        }}
                    />

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.15,
                                }}
                                className="relative z-10 text-center"
                            >
                                {/* Number Circle */}
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-lg">
                                    <span className="text-navy-900 text-3xl font-bold">
                                        {step.number}
                                    </span>
                                </div>

                                {/* Icon with Lemon */}
                                <div className="mt-6 flex items-center justify-center gap-2">
                                    <step.icon className="h-10 w-10 text-yellow-500" />
                                    <LemonSimple className="h-5 w-5 text-yellow-400" />
                                </div>

                                {/* Content */}
                                <h3 className="mt-4 text-2xl font-semibold text-white">
                                    {step.title}
                                </h3>
                                <p className="mt-4 leading-relaxed text-gray-400">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
