import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { LemonSlice, LemonSimple } from "@/components/LemonIcon";
// import Banner from "@/components/BannerSec";

/**
 * How It Works CTA - Final conversion section
 */
const HowItWorksCTA = () => {
  return (
    <section className="pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-navy-600 via-navy-700 to-navy-800 p-12 lg:p-16 overflow-hidden"
      >


          {/*Decorative Lemons */}
        <LemonSlice
                            className="absolute top-0 left-0 h-32 w-32 -translate-x-1/4 -translate-y-1/4"
                            opacity={0.12}
                        />
                        <LemonSlice
                            className="absolute right-0 bottom-0 h-40 w-40 translate-x-1/4 translate-y-1/4"
                            opacity={0.12}
                        />
                        <LemonSlice
                            className="absolute top-1/2 left-1/4 h-24 w-24"
                            opacity={0.06}
                        />
                        <LemonSlice
                            className="absolute right-1/3 bottom-1/4 h-20 w-20"
                            opacity={0.05}
                        />

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
