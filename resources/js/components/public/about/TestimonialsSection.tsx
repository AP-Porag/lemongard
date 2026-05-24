import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { LemonSimple } from "@/components/LemonIcon";

const testimonials = [
  { quote: "“Since using Lemongard, I’ve been able to see patterns in repeat no-shows and difficult clients. It’s helped me avoid booking people who waste my time and focus on clients who respect my schedule.”", name: "Jill W.", role: "Industry Professional", initials: "JW" },
  { quote: "“As a salon owner, I used to only rely on my own experience. Now with Lemongard, I can see shared client notes from other stylists, which has helped me avoid problem appointments and protect my staff’s time.”", name: "Brooke C.", role: "Owner/Operator", initials: "BC" },
  { quote: "“Using Lemongard has changed how I book appointments. I can quickly spot clients with a history of cancellations or bad behavior, so I’m no longer blindsided. It’s made my day-to-day work a lot smoother and more predictable.”", name: "Jayson P.", role: "Industry Professional", initials: "JP" },
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
          <p className="text-gray-600 leading-relaxed mb-6">{t.quote}</p>
          <div className="flex items-center gap-2 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-navy-600 text-white flex items-center justify-center text-sm font-bold">{t.initials}</div>
            <div>
              <p className="font-bold text-navy-600">{t.name}</p>
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
