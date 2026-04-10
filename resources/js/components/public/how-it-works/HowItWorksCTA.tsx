import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { LemonSlice, LemonSimple } from "@/components/LemonIcon";
// import Banner from "@/components/BannerSec";

/**
 * How It Works CTA - Final conversion section
 */
const HowItWorksCTA = () => {
  return (
    <section className="section-container section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-navy-600 via-navy-700 to-navy-800 rounded-2xl p-12 lg:p-16 overflow-hidden"
      >


          {/*Decorative Lemons */}
        {/* <LemonSlice className="absolute top-0 left-0 w-32 h-32 -mt-4 -ml-4" opacity={0.1} />
        <LemonSlice className="absolute bottom-0 right-0 w-40 h-40 -mb-6 -mr-6" opacity={0.1} />

        {/* Content */}
        <div className="relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
            Join hundreds of service professionals already using LemonGard
          </p>
          <button className="btn-primary !px-10 !py-5 !text-lg !font-bold !shadow-2xl mt-10">
            Start Your Free Trial
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-6">
            <span>30 days free</span>
            <LemonSimple className="w-3 h-3 text-yellow-400/50" />
            <span>No credit card required</span>
            <LemonSimple className="w-3 h-3 text-yellow-400/50" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWorksCTA;
