import { ArrowRight, PlayCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { LemonWhole, LemonSlice, LemonSimple } from './LemonIcon';

const HeroSection = () => {
    return (
        <section id="home" className="relative overflow-hidden pt-28 pb-16">
            {/* Background Lemon */}
            <LemonSlice
                className="pointer-events-none absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64"
                opacity={0.08}
            />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    {/* LEFT */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-800">
                            <LemonSimple className="h-4 w-4 text-yellow-500" />
                            <span>
                                30-Day Free Trial • No Credit Card Required
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="mt-6 text-4xl leading-tight font-bold text-[#0B1C39] md:text-5xl lg:text-6xl">
                            Your Complete CRM & Data Platform for{' '}
                            <span className="text-yellow-500">
                                Service Industry Excellence
                            </span>
                        </h1>

                        {/* Subtext */}
                        <p className="mt-6 text-lg leading-relaxed text-gray-500 md:text-xl">
                            Access shared industry data, manage client
                            relationships, and grow your business with
                            confidence. 30-day free trial included.
                        </p>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                            <a
                                href="#trial"
                                className="btn-primary flex items-center justify-center gap-2"
                            >
                                Start Your Free Trial
                                <ArrowRight className="h-5 w-5" />
                            </a>

                            <a
                                href="#how-it-works"
                                className="btn-secondary flex items-center justify-center gap-2"
                            >
                                <PlayCircle className="h-5 w-5" />
                                See How It Works
                            </a>
                        </div>

                        {/* Trust */}
                        <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                            <CheckCircle2 className="h-5 w-5 text-yellow-500" />
                            <span>Trusted by 500+ service professionals</span>
                        </div>
                    </motion.div>

                    {/* RIGHT */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B1C39] to-[#0F2A5C] p-6 shadow-2xl lg:p-8">
                            {/* Window Dots */}
                            <div className="mb-6 flex gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-400" />
                                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                                <div className="h-3 w-3 rounded-full bg-green-400" />
                            </div>

                            {/* Header */}
                            <div className="mb-6 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <LemonWhole className="h-6 w-6" />
                                    <span className="font-semibold text-white">
                                        LemonGard Dashboard
                                    </span>
                                </div>
                                <div className="text-sm text-gray-400">
                                    Today's Overview
                                </div>
                            </div>

                            {/* Chart */}
                            <div className="mb-4 rounded-lg bg-white/5 p-4">
                                <div className="flex h-32 items-end gap-2">
                                    {[
                                        40, 65, 45, 80, 55, 90, 70, 85, 60, 95,
                                        75, 88,
                                    ].map((h, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 rounded-t bg-gradient-to-t from-yellow-400 to-yellow-300"
                                            style={{ height: `${h}%` }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="rounded-lg bg-white/5 p-3 text-center">
                                    <div className="text-2xl font-bold text-yellow-400">
                                        2,847
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        Active Records
                                    </div>
                                </div>

                                <div className="rounded-lg bg-white/5 p-3 text-center">
                                    <div className="text-2xl font-bold text-white">
                                        +18%
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        This Month
                                    </div>
                                </div>

                                <div className="rounded-lg bg-white/5 p-3 text-center">
                                    <div className="text-2xl font-bold text-green-400">
                                        98.5%
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        Uptime
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating badges */}
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute -top-4 -right-4 rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#0B1C39] shadow-lg"
                        >
                            500+ Users
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity }}
                            className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#0B1C39] shadow-lg"
                        >
                            <LemonSimple className="h-4 w-4 text-yellow-500" />
                            99.9% Uptime
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

// import { ArrowRight, PlayCircle, CheckCircle2 } from "lucide-react";
// import { motion } from "framer-motion";
// import { LemonWhole, LemonSlice, LemonSimple } from "./LemonIcon";

// /**
//  * Hero Section
//  * Main landing area with headline, CTAs, and dashboard mockup
//  */
// const HeroSection = () => {
//   return (
//     <section id="home" className="relative section-container section-padding pt-32">
//       {/* Background Lemon Slice Watermark */}
//       <LemonSlice className="absolute top-0 right-0 w-64 h-64 -mt-20 -mr-20 pointer-events-none" opacity={0.08} />

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//         {/* Left Column - Content */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           {/* Trial Badge */}
//           <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
//             <LemonSimple className="w-4 h-4 text-yellow-500" />
//             <span>30-Day Free Trial • No Credit Card Required</span>
//           </div>

//           {/* Headline */}
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-600 leading-tight mt-6">
//             Your Complete CRM & Data Platform for{" "}
//             <span className="text-yellow-500">Service Industry Excellence</span>
//           </h1>

//           {/* Subheadline */}
//           <p className="text-lg md:text-xl text-gray-500 mt-6 leading-relaxed">
//             Access shared industry data, manage client relationships, and grow your
//             business with confidence. 30-day free trial included.
//           </p>

//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 mt-8">
//             <a
//               href="#trial"
//               className="btn-primary justify-center"
//             >
//               Start Your Free Trial
//               <ArrowRight className="w-5 h-5" />
//             </a>
//             <a
//               href="#how-it-works"
//               className="btn-secondary justify-center"
//             >
//               <PlayCircle className="w-5 h-5" />
//               See How It Works
//             </a>
//           </div>

//           {/* Trust Line */}
//           <div className="flex items-center gap-2 text-sm text-gray-500 mt-6">
//             <CheckCircle2 className="w-5 h-5 text-yellow-500" />
//             <span>Trusted by 500+ service professionals</span>
//           </div>
//         </motion.div>

//         {/* Right Column - Dashboard Mockup */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="relative"
//         >
//           <div className="relative rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-navy-600 to-navy-800 p-6 lg:p-8">
//             {/* Window Controls */}
//             <div className="flex gap-2 mb-6">
//               <div className="w-3 h-3 rounded-full bg-red-400" />
//               <div className="w-3 h-3 rounded-full bg-yellow-400" />
//               <div className="w-3 h-3 rounded-full bg-green-400" />
//             </div>

//             {/* Dashboard Header */}
//             <div className="flex justify-between items-center mb-6">
//               <div className="flex items-center gap-2">
//                 <LemonWhole className="w-6 h-6" />
//                 <span className="text-white font-semibold">LemonGard Dashboard</span>
//               </div>
//               <div className="text-gray-400 text-sm">Today's Overview</div>
//             </div>

//             {/* Chart Area */}
//             <div className="bg-navy-700/50 rounded-lg p-4 mb-4">
//               <div className="flex items-end gap-2 h-32">
//                 {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, i) => (
//                   <div
//                     key={i}
//                     className="flex-1 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t"
//                     style={{ height: `${height}%` }}
//                   />
//                 ))}
//               </div>
//               <div className="flex justify-between mt-2 text-xs text-gray-400">
//                 <span>Jan</span>
//                 <span>Mar</span>
//                 <span>Jun</span>
//                 <span>Sep</span>
//                 <span>Dec</span>
//               </div>
//             </div>

//             {/* Stats Row */}
//             <div className="grid grid-cols-3 gap-4">
//               <div className="bg-navy-700/50 rounded-lg p-3 text-center">
//                 <div className="text-2xl font-bold text-yellow-400">2,847</div>
//                 <div className="text-xs text-gray-400">Active Records</div>
//               </div>
//               <div className="bg-navy-700/50 rounded-lg p-3 text-center">
//                 <div className="text-2xl font-bold text-white">+18%</div>
//                 <div className="text-xs text-gray-400">This Month</div>
//               </div>
//               <div className="bg-navy-700/50 rounded-lg p-3 text-center">
//                 <div className="text-2xl font-bold text-green-400">98.5%</div>
//                 <div className="text-xs text-gray-400">Uptime</div>
//               </div>
//             </div>
//           </div>

//           {/* Floating Stats Badges */}
//           <motion.div
//             animate={{ y: [0, -5, 0] }}
//             transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//             className="absolute -top-4 -right-4 bg-white rounded-lg px-4 py-2 shadow-lg flex items-center gap-2"
//           >
//             <div className="w-2 h-2 rounded-full bg-green-400" />
//             <span className="text-sm font-medium text-navy-600">500+ Users</span>
//           </motion.div>

//           <motion.div
//             animate={{ y: [0, 5, 0] }}
//             transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
//             className="absolute -bottom-4 -left-4 bg-white rounded-lg px-4 py-2 shadow-lg flex items-center gap-2"
//           >
//             <LemonSimple className="w-4 h-4 text-yellow-500" />
//             <span className="text-sm font-medium text-navy-600">99.9% Uptime</span>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
