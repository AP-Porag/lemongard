import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { LemonSimple, LemonWhole } from "@/components/LemonIcon";

const goals = [
  "Making relevant business information organized and accessible",
  "Providing clear and consistent recordkeeping tools",
  "Maintaining privacy and responsible data practices",
  "Providing secure and reliable infrastructure",
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
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">How LemonGard Came to Be</h2>
        <p className="text-lg text-gray-600">From an Idea to a Practical Business Tool</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto text-gray-700 leading-relaxed space-y-6"
      >
        <p>LemonGard began with a simple idea: service professionals need better tools to organize information and make informed business decisions.</p>
        <p>Across many service industries, important transaction information is often stored in different systems, spreadsheets, and records. LemonGard was created to provide a more structured and consistent approach.</p>
        <p className="font-medium text-black">We set out to build a platform focused on:</p>

        <ul className="space-y-3">
          {goals.map((goal) => (
            <li key={goal} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0" />
              <LemonSimple className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>{goal}</span>
            </li>
          ))}
        </ul>

        <p>Keeping pricing simple and transparent</p>
      </motion.div>
      </div>
    </div>
    {/* </div> */}
  </section>
);

export default OurStorySection;
