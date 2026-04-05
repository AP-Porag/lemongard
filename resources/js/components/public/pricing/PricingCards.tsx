import { CheckCircle2, X, Eye, Zap, ArrowRight, Info } from "lucide-react";
import { motion } from "framer-motion";
import { LemonSimple, LemonSlice } from "../LemonIcon";

const viewFeatures = [
  "View all records in shared database",
  "Advanced search and filtering across all fields",
  "Access to complete data including industry, contacts, services",
  "Export search results",
  "Mobile-responsive access",
  "Email support",
  "Read-only access",
];

const viewExcluded = [
  "Cannot add new records",
  "Cannot edit any data",
  "Cannot delete records",
];

const fullFeatures = [
  "All View Only features included",
  "Add unlimited new records to shared database",
  "Edit your own records anytime",
  "Delete your own records",
  "Full data contribution rights",
  "Priority email support",
  "Early access to new features",
  "Data ownership protection",
];

const PricingCards = () => (
  <section className="section-container py-16 lg:py-24">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {/* Tier 1 - View Only */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-card border-2 border-border rounded-2xl p-8 lg:p-10 hover:shadow-2xl transition-all duration-300 overflow-hidden"
      >
        <LemonSlice className="absolute -top-6 -right-6 w-24 h-24" opacity={0.05} />
        <LemonSlice className="absolute bottom-4 left-4 w-16 h-16" opacity={0.04} />

        <div className="flex items-center gap-2 mb-2">
          <Eye className="w-6 h-6 text-navy-600" />
          <h3 className="text-2xl font-bold text-navy-600">View Only</h3>
        </div>
        <p className="text-muted-foreground mb-6">Perfect for researchers and data analysts</p>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-5xl font-bold text-navy-600">$14.99</span>
          <span className="text-xl text-muted-foreground">/month</span>
        </div>
        <p className="text-sm text-yellow-600 font-medium mb-8">30 days free, then $14.99/month</p>

        <a href="#trial" className="btn-secondary w-full justify-center mb-8">Start Free Trial</a>

        <hr className="border-border mb-8" />

        <ul className="space-y-4 mb-6">
          {viewFeatures.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0" />
              <span className="text-muted-foreground">{f}</span>
            </li>
          ))}
        </ul>

        <div className="pt-6 border-t border-border">
          <p className="text-sm font-semibold text-muted-foreground mb-3">Not Included:</p>
          <ul className="space-y-3">
            {viewExcluded.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <X className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <span className="text-gray-400">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Tier 2 - Full Access */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ scale: 1.02 }}
        className="relative bg-card border-2 border-yellow-400 rounded-2xl p-8 lg:p-10 shadow-2xl lg:scale-105 overflow-hidden"
      >
        <LemonSlice className="absolute -top-6 -right-6 w-24 h-24" opacity={0.05} />
        <LemonSlice className="absolute bottom-4 left-4 w-16 h-16" opacity={0.04} />

        {/* Popular badge */}
        <span className="absolute top-0 right-8 -translate-y-1/2 btn-primary !px-6 !py-2 !text-sm !shadow-lg">
          ⭐ MOST POPULAR
        </span>

        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-6 h-6 text-yellow-500" />
          <h3 className="text-2xl font-bold text-navy-600">Full Access</h3>
        </div>
        <p className="text-muted-foreground mb-6">Complete control for active professionals</p>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-5xl font-bold text-navy-600">$19.99</span>
          <span className="text-xl text-muted-foreground">/month</span>
        </div>
        <span className="text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full inline-block mb-2">Best Value - Full Features</span>
        <p className="text-sm text-yellow-600 font-medium mb-8">30 days free, then $19.99/month</p>

        <a href="#trial" className="btn-primary w-full justify-center mb-8">
          Start Free Trial <ArrowRight className="w-5 h-5" />
        </a>

        <hr className="border-border mb-8" />

        <p className="text-sm font-semibold text-navy-600 mb-4">Everything in View Only, plus:</p>
        <ul className="space-y-4">
          {fullFeatures.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0" />
              <span className="text-muted-foreground">{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg flex items-start gap-3">
          <Info className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
          <p className="text-sm text-yellow-800">You can only edit or delete records you personally created. View all, edit yours.</p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default PricingCards;
