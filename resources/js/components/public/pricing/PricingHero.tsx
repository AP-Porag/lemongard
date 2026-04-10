import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { LemonSimple, LemonSlice } from '../LemonIcon';
import Banner from "@/components/BannerSec";

const PricingHero = () => (
    <section className="section-container relative overflow-hidden py-16 lg:py-24">
       {/* Botanical Lemon Background */}
         <Banner/>
         
        {/* Breadcrumb */}
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex items-center gap-2 text-sm text-muted-foreground"
        >
            <Link href="/" className="transition-colors hover:text-yellow-500">
                Home
            </Link>

            <ChevronRight className="h-4 w-4" />

            <span className="text-navy-600 font-medium">Pricing</span>
        </motion.nav>

        {/* Header */}
        <div className="text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-800">
                    <LemonSimple className="h-4 w-4 text-yellow-500" />
                    Simple Pricing
                </span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-navy-600 mb-6 text-4xl font-bold md:text-5xl lg:text-6xl"
            >
                Choose Your Perfect Plan
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
                Start with a 30-day free trial. No credit card required. Choose
                the plan that fits your needs.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
            >
                {[
                    '30-Day Free Trial',
                    'No Credit Card Required',
                    'Cancel Anytime',
                ].map((t) => (
                    <span key={t} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-yellow-500" />
                        {t}
                    </span>
                ))}
            </motion.div>
        </div>
    </section>
);

export default PricingHero;
