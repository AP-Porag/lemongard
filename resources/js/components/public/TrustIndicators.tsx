import { Users, Database, Shield, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import LemonIcon from "./LemonIcon";

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Active Users",
    hasLemon: true,
  },
  {
    icon: Database,
    value: "50K+",
    label: "Records Managed",
    hasLemon: false,
  },
  {
    icon: Shield,
    value: "99.9%",
    label: "Uptime Guarantee",
    hasLemon: true,
  },
  {
    icon: TrendingUp,
    value: "3x",
    label: "Productivity Boost",
    hasLemon: true,
  },
];

/**
 * Trust Indicators Section
 * Social proof stats with icons and lemon decorations
 */
const TrustIndicators = () => {
  return (
    <section className="section-container py-12 border-t border-gray-100">
      <p className="text-center text-sm text-gray-500 mb-8">
        Trusted by service professionals across multiple industries
      </p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center"
          >
            <div className="relative inline-flex">
              <div className="bg-yellow-100 rounded-full p-3">
                <stat.icon className="w-6 h-6 text-yellow-600" />
              </div>
              {stat.hasLemon && (
                <LemonIcon className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400" />
              )}
            </div>
            <div className="text-4xl font-bold text-navy-600 mt-4">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TrustIndicators;
