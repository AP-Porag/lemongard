import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import LemonIcon from "./LemonIcon";

const pricingFeatures = [
  "Full platform access from day one",
  "Search across all shared records",
  "Secure data ownership and privacy",
  "Priority support included",
  "No long-term contracts",
];

const planFeatures = [
  "Unlimited record access",
  "Full CRM features",
  "Advanced search & filters",
  "Data export tools",
  "API access",
];

/**
 * Pricing Section
 * Two-column layout with features list and pricing card
 */
const PricingSection = () => {
  return (
    <section id="pricing" className="section-container section-padding">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
            <LemonIcon className="w-4 h-4 text-yellow-500" />
            <span>Best Pricing</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-bold text-navy-600 mt-6">
            Professional Tools,{" "}
            <span className="text-yellow-500">Predictable Pricing</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-500 mt-6">
            Everything you need to manage your clients and grow your business,
            with transparent pricing and no surprises.
          </p>

          {/* Features List */}
          <div className="space-y-4 mt-8">
            {pricingFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="relative">
                  <Check className="w-5 h-5 text-yellow-500" />
                  <LemonIcon className="absolute -top-1 -right-1 w-2 h-2 text-yellow-400" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#plans"
            className="btn-primary mt-8"
          >
            View Pricing Plans
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Right Column - Pricing Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-white border-2 border-gray-200 rounded-2xl shadow-xl p-8 hover:border-yellow-400 transition-all duration-300"
        >
          {/* Decorative Lemon */}
          <LemonIcon className="absolute top-4 right-4 w-16 h-16 text-yellow-400 opacity-20" />

          {/* Plan Badge */}
          <span className="bg-navy-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Professional Plan
          </span>

          {/* Price */}
          <div className="mt-6">
            <span className="text-5xl font-bold text-navy-600">$49</span>
            <span className="text-xl text-gray-500">/month</span>
          </div>

          {/* Savings */}
          <p className="text-sm text-yellow-600 font-medium mt-2">
            or $490/year (Save 16%)
          </p>

          {/* Features List */}
          <div className="space-y-4 mt-8">
            {planFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#trial"
            className="w-full btn-primary justify-center mt-8"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </a>

          {/* Small Text */}
          <p className="text-xs text-gray-500 text-center mt-4">
            30 days free • No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
