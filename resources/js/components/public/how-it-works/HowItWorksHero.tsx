import { ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { LemonSimple, LemonSlice } from '@/components/public/LemonIcon';
import Banner from "@/components/BannerSec";

/**
 * How It Works - Page Hero
 * Breadcrumb, title badge, headline, and decorative lemon watermarks
 */
const HowItWorksHero = () => {
    return (
        <section className="section-container relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
            {/* Botanical Lemon Background */}
              <Banner/>

            {/* Breadcrumb */}
            <motion.nav
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-8 flex items-center gap-2 text-sm text-muted-foreground"
                aria-label="Breadcrumb"
            >
                <Link
                    href="/"
                    className="transition-colors hover:text-yellow-500"
                >
                    Home
                </Link>

                <ChevronRight className="h-4 w-4" />

                <span className="text-navy-600 font-medium">How It Works</span>
            </motion.nav>

            {/* Page Header */}
            <div className="relative z-10 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <span className="inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-800">
                        <LemonSimple className="h-4 w-4 text-yellow-500" />
                        Simple Process
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-navy-600 mt-6 text-4xl font-bold md:text-5xl lg:text-6xl"
                >
                    How LemonGard Works
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl"
                >
                    From signup to subscription: Your journey to better CRM
                    management in three simple steps
                </motion.p>
            </div>
        </section>
    );
};

export default HowItWorksHero;
