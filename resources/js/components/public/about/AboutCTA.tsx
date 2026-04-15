import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { LemonSlice, LemonSimple } from '@/components/public/LemonIcon';

const AboutCTA = () => (
    <section className="pt-20 lg:pt-32">
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="from-navy-600 via-navy-700 to-navy-800 relative overflow-hidden bg-gradient-to-br p-12 text-center lg:p-16"
        >
            {/* Decorative Lemons */}
            <LemonSlice
                                       className="absolute top-0 left-0 h-32 w-32 -translate-x-1/4 -translate-y-1/4"
                                       opacity={0.12}
                                   />
                                   <LemonSlice
                                       className="absolute right-0 bottom-0 h-40 w-40 translate-x-1/4 translate-y-1/4"
                                       opacity={0.12}
                                   />
                                   <LemonSlice
                                       className="absolute top-1/2 left-1/4 h-24 w-24"
                                       opacity={0.06}
                                   />
                                   <LemonSlice
                                       className="absolute right-1/3 bottom-1/4 h-20 w-20"
                                       opacity={0.05}
                                   />
            <div className="section-container">
            <div className="relative z-10">
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                    Ready to Join the LemonGard Community?
                </h2>

                <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-300 md:text-xl">
                    Start your free 30-day trial and experience the difference
                </p>

                <Link
                    href="/#trial"
                    className="btn-primary inline-flex items-center gap-2 !px-10 !py-5 text-lg !shadow-2xl"
                >
                    Start Your Free Trial Today
                    <ArrowRight className="h-5 w-5" />
                </Link>

                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
                    <span>30 days free</span>

                    <LemonSimple
                        className="h-3 w-3 text-yellow-400"
                        opacity={0.5}
                    />

                    <span>No credit card required</span>

                    <LemonSimple
                        className="h-3 w-3 text-yellow-400"
                        opacity={0.5}
                    />

                    <span>Cancel anytime</span>
                </div>
            </div>
        </div>
        </motion.div>
    </section>
);

export default AboutCTA;
