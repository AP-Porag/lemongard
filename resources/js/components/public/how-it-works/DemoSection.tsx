import { PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { LemonSimple } from "@/components/LemonIcon";

/**
 * Demo Section - Video placeholder with platform preview
 */
const DemoSection = () => {
  return (
    <section className="section-container section-padding">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <LemonSimple className="w-6 h-6 text-yellow-500" />
          <span className="text-sm font-medium text-yellow-600 uppercase tracking-wide">See It In Action</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-navy-600">Watch How It Works</h2>
        <p className="text-lg text-muted-foreground mt-4">
          A quick walkthrough of the LemonGard platform
        </p>
      </motion.div>

      {/* Video Placeholder */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <div className="relative aspect-video bg-gradient-to-br from-navy-600 to-navy-800 rounded-2xl shadow-2xl border-2 border-transparent hover:border-yellow-400 transition-colors cursor-pointer group overflow-hidden">
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

          {/* Play button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-yellow-400/20 flex items-center justify-center group-hover:bg-yellow-400/30 transition-colors">
              <PlayCircle className="w-12 h-12 md:w-16 md:h-16 text-yellow-400" />
            </div>
            <p className="text-white/70 mt-4 text-sm font-medium">Platform Demo Video (Coming Soon)</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DemoSection;
