import { motion } from "framer-motion";
import { Shield, Eye, Lock, Users, Lightbulb, Heart } from "lucide-react";
import { LemonSimple, LemonSlice } from "@/components/LemonIcon";

const values = [
  { icon: Shield, title: "Data Ownership", desc: "You own what you create. Edit and delete only your records, while benefiting from shared visibility." },
  { icon: Eye, title: "Transparency", desc: "Clear pricing, honest communication, and no hidden fees. What you see is what you get." },
  { icon: Lock, title: "Security", desc: "Bank-level encryption, secure backups, and compliance with industry standards protect your data." },
  { icon: Users, title: "Accessibility", desc: "Fair pricing and easy-to-use tools ensure every professional can benefit from our platform." },
  { icon: Lightbulb, title: "Innovation", desc: "We continuously improve our platform based on user feedback and emerging technologies." },
  { icon: Heart, title: "Community", desc: "Building a supportive ecosystem where professionals help each other succeed." },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const CoreValuesSection = () => (
  <section className="section-container py-20 lg:py-32">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <LemonSimple className="w-5 h-5 text-yellow-500" />
        <span className="text-sm font-semibold text-yellow-600 uppercase tracking-wide">Core Values</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-navy-600 mb-4">The Principles That Guide Us</h2>
      <p className="text-lg text-gray-600">Everything we do is shaped by these commitments</p>
    </motion.div>

    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {values.map((v) => (
        <motion.div key={v.title} variants={item} className="feature-card p-8 text-center relative overflow-hidden">
          <LemonSlice className="absolute bottom-2 right-2 w-16 h-16" opacity={0.05} />
          <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center mx-auto mb-4 relative">
            <v.icon className="w-8 h-8 text-yellow-500" />
            <LemonSimple className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1" />
          </div>
          <h3 className="text-xl font-bold text-navy-600 mb-3">{v.title}</h3>
          <p className="text-gray-600">{v.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default CoreValuesSection;
