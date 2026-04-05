import PublicLayout from '@/layouts/PublicLayout';

import HowItWorksHero from '@/components/public/how-it-works/HowItWorksHero';
import OverviewTimeline from '@/components/public/how-it-works/OverviewTimeline';
import DetailedWalkthrough from '@/components/public/how-it-works/DetailedWalkthrough';
import FeaturesDeepDive from '@/components/public/how-it-works/FeaturesDeepDive';
import FAQSection from '@/components/public/how-it-works/FAQSection';
import DemoSection from '@/components/public/how-it-works/DemoSection';
import TrustSecurity from '@/components/public/how-it-works/TrustSecurity';
import HowItWorksCTA from '@/components/public/how-it-works/HowItWorksCTA';

/**
 * How It Works Page
 * Comprehensive walkthrough of the LemonGard user journey
 */

export default function HowItWorks() {
    return (
        <PublicLayout>
            <HowItWorksHero />
            <OverviewTimeline />
            <DetailedWalkthrough />
            <FeaturesDeepDive />
            <FAQSection />
            <DemoSection />
            <TrustSecurity />
            <HowItWorksCTA />
        </PublicLayout>
    );
}
