import { motion } from "framer-motion";
import { Database, Shield, TrendingUp } from "lucide-react";
import { LemonSimple } from "@/components/LemonIcon";

const stats = [
  { value: "500+", label: "Active Users", icon: <LemonSimple className="w-8 h-8 text-yellow-500 mx-auto mb-3" /> },
  { value: "50K+", label: "Records Managed", icon: <Database className="w-8 h-8 text-yellow-500 mx-auto mb-3" /> },
  { value: "99.9%", label: "Uptime", icon: <Shield className="w-8 h-8 text-yellow-500 mx-auto mb-3" /> },
  { value: "3x", label: "Productivity Boost", icon: <TrendingUp className="w-8 h-8 text-yellow-500 mx-auto mb-3" /> },
];

const MissionSection = () => (
  <section className="section-container py-20 lg:py-32">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <LemonSimple className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-semibold text-yellow-600 uppercase tracking-wide">Our Mission</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-navy-600 mb-6">
          Empowering Service Professionals with Shared Knowledge
        </h2>

        <div className="text-gray-600 leading-relaxed space-y-4">
          <p>We believe that service industry professionals shouldn't have to start from scratch. Every interaction, every client relationship, and every service call contains valuable information that could help others in the field.</p>
          <p>LemonGard provides a platform where professionals can contribute to and benefit from a shared database of industry information, while maintaining complete ownership and control over their own data.</p>
          <p>Our mission is simple: make it easy for service professionals to access the collective knowledge of their industry while ensuring data privacy, security, and fairness.</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 gap-6"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="feature-card text-center p-6"
          >
            {stat.icon}
            <div className="text-4xl font-bold text-navy-600">{stat.value}</div>
            <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default MissionSection;
