import { ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { LemonSimple } from "../LemonIcon";

const PricingCTA = () => (
  <section className="section-container py-16 lg:py-24 text-center">
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <span className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
        <LemonSimple className="w-4 h-4 text-yellow-500" />
        Start Today
      </span>

      <h2 className="text-3xl md:text-4xl font-bold text-navy-600 mb-4">Ready to Get Started?</h2>
      <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
        Join hundreds of service professionals using LemonGard. Start your free trial today.
      </p>

      <a href="#trial" className="btn-primary text-lg !px-10 !py-5">
        Start Your 30-Day Free Trial <ArrowRight className="w-5 h-5" />
      </a>

      <p className="text-sm text-muted-foreground mt-6 flex flex-wrap items-center justify-center gap-2">
        No credit card required
        <LemonSimple className="w-3 h-3 text-yellow-400" opacity={0.5} />
        Cancel anytime
        <LemonSimple className="w-3 h-3 text-yellow-400" opacity={0.5} />
        Full access
      </p>

      <p className="mt-8 text-muted-foreground flex items-center justify-center gap-2 text-sm">
        <Mail className="w-4 h-4" />
        Questions? Contact us at support@lemongard.com
      </p>
    </motion.div>
  </section>
);

export default PricingCTA;
