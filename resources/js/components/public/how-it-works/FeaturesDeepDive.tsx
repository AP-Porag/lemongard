import { Search, Shield, Users, BarChart, Smartphone, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { LemonSimple, LemonSlice } from "@/components/LemonIcon";

const features = [
  {
    icon: Search,
    title: "Advanced Search & Filters",
    description: "Find exactly what you need with powerful search across all fields, saved filters, and boolean operators.",
    points: ["Full-text search", "Multi-field filtering", "Saved search queries", "Export search results"],
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "Your data is protected with bank-level encryption, secure backups, and compliance with industry standards.",
    points: ["256-bit SSL encryption", "Daily automated backups", "GDPR compliant", "Role-based access"],
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share insights with your team, assign tasks, and work together on client management.",
    points: ["Team workspaces", "Activity tracking", "Comment threads", "@mentions"],
  },
  {
    icon: BarChart,
    title: "Powerful Analytics",
    description: "Generate custom reports, visualize trends, and make data-driven decisions for your business.",
    points: ["Custom report builder", "Visual dashboards", "Trend analysis", "Export to Excel/PDF"],
  },
  {
    icon: Smartphone,
    title: "Mobile Responsive",
    description: "Access your CRM from anywhere with our fully responsive web app that works on all devices.",
    points: ["Works on any device", "Touch-optimized", "Offline mode coming soon", "Native app in development"],
  },
  {
    icon: Zap,
    title: "API & Integrations",
    description: "Connect LemonGard with your existing tools via our REST API or pre-built integrations.",
    points: ["RESTful API", "Zapier integration", "Webhook support", "Custom integrations"],
  },
];

/**
 * Features Deep Dive - 6 feature cards in a 3-column grid
 */
const FeaturesDeepDive = () => {
  return (
    <section className="section-container section-padding">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <LemonSimple className="w-6 h-6 text-yellow-500" />
          <span className="text-sm font-medium text-yellow-600 uppercase tracking-wide">Platform Features</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-navy-600">Everything You Need in One Place</h2>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          Discover the powerful features that make LemonGard the perfect CRM solution
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="feature-card !rounded-2xl relative overflow-hidden"
          >
            {/* Background lemon pattern */}
            <LemonSlice className="absolute -bottom-6 -right-6 w-24 h-24" opacity={0.05} />

            <div className="relative z-10">
              <div className="icon-circle">
                <feature.icon className="icon-circle-icon" />
              </div>
              <h3 className="text-xl font-semibold text-navy-600 mt-5">{feature.title}</h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{feature.description}</p>
              <ul className="mt-4 space-y-2">
                {feature.points.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-sm text-gray-700">
                    <LemonSimple className="w-3 h-3 text-yellow-400 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesDeepDive;
