import { ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { LemonSimple, LemonSlice } from "../LemonIcon";
// import { } from '@/components/public/LemonIcon';

const PricingCTA = () => (
  <section className="pt-16 lg:pt-24 text-center">
    
    <motion.div 
    initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
       className="relative overflow-hidden bg-gradient-to-br from-[hsl(224_76%_33%)] via-[hsl(224_76%_25%)] to-[hsl(225,90%,8%)] p-12 lg:p-16"
            
      >


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

                                         <div className="section-container ">

      <span className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
        <LemonSimple className="w-4 h-4 text-yellow-500" />
        Start Today
      </span>

      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
      <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto">
        Join hundreds of service professionals using LemonGard. Start your free trial today.
      </p>

      <a href="#trial" className="btn-primary text-lg !px-10 !py-5">
        Start Your 30-Day Free Trial <ArrowRight className="w-5 h-5" />
      </a>

      <p className="text-sm text-gray-400 mt-6 flex flex-wrap items-center justify-center gap-2">
        No credit card required
        <LemonSimple className="w-3 h-3 text-yellow-400" opacity={0.5} />
        Cancel anytime
        <LemonSimple className="w-3 h-3 text-yellow-400" opacity={0.5} />
        Full access
      </p>

      <p className="mt-8 text-gray-400 flex items-center justify-center gap-2 text-sm">
        <Mail className="w-4 h-4" />
        Questions? Contact us at support@lemongard.com
      </p>
      </div>
    </motion.div>
  </section>
);

export default PricingCTA;
