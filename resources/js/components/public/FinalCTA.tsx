import { ArrowRight } from "lucide-react";
import { motion } from 'motion/react';
import { LemonSlice, LemonSimple } from "./LemonIcon";

/**
 * Final CTA Section
 * Navy gradient background with lemon slice decorations
 */
const FinalCTA = () => {
  return (
    <section id="contact" className="section-container section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl p-12 lg:p-16 overflow-hidden bg-gradient-to-br from-[hsl(224_76%_33%)] via-[hsl(224_76%_25%)] to-[hsl(225,90%,8%)]"
      >

        
        {/* Decorative Lemon Slices */}
        <LemonSlice className="absolute top-0 left-0 w-32 h-32 -translate-x-1/4 -translate-y-1/4" opacity={0.12} />
        <LemonSlice className="absolute bottom-0 right-0 w-40 h-40 translate-x-1/4 translate-y-1/4" opacity={0.12} />
        <LemonSlice className="absolute top-1/2 left-1/4 w-24 h-24" opacity={0.06} />
        <LemonSlice className="absolute bottom-1/4 right-1/3 w-20 h-20" opacity={0.05} />

        {/* Content */}
        <div className="relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Ready to Transform Your Workflow?
          </h2>

          <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
            Join service professionals who trust LemonGard for their CRM needs.
            Start your journey today.
          </p>

          {/* CTA Button */}
          <a
            href="#trial"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-navy-900 font-bold px-10 py-5 rounded-lg shadow-2xl hover:shadow-yellow-500/30 transition-all duration-300 hover:scale-105 mt-10 text-lg"
          >
            Start Your Free Trial Today
            <ArrowRight className="w-6 h-6" />
          </a>

          {/* Small Text with Lemon Separators */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-6">
            <span>30 days free</span>
            <LemonSimple className="w-3 h-3 text-yellow-400" opacity={0.5} />
            <span>Easy setup</span>
            <LemonSimple className="w-3 h-3 text-yellow-400" opacity={0.5} />
            <span>Cancel anytime</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
