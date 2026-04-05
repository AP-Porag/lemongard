import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { LemonSimple, LemonSlice } from '@/components/public/LemonIcon';

const AboutHero = () => (
    <section className="section-container relative overflow-hidden py-16 lg:py-24">
        {/* Decorative watermarks */}
        <LemonSlice
            className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64"
            opacity={0.05}
        />
        <LemonSlice
            className="absolute bottom-0 left-0 h-48 w-48"
            opacity={0.05}
        />

        {/* Breadcrumb */}
        <nav
            className="mb-8 flex items-center gap-2 text-sm text-gray-500"
            aria-label="Breadcrumb"
        >
            <Link href="/" className="transition-colors hover:text-yellow-500">
                Home
            </Link>

            <ChevronRight className="h-4 w-4" />

            <span className="text-navy-600 font-medium">About Us</span>
        </nav>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
        >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-800">
                <LemonSimple className="h-4 w-4 text-yellow-500" />
                Our Story
            </div>

            <h1 className="text-navy-600 text-4xl font-bold md:text-5xl lg:text-6xl">
                Building Better Tools for{' '}
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                    Service Industry Professionals
                </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl">
                LemonGard was created to solve a real problem: giving service
                professionals easy access to shared industry data while
                maintaining control over their own contributions.
            </p>
        </motion.div>
    </section>
);

export default AboutHero;
