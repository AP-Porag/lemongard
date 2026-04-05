import { Lock, HardDrive, FileCheck, Server } from "lucide-react";
import { motion } from "framer-motion";
import { LemonSimple } from "@/components/LemonIcon";

const securityFeatures = [
  { icon: Lock, title: "256-bit Encryption", desc: "Bank-level SSL encryption for all data" },
  { icon: HardDrive, title: "Daily Backups", desc: "Automated backups to secure servers" },
  { icon: FileCheck, title: "GDPR Compliant", desc: "Full compliance with data regulations" },
  { icon: Server, title: "Secure Infrastructure", desc: "Hosted on enterprise-grade servers" },
];

const badges = ["SSL Secured", "Stripe Partner", "GDPR Compliant", "SOC 2"];

/**
 * Trust & Security Section
 */
const TrustSecurity = () => {
  return (
    <section className="section-container section-padding">
      <div className="bg-gray-50 rounded-2xl p-8 lg:p-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-yellow-500" />
            <LemonSimple className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-600 uppercase tracking-wide">Security & Compliance</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-600">Your Data is Safe With Us</h2>
          <p className="text-lg text-muted-foreground mt-4">
            Industry-leading security practices protect your information
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {securityFeatures.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="icon-circle mx-auto">
                <feat.icon className="icon-circle-icon" />
              </div>
              <h3 className="font-semibold text-navy-600 mt-4">{feat.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-12"
        >
          {badges.map((badge, i) => (
            <span key={badge} className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-navy-600 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                <Lock className="w-3.5 h-3.5 text-yellow-500" />
                {badge}
              </span>
              {i < badges.length - 1 && <LemonSimple className="w-3 h-3 text-yellow-400" />}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSecurity;
