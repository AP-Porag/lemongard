import PublicLayout from '@/layouts/PublicLayout';

import AboutHero from '@/components/public/about/AboutHero';
import MissionSection from '@/components/public/about/MissionSection';
import OurStorySection from '@/components/public/about/OurStorySection';
import CoreValuesSection from '@/components/public/about/CoreValuesSection';
import ProblemSolutionSection from '@/components/public/about/ProblemSolutionSection';
import TeamSection from '@/components/public/about/TeamSection';
import WhyChooseUsSection from '@/components/public/about/WhyChooseUsSection';
import TimelineSection from '@/components/public/about/TimelineSection';
import TestimonialsSection from '@/components/public/about/TestimonialsSection';
import TrustBadgesSection from '@/components/public/about/TrustBadgesSection';
import AboutCTA from '@/components/public/about/AboutCTA';

/**
 * About Us Page
 * Builds trust and tells the LemonGard company story
 */

export default function About() {
    return (
        <PublicLayout>
            <AboutHero />
            <MissionSection />
            <OurStorySection />
            <CoreValuesSection />
            <ProblemSolutionSection />
            <TeamSection />
            <WhyChooseUsSection />
            <TimelineSection />
            <TestimonialsSection />
            <TrustBadgesSection />
            <AboutCTA />
        </PublicLayout>
    );
}
