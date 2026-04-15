import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { LemonSlice, LemonSimple } from './LemonIcon';

/**
 * Final CTA Section
 * Navy gradient background with lemon slice decorations
 */
const FinalCTA = () => {
    return (
        <section
            id="contact"
            className="section-padding section-padding-remove-bt"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden bg-gradient-to-br from-[hsl(224_76%_33%)] via-[hsl(224_76%_25%)] to-[hsl(225,90%,8%)] p-12 lg:p-16"
            >
                {/* Decorative Lemon Slices */}
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

                {/* Content */}
                <div className="relative z-10 text-center">
                        <h2 className="text-width-1 font-sans mx-auto text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                        Ready to Work In A Way That Supports Your Success, Not Stress?
                    </h2>
                    <p className="text-width-2 mx-auto mt-6 text-lg text-gray-300 md:text-xl">
                        Join service professionals who trust LemonGard to streamline their client experience. Start your journey today.
                    </p>

                    {/* CTA Button */}
                    <a
                        href="#trial"
                        className="text-navy-900 mt-10 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 px-10 py-5 text-lg font-bold shadow-2xl transition-all duration-300 hover:scale-105 hover:from-yellow-500 hover:to-yellow-600 hover:shadow-yellow-500/30"
                    >
                        Start Your Free Trial Today
                        <ArrowRight className="h-6 w-6" />
                    </a>

                    {/* Small Text with Lemon Separators */}
                    <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
                        <span>30 days free</span>
                        <LemonSimple
                            className="h-3 w-3 text-yellow-400"
                            opacity={0.5}
                        />
                        <span>Easy setup</span>
                        <LemonSimple
                            className="h-3 w-3 text-yellow-400"
                            opacity={0.5}
                        />
                        <span>Cancel anytime</span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default FinalCTA;
