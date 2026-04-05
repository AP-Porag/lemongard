import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { LemonSimple } from "@/components/LemonIcon";

const testimonials = [
  { quote: "LemonGard transformed how we manage client data. The shared database is invaluable for our team.", name: "Sarah M.", role: "Service Manager", initials: "SM" },
  { quote: "Finally, a CRM that understands service professionals. Simple, affordable, and actually useful.", name: "James R.", role: "Independent Contractor", initials: "JR" },
  { quote: "The data ownership model is exactly what we needed. We can contribute freely while keeping control.", name: "Elena K.", role: "Operations Director", initials: "EK" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const TestimonialsSection = () => (
  <section className="section-container py-20 lg:py-32">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <LemonSimple className="w-5 h-5 text-yellow-500" />
        <span className="text-sm font-semibold text-yellow-600 uppercase tracking-wide">What Users Say</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-navy-600">Trusted by Professionals</h2>
    </motion.div>

    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {testimonials.map((t) => (
        <motion.div key={t.name} variants={item} className="feature-card p-8 relative">
          <Quote className="w-8 h-8 text-yellow-400 mb-4" />
          <p className="text-gray-600 leading-relaxed mb-6">"{t.quote}"</p>
          <div className="flex items-center gap-2 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-navy-600 text-white flex items-center justify-center text-sm font-bold">{t.initials}</div>
            <div>
              <p className="font-semibold text-navy-600">{t.name}</p>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          </div>
          <LemonSimple className="absolute top-4 right-4 w-4 h-4 text-yellow-300" opacity={0.5} />
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default TestimonialsSection;
