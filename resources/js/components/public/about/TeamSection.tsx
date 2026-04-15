import { motion } from "framer-motion";
import { Code, Briefcase, HeadphonesIcon } from "lucide-react";
import { LemonSimple, LemonWhole } from "@/components/LemonIcon";

const roles = [
  { icon: Briefcase, title: "Founded by Service Industry Veterans", desc: "Deep understanding of the challenges you face daily" },
  { icon: Code, title: "Developed by Experienced Engineers", desc: "Building reliable, secure, and scalable technology" },
  { icon: HeadphonesIcon, title: "Supported by Industry Experts", desc: "Dedicated team providing real help when you need it" },
];

const TeamSection = () => (
  <section className="section-container py-20 lg:py-32">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <LemonSimple className="w-5 h-5 text-yellow-500" />
        <span className="text-sm font-semibold text-yellow-600 uppercase tracking-wide">Our Team</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-navy-600 mb-4">Built by Professionals, for Professionals</h2>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8 max-w-2xl mx-auto text-center mb-12"
    >
      <LemonWhole className="w-16 h-16 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-navy-600 mb-2">Small Team, Big Impact</h3>
      <p className="text-gray-600">LemonGard is built and maintained by a dedicated team of developers and industry professionals who understand the challenges you face every day.</p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      {roles.map((r, i) => (
        <motion.div
          key={r.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * i }}
          className="text-center"
        >
          <div className="w-14 h-14 rounded-full bg-yellow-50 flex items-center justify-center mx-auto mb-4">
            <r.icon className="w-7 h-7 text-yellow-500" />
          </div>
          <h3 className="font-bold text-navy-600 mb-2">{r.title}</h3>
          <p className="text-gray-600 text-sm">{r.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default TeamSection;
