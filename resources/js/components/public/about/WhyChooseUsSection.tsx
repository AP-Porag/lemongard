import { motion } from "framer-motion";
import { LemonSimple } from "@/components/LemonIcon";

const reasons = [
  { num: "01", title: "Purpose-Built for Your Industry", desc: "Unlike generic CRM tools, LemonGard is designed specifically for service professionals with features that matter to your work." },
  { num: "02", title: "Fair Data Ownership", desc: "You maintain complete control over your contributions while benefiting from the collective knowledge base." },
  { num: "03", title: "No Vendor Lock-in", desc: "Export your data anytime. Cancel whenever you need. No penalties, no questions asked." },
  { num: "04", title: "Proven Reliability", desc: "99.9% uptime, daily backups, and enterprise-grade security you can trust." },
  { num: "05", title: "Affordable Pricing", desc: "Professional tools at prices that make sense for small businesses and independent professionals." },
  { num: "06", title: "Continuous Improvement", desc: "Regular updates based on user feedback. We listen to what you need and build it." },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const WhyChooseUsSection = () => (
  <section className="py-20 lg:py-32">
    <div className="bg-gray-50 p-8 md:p-12 lg:p-16">
      <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <LemonSimple className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-semibold text-yellow-600 uppercase tracking-wide">Why Choose LemonGard</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-navy-600">Six Reasons to Get Started</h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {reasons.map((r) => (
          <motion.div key={r.num} variants={item} className="bg-white rounded-xl p-6 border border-gray-200 flex gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 flex items-center justify-center shrink-0">
              <span className="text-navy-600 font-bold text-sm">{r.num}</span>
            </div>
            <div>
              <h3 className="font-bold text-navy-600 text-lg mb-2">{r.title}</h3>
              <p className="text-gray-600 text-sm">{r.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      </div>
    </div>
  </section>
);

export default WhyChooseUsSection;
