import Navigation from '@/components/public/Navigation';
import HeroSection from '@/components/public/HeroSection';
import TrustIndicators from '@/components/public/TrustIndicators';
import FeaturesSection from '@/components/public/FeaturesSection';
import HowItWorksSection from '@/components/public/HowItWorksSection';
import PricingSection from '@/components/public/PricingSection';
import FinalCTA from '@/components/public/FinalCTA';
import Footer from '@/components/public/Footer';

/**
 * LemonGard Landing Page
 * Professional B2B SaaS single-page application
 *
 * Sections:
 * 1. Navigation - Fixed header with blur on scroll
 * 2. Hero - Main value proposition with dashboard mockup
 * 3. Trust Indicators - Social proof stats
 * 4. Features - Three core features with lemon patterns
 * 5. How It Works - Three-step onboarding process
 * 6. Pricing - Pricing preview with feature list
 * 7. Final CTA - Conversion-focused call to action
 * 8. Footer - Site navigation and contact info
 */
const Index = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Fixed Navigation */}
            <Navigation />

            {/* Main Content */}
            <main>
                <HeroSection />
                <TrustIndicators />
                <FeaturesSection />
                <HowItWorksSection />
                <PricingSection />
                <FinalCTA />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Index;
