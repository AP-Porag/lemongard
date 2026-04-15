import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { LemonSimple, LemonWhole } from "@/components/LemonIcon";

const goals = [
  "Make industry data accessible to everyone who needs it",
  "Ensure data contributors maintain ownership of their information",
  "Provide enterprise-grade security and reliability",
  "Keep pricing fair and transparent for all professionals",
];

const OurStorySection = () => (
  <section className="py-20 lg:py-32">
    <div className="bg-gray-50 p-8 md:p-12 lg:p-16 relative overflow-hidden">
      {/* Decorative lemons */}
      <LemonWhole className="absolute top-4 right-4 w-20 h-20" opacity={0.08} />
      <LemonWhole className="absolute bottom-4 left-4 w-16 h-16" opacity={0.08} />
   <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <LemonSimple className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-semibold text-yellow-600 uppercase tracking-wide">Our Story</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-navy-600 mb-4">How LemonGard Came to Be</h2>
        <p className="text-lg text-gray-600">The journey from idea to platform</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto text-gray-700 leading-relaxed space-y-6"
      >
        <p>LemonGard was born from a simple observation: service industry professionals were repeatedly solving the same problems, often without knowing that solutions already existed within their network.</p>
        <p>Our founders, who spent years working in various service industries, noticed that valuable information was scattered across individual contact lists, spreadsheets, and handwritten notes. There had to be a better way.</p>
        <p className="font-medium text-navy-600">We set out to create a platform that would:</p>

        <ul className="space-y-3">
          {goals.map((goal) => (
            <li key={goal} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0" />
              <LemonSimple className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>{goal}</span>
            </li>
          ))}
        </ul>

        <p>Today, LemonGard serves hundreds of service professionals, helping them save time, make better decisions, and grow their businesses with confidence.</p>
      </motion.div>
      </div>
    </div>
    {/* </div> */}
  </section>
);

export default OurStorySection;
