import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { LemonSimple, LemonSlice } from "../LemonIcon";

const PricingTestimonial = () => (
  <section className="section-container py-16 lg:py-24">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative bg-gradient-to-br from-navy-600 to-navy-800 rounded-2xl p-12 lg:p-16 text-white text-center overflow-hidden"
    >
      <LemonSlice className="absolute top-0 left-0 w-32 h-32 -mt-8 -ml-8 text-white" opacity={0.05} />
      <LemonSlice className="absolute bottom-0 right-0 w-40 h-40 -mb-10 -mr-10 text-white" opacity={0.05} />

      <Quote className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
      <p className="text-xl md:text-2xl font-medium mb-6 leading-relaxed max-w-3xl mx-auto">
        "LemonGard has transformed how we access industry data. The pricing is fair, the platform is fast, and knowing we own our data gives us confidence."
      </p>
      <p className="text-gray-400">— Service Industry Professionals</p>

      <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-8 text-sm">
        {[
          { label: "500+ Users", icon: true },
          { label: "50K+ Records", icon: true },
          { label: "99.9% Uptime", icon: false },
        ].map((s) => (
          <span key={s.label} className="flex items-center gap-2 text-gray-300">
            <LemonSimple className="w-4 h-4 text-yellow-400" />
            {s.label}
          </span>
        ))}
      </div>
    </motion.div>
  </section>
);

export default PricingTestimonial;
