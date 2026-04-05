import { motion } from "framer-motion";
import { Lock, CreditCard, Shield, Database } from "lucide-react";
import { LemonSimple } from "@/components/LemonIcon";

const badges = [
  { icon: Lock, label: "SSL Secured" },
  { icon: CreditCard, label: "Stripe Verified" },
  { icon: Shield, label: "GDPR Compliant" },
  { icon: Database, label: "Daily Backups" },
];

const TrustBadgesSection = () => (
  <section className="section-container py-16">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="text-xl font-semibold text-navy-600 text-center mb-8">Trusted & Secure</h3>
      <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap">
        {badges.map((b, i) => (
          <div key={b.label} className="flex items-center gap-2 text-gray-600">
            <b.icon className="w-6 h-6 text-yellow-500" />
            <span className="text-sm font-medium">{b.label}</span>
            {i < badges.length - 1 && (
              <LemonSimple className="w-3 h-3 text-yellow-300 ml-4 hidden md:block" opacity={0.5} />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default TrustBadgesSection;
