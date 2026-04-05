import { UserPlus, Database, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { LemonWhole, LemonSimple } from "./LemonIcon";

const steps = [
  {
    number: "1",
    icon: UserPlus,
    title: "Sign Up Free",
    description:
      "Start your 30-day trial, no credit card needed. Create your account in seconds.",
  },
  {
    number: "2",
    icon: Database,
    title: "Add Your Data",
    description:
      "Contribute your records and explore the shared database. See the power of collective data.",
  },
  {
    number: "3",
    icon: TrendingUp,
    title: "Subscribe & Grow",
    description:
      "Continue with monthly access after your trial ends. Scale your business with confidence.",
  },
];

/**
 * How It Works Section
 * Three-step process with connecting line
 */
const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-container section-padding">
      <div className="bg-gray-50 rounded-2xl p-8 lg:p-16 relative overflow-hidden">
        {/* Decorative Whole Lemon */}
        <LemonWhole className="absolute top-8 right-8 w-24 h-24" opacity={0.15} />
        <LemonWhole className="absolute bottom-8 left-8 w-16 h-16" opacity={0.1} />

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy-600">
            Get Started in Minutes
          </h2>
          <p className="text-lg text-gray-500 mt-4">
            Three simple steps to transform your workflow
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="relative mt-16">
          {/* Connection Line (hidden on mobile) */}
          <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-1 bg-yellow-400 rounded-full" 
               style={{ left: 'calc(16.666% + 2rem)', right: 'calc(16.666% + 2rem)' }} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="text-center relative z-10"
              >
                {/* Number Circle */}
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-navy-900">
                    {step.number}
                  </span>
                </div>

                {/* Icon with Lemon */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  <step.icon className="w-10 h-10 text-yellow-500" />
                  <LemonSimple className="w-5 h-5 text-yellow-400" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold text-navy-600 mt-4">
                  {step.title}
                </h3>
                <p className="text-gray-500 mt-4 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
