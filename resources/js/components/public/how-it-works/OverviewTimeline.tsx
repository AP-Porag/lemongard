import { UserPlus, Database, TrendingUp, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { LemonSimple } from "@/components/LemonIcon";

const steps = [
  {
    number: "1",
    icon: UserPlus,
    title: "Sign Up & Start Free Trial",
    duration: "Day 1",
    description: "Create your account in under 2 minutes. No credit card required. Get instant access to the full platform.",
    points: [
      "Quick registration form",
      "Email verification",
      "30-day full access begins immediately",
      "No payment information needed",
    ],
  },
  {
    number: "2",
    icon: Database,
    title: "Explore & Contribute Data",
    duration: "Days 1-30",
    description: "Browse shared industry records, search across the platform, and add your own data to benefit the community.",
    points: [
      "Search all existing records",
      "View shared industry data",
      "Add your own client records",
      "Learn the platform features",
    ],
  },
  {
    number: "3",
    icon: TrendingUp,
    title: "Subscribe & Continue Growing",
    duration: "Day 30+",
    description: "After your trial, choose to continue with monthly or annual subscription. Keep your data and access.",
    points: [
      "Simple monthly billing",
      "All features included",
      "Your data stays yours",
      "Cancel anytime, no penalties",
    ],
  },
];

/**
 * Overview Timeline - Three-step journey with connecting lines
 */
const OverviewTimeline = () => {
  return (
    <section className="section-container section-padding">
      {/* Section intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-navy-600">
          Your Journey to Success
        </h2>
        <p className="text-lg text-muted-foreground mt-4">
          Three clear steps to transform how you manage your business data
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Desktop connection line */}
        <div
          className="hidden md:block absolute top-10 h-0.5 border-t-2 border-dashed border-yellow-400"
          style={{ left: "calc(16.666% + 2.5rem)", right: "calc(16.666% + 2.5rem)" }}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Mobile vertical line */}
              {index < steps.length - 1 && (
                <div className="md:hidden absolute left-10 top-20 bottom-0 w-0.5 border-l-2 border-dashed border-yellow-400" />
              )}

              {/* Card */}
              <div className="feature-card !rounded-2xl !p-6 md:!p-8 relative z-10">
                {/* Number circle */}
                <div className="mx-auto w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg">
                  <span className="text-2xl md:text-3xl font-bold text-navy-900">{step.number}</span>
                </div>

                {/* Duration badge */}
                <div className="flex justify-center mt-4">
                  <span className="inline-flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    {step.duration}
                  </span>
                </div>

                {/* Icon */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  <step.icon className="w-10 h-10 text-yellow-500" />
                  <LemonSimple className="w-4 h-4 text-yellow-400" />
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold text-navy-600 mt-4 text-center">
                  {step.title}
                </h3>
                <p className=" text-muted-foreground mt-3 text-center leading-relaxed text-sm">
                  {step.description}
                </p>

                {/* Key points */}
                <ul className="mt-5 space-y-2">
                  {step.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OverviewTimeline;
