import PublicLayout from '@/layouts/PublicLayout';

import PricingHero from '@/components/public/pricing/PricingHero';
import PricingCards from '@/components/public/pricing/PricingCards';
import ComparisonTable from '@/components/public/pricing/ComparisonTable';
import PricingFAQ from '@/components/public/pricing/PricingFAQ';
import PricingTrust from '@/components/public/pricing/PricingTrust';
import PricingTestimonial from '@/components/public/pricing/PricingTestimonial';
import PricingCTA from '@/components/public/pricing/PricingCTA';

export default function Pricing() {
    return (
        <PublicLayout>
            <div className="pt-16">
                <PricingHero />
                <PricingCards />
                <ComparisonTable />
                <PricingFAQ />
                <PricingTrust />
                <PricingTestimonial />
                <PricingCTA />
            </div>
        </PublicLayout>
    );
}
