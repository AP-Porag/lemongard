import { Shield, Lock, Database, CheckCircle2, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { LemonSimple } from "../LemonIcon";

const features = [
  { icon: Shield, title: "Secure Payments", desc: "Stripe-powered billing" },
  { icon: Lock, title: "SSL Encrypted", desc: "Bank-level security" },
  { icon: Database, title: "Daily Backups", desc: "Your data protected" },
  { icon: CheckCircle2, title: "99.9% Uptime", desc: "Always available" },
];

const PricingTrust = () => (
  <section className="section-container py-16 lg:py-24">
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-600 uppercase tracking-wide mb-4">
        <LemonSimple className="w-5 h-5 text-yellow-500" /> Secure & Reliable
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-navy-600">Your Trust Matters</h2>
    </motion.div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
      {features.map((f, i) => (
        <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
          <div className="icon-circle mx-auto mb-4 w-16 h-16 flex items-center justify-center">
            <f.icon className="icon-circle-icon" />
          </div>
          <h3 className="font-semibold text-navy-600 mb-1">{f.title}</h3>
          <p className="text-sm text-muted-foreground">{f.desc}</p>
        </motion.div>
      ))}
    </div>

    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
      <CreditCard className="w-5 h-5 text-yellow-500" />
      <span>Visa</span>
      <LemonSimple className="w-3 h-3 text-yellow-400" opacity={0.5} />
      <span>Mastercard</span>
      <LemonSimple className="w-3 h-3 text-yellow-400" opacity={0.5} />
      <span>Amex</span>
      <LemonSimple className="w-3 h-3 text-yellow-400" opacity={0.5} />
      <span>Discover</span>
      <span className="text-xs text-muted-foreground ml-2">Secured by Stripe</span>
    </motion.div>
  </section>
);

export default PricingTrust;
