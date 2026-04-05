import { motion } from "framer-motion";
import { LemonSimple, LemonWhole } from "@/components/LemonIcon";

const milestones = [
  { year: "2025", title: "LemonGard Launched", desc: "Platform goes live with 50 beta users from service industry" },
  { year: "Q2 2025", title: "500+ Active Users", desc: "Reached our first major milestone with positive feedback" },
  { year: "Q4 2025", title: "50,000 Records", desc: "Database grows to serve thousands of industry searches daily" },
  { year: "2026", title: "Continuous Innovation", desc: "Ongoing improvements and new features based on user needs" },
];

const TimelineSection = () => (
  <section className="section-container py-20 lg:py-32">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <LemonSimple className="w-5 h-5 text-yellow-500" />
        <span className="text-sm font-semibold text-yellow-600 uppercase tracking-wide">Our Journey</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-navy-600 mb-4">Key Milestones</h2>
      <p className="text-lg text-gray-600">LemonGard's growth story</p>
    </motion.div>

    <div className="relative max-w-3xl mx-auto">
      {/* Vertical line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-yellow-300 -translate-x-1/2" />

      {milestones.map((m, i) => (
        <motion.div
          key={m.year}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
          className={`relative flex items-start gap-6 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:text-${i % 2 === 0 ? "right" : "left"}`}
        >
          {/* Dot */}
          <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-yellow-400 border-4 border-yellow-100 z-10 mt-1" />

          {/* Content */}
          <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
            <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold mb-2">{m.year}</span>
            <h3 className="font-semibold text-navy-600 text-lg">{m.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{m.desc}</p>
            <LemonWhole className="w-6 h-6 mt-2 inline-block" opacity={0.3} />
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default TimelineSection;
