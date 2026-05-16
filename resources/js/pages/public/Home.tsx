import PublicLayout from '@/layouts/PublicLayout';

import HeroSection from '@/components/public/HeroSection';
import TrustIndicators from '@/components/public/TrustIndicators';
import FeaturesSection from '@/components/public/FeaturesSection';
import HowItWorksSection from '@/components/public/HowItWorksSection';
import PricingSection from '@/components/public/PricingSection';
import FinalCTA from '@/components/public/FinalCTA';

export default function Home() {
    return (
        <PublicLayout>
            <div className="overflow-hidden">
            <HeroSection />
            <TrustIndicators />
            <FeaturesSection />
            <HowItWorksSection />
            <PricingSection />
            <FinalCTA />
            </div>
        </PublicLayout>
    );
}
