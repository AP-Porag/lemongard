import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
import { Link } from "@inertiajs/react";
import {
  ArrowRight,
  Tag,
  ChevronRight,
  Database,
  ShieldCheck,
  Search,
  Briefcase,
  FileText,
  BarChart2,
  CreditCard,
  Gift,
  Lock,
  Eye,
  Zap,
  PenLine,
  Trash2,
  Shield,
  UserPlus,
  PlusCircle,
  Settings2,
  TrendingUp,
  XCircle,
  CheckCircle2,
  CheckCircle,
  Minus,
  Users,
  Server,
  Quote,
  Star,
  Clock,
} from "lucide-react";
import Navigation from "@/components/public/Navigation";
import Footer from "@/components/public/Footer";
import { LemonSlice, LemonWhole, LemonSimple, LemonHalf } from "@/components/LemonIcon";
import heroBg from "@/assets/hero-bg.png";
import PublicLayout from "@/layouts/PublicLayout"
import Banner from "@/components/BannerSec";
/**
 * LemonGard — Features Page
 * Showcases the full platform feature set for service professionals.
 * Matches the homepage design system exactly.
 *
 * NOTE: Per brand language rules, this page never uses the term "CRM".
 * Always use: "client data tracking", "shared data platform", etc.
 */

// ---- Animation presets ----
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const cardContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const cardItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

// Reusable button class strings (match homepage)
const primaryBtn =
  "bg-gradient-to-r from-[#FCD34D] to-[#F8C734] hover:from-[#F8C734] hover:to-[#EAB308] text-[#1E3A8A] font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2";
const outlineBtn =
  "border-2 border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 inline-flex items-center gap-2";
const whiteOutlineBtn =
  "border-2 border-white/60 text-white hover:bg-white hover:text-[#1E3A8A] font-semibold px-8 py-4 rounded-lg transition-all duration-300 inline-flex items-center gap-2";

// ---- Core feature data ----
const coreFeatures = [
  {
    icon: Database,
    title: "Shared Data Access",
    description:
      "View and search records contributed across the entire LemonGard network. Every new subscriber adds value for everyone.",
    bullets: [
      "Access the full shared database",
      "Real-time record availability",
      "Network grows with every subscriber",
    ],
    badge: "Network Effect",
  },
  {
    icon: ShieldCheck,
    title: "Ownership Protection",
    description:
      "You can view all records but may only edit or delete the ones you personally created. Trust and integrity built into the platform.",
    bullets: [
      "Edit only your own records",
      "Delete only your own records",
      "Full accountability enforced",
    ],
    badge: "Your Data, Your Control",
  },
  {
    icon: Search,
    title: "Advanced Search & Filtering",
    description:
      "Locate any record instantly using powerful multi-field search built for large datasets.",
    fields: [
      "First Name",
      "Last Name",
      "Phone Number",
      "City",
      "State",
      "Service",
      "Industry",
      "Address",
    ],
    note: "Designed for speed across thousands of records.",
    badge: "Lightning Fast",
  },
  {
    icon: Briefcase,
    title: "Industry-Based Organization",
    description:
      "Browse, filter, and generate reports based on specific industry categories relevant to your service work.",
    bullets: [
      "Industry dropdown selector",
      "Category-based reporting",
      "Market-specific filtering",
    ],
    badge: "Smart Organization",
  },
  {
    icon: FileText,
    title: "Structured Record Management",
    description: "Store comprehensive client information in a consistent, searchable format.",
    fields: [
      "Customer Names",
      "Phone Numbers",
      "Addresses",
      "Service Details",
      "Pricing",
      "Incident Reports",
    ],
    badge: "Complete Client Profiles",
  },
  {
    icon: BarChart2,
    title: "Subscriber Reporting",
    description:
      "Generate actionable reports from the shared database to identify trends, opportunities, and insights for your business.",
    bullets: [
      "Filter reports by industry",
      "Subscriber-level data views",
      "Professional business workflows",
    ],
    badge: "Business Intelligence",
  },
] as const;

// ---- Steps data ----
const steps = [
  {
    icon: UserPlus,
    title: "Create Your Account",
    description: "Sign up in minutes and start your 30-day free trial. No credit card required.",
    badge: { label: "Takes 2 minutes", color: "bg-green-50 text-green-700 border-green-200" },
  },
  {
    icon: Search,
    title: "Search & Explore",
    description:
      "Browse and search the shared client data database using advanced filters across all fields.",
    badge: { label: "Instant access", color: "bg-green-50 text-green-700 border-green-200" },
  },
  {
    icon: PlusCircle,
    title: "Add Your Records",
    description:
      "Contribute structured client records to the shared network. Full Access plan required.",
    badge: { label: "Full Access Plan", color: "bg-yellow-50 text-yellow-800 border-yellow-200" },
  },
  {
    icon: Settings2,
    title: "Manage Your Data",
    description: "Edit, update, or delete the records you created. Your contributions, your control.",
    badge: { label: "Your Records Only", color: "bg-yellow-50 text-yellow-800 border-yellow-200" },
  },
  {
    icon: TrendingUp,
    title: "Grow Your Business",
    description:
      "Use structured client data, network insights, and reports to make smarter business decisions.",
    badge: { label: "Ongoing value", color: "bg-green-50 text-green-700 border-green-200" },
  },
] as const;

// ---- Comparison table data ----
const tableGroups = [
  {
    label: "Database Access",
    rows: [
      ["View Shared Records", true, true],
      ["Search All Fields", true, true],
      ["Advanced Filters", true, true],
      ["Industry Filtering", true, true],
    ],
  },
  {
    label: "Record Management",
    rows: [
      ["Add New Records", false, true],
      ["Edit Own Records", false, true],
      ["Delete Own Records", false, true],
    ],
  },
  {
    label: "Reporting",
    rows: [
      ["Access Reports", true, true],
      ["Subscriber Reports", true, true],
    ],
  },
  {
    label: "Support & Trial",
    rows: [
      ["30-Day Free Trial", true, true],
      ["Email Support", true, true],
      ["Priority Support", false, true],
    ],
  },
] as const;

const Features = () => {
  return (

   <PublicLayout>
      <main>
        {/* Botanical background */}
        <Banner/>
        {/* ================= SECTION 2: HERO ================= */}
        <section className="relative section-container py-16 lg:py-28 pt-32 overflow-hidden">

          {/* Breadcrumb */}
          <nav className="relative flex items-center gap-2 text-sm text-gray-500 mb-5 -mt-4">
            <Link href="/" className="hover:text-yellow-500 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#1E3A8A] font-medium">Features</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <LemonSimple className="w-4 h-4 text-[#F8C734]" />
              <span>Platform Features</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
              <span className="text-[#1E3A8A]">Powerful Shared</span>{" "}
              <span className="bg-gradient-to-r from-[#F8C734] to-[#FBBF24] bg-clip-text text-transparent">
                Client Data Tracking
              </span>{" "}
              <span className="text-[#1E3A8A]">Platform for Service Professionals</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Access, search, and contribute to a growing shared database while maintaining
              complete control over the client records you create. Built for service
              professionals who need real data, real fast.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/register" className={primaryBtn}>
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/pricing" className={outlineBtn}>
                <Tag className="w-5 h-5" /> View Pricing
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center justify-center gap-3 text-sm text-gray-500 mb-16">
              <div className="flex -space-x-2">
                {["JS", "ML", "RK"].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 border-2 border-white flex items-center justify-center text-xs font-bold text-[#1E3A8A]"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <span>Join 500+ service professionals already using LemonGard</span>
            </div>

            {/* Hero stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
              {[
                { icon: LemonSimple, value: "500+", label: "Active Users", isLemon: true },
                { icon: Database, value: "50,000+", label: "Client Records" },
                { icon: Shield, value: "99.9%", label: "Platform Uptime" },
                { icon: Gift, value: "30 Days", label: "Free Trial" },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="text-center">
                    <Icon className="w-8 h-8 text-[#F8C734] mx-auto mb-2" />
                    <div className="text-3xl font-bold text-[#1E3A8A]">{s.value}</div>
                    <div className="text-sm text-gray-600">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* ================= SECTION 3: STATS TICKER ================= */}
        <section className="section-container py-6">
          <motion.div
            {...fadeUp}
            className="bg-gradient-to-r from-[#1E3A8A] to-[#1E40AF] rounded-2xl px-8 py-5 relative overflow-hidden"
          >
            <LemonSlice
              className="absolute right-4 top-0 w-24 h-24 pointer-events-none"
              opacity={0.1}
            />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative">
              <div className="flex items-center gap-3">
                <LemonSimple className="w-6 h-6 text-[#F8C734]" />
                <span className="font-semibold text-white">Platform at a Glance</span>
              </div>
              <div className="flex items-center gap-3 flex-wrap justify-center">
                {[
                  { icon: Users, value: "500+", label: "Users" },
                  { icon: Database, value: "50K+", label: "Records" },
                  { icon: Shield, value: "99.9%", label: "Uptime" },
                  { icon: Clock, value: "< 2min", label: "Avg Search" },
                  { icon: Star, value: "30 Days", label: "Free Trial" },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.label}
                      className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2"
                    >
                      <Icon className="w-4 h-4 text-[#F8C734]" />
                      <span className="font-bold text-white">{s.value}</span>
                      <span className="text-gray-300 text-sm">{s.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ================= SECTION 4: CORE FEATURES GRID ================= */}
        <section className="section-container py-20 lg:py-32">
          <motion.div {...fadeUp} className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <LemonSimple className="w-10 h-10 text-[#F8C734]" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E3A8A]">
                Core Platform Features
              </h2>
            </div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Nine powerful capabilities that make LemonGard the go-to shared client data
              tracking solution for service professionals.
            </p>
          </motion.div>

          <motion.div
            variants={cardContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {coreFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  variants={cardItem}
                  className="relative bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl hover:border-[#F8C734] transition-all duration-300 group overflow-hidden flex flex-col"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FCD34D] to-[#F8C734] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <LemonSlice
                    className="absolute -top-4 -right-4 w-24 h-24 pointer-events-none"
                    opacity={0.05}
                  />
                  <LemonSlice
                    className="absolute -bottom-4 -left-4 w-16 h-16 pointer-events-none"
                    opacity={0.05}
                  />

                  <div className="relative bg-yellow-50 rounded-full p-4 w-16 h-16 inline-flex items-center justify-center mb-6 flex-shrink-0 group-hover:bg-yellow-100 transition-colors duration-300">
                    <Icon className="text-[#F8C734] w-8 h-8" />
                  </div>

                  <h3 className="relative text-xl font-bold text-[#1E3A8A] mb-3">
                    {f.title}
                  </h3>
                  <p className="relative text-gray-600 leading-relaxed">{f.description}</p>

                  {"bullets" in f && f.bullets && (
                    <ul className="relative space-y-2 text-sm text-gray-600 my-4">
                      {f.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#F8C734] mt-0.5 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {"fields" in f && f.fields && (
                    <>
                      <div className="relative grid grid-cols-2 gap-1 my-4">
                        {f.fields.map((field) => (
                          <span
                            key={field}
                            className="bg-gray-100 rounded px-2 py-1 text-xs text-gray-700"
                          >
                            {field}
                          </span>
                        ))}
                      </div>
                      {"note" in f && f.note && (
                        <p className="relative text-sm text-gray-600 mt-2">{f.note}</p>
                      )}
                    </>
                  )}

                  <div className="relative inline-flex items-center gap-1.5 mt-auto pt-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200">
                      <LemonSimple className="w-3 h-3 text-[#F8C734]" />
                      {f.badge}
                    </span>
                  </div>
                </motion.div>
              );
            })}

            {/* Card 7 — Subscription tiers */}
            <motion.div
              variants={cardItem}
              className="relative bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl hover:border-[#F8C734] transition-all duration-300 group overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FCD34D] to-[#F8C734] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <LemonSlice
                className="absolute -top-4 -right-4 w-24 h-24 pointer-events-none"
                opacity={0.05}
              />
              <div className="relative bg-yellow-50 rounded-full p-4 w-16 h-16 inline-flex items-center justify-center mb-6">
                <CreditCard className="text-[#F8C734] w-8 h-8" />
              </div>
              <h3 className="relative text-xl font-bold text-[#1E3A8A] mb-3">
                Flexible Subscription Access
              </h3>
              <p className="relative text-gray-600 leading-relaxed">
                Choose the plan that matches your business workflow. Upgrade anytime with no
                penalties.
              </p>
              <div className="relative space-y-3 my-4">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex justify-between items-center">
                  <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Eye className="w-4 h-4 text-[#1E3A8A]" /> View Only
                  </span>
                  <span className="font-bold text-[#1E3A8A]">$14.99/mo</span>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200 flex justify-between items-center">
                  <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Zap className="w-4 h-4 text-[#F8C734]" /> Full Access
                    <span className="ml-1 bg-[#F8C734] text-[#1E3A8A] px-2 py-0.5 rounded-full text-[10px] font-bold">
                      Popular
                    </span>
                  </span>
                  <span className="font-bold text-[#1E3A8A]">$19.99/mo</span>
                </div>
              </div>
              <div className="relative mt-auto pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200">
                  <LemonSimple className="w-3 h-3 text-[#F8C734]" /> Flexible Plans
                </span>
              </div>
            </motion.div>

            {/* Card 8 — Free trial (highlighted) */}
            <motion.div
              variants={cardItem}
              className="relative bg-gradient-to-br from-yellow-50 to-white border-2 border-[#F8C734] rounded-xl p-8 hover:shadow-xl transition-all duration-300 group overflow-hidden flex flex-col"
            >
              <LemonHalf
                className="absolute -top-4 -right-4 w-24 h-24 pointer-events-none"
                opacity={0.1}
              />
              <div className="relative bg-yellow-100 rounded-full p-4 w-16 h-16 inline-flex items-center justify-center mb-6">
                <Gift className="text-[#F8C734] w-8 h-8" />
              </div>
              <h3 className="relative text-xl font-bold text-[#1E3A8A] mb-3">
                30-Day Free Trial
              </h3>
              <p className="relative text-gray-600 leading-relaxed">
                Explore the complete platform risk-free. No credit card required to start.
              </p>
              <ul className="relative space-y-2 my-4">
                {[
                  "No credit card required",
                  "Full platform access from day one",
                  "Add and search records freely",
                  "Cancel anytime, no penalties",
                ].map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FCD34D] to-[#F8C734] hover:from-[#F8C734] hover:to-[#EAB308] text-[#1E3A8A] font-bold px-5 py-2.5 rounded-lg text-sm shadow-md hover:shadow-lg transition-all mt-2"
              >
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="relative mt-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] bg-yellow-100 px-3 py-1.5 rounded-full border border-yellow-200">
                  <LemonSimple className="w-3 h-3 text-[#F8C734]" /> Zero Risk
                </span>
              </div>
            </motion.div>

            {/* Card 9 — Secure cloud */}
            <motion.div
              variants={cardItem}
              className="relative bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl hover:border-[#F8C734] transition-all duration-300 group overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FCD34D] to-[#F8C734] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <LemonSlice
                className="absolute -bottom-4 -left-4 w-20 h-20 pointer-events-none"
                opacity={0.05}
              />
              <div className="relative bg-yellow-50 rounded-full p-4 w-16 h-16 inline-flex items-center justify-center mb-6">
                <Lock className="text-[#F8C734] w-8 h-8" />
              </div>
              <h3 className="relative text-xl font-bold text-[#1E3A8A] mb-3">
                Secure Cloud Platform
              </h3>
              <p className="relative text-gray-600 leading-relaxed">
                Built on modern infrastructure with enterprise-grade security protecting every
                record and transaction.
              </p>
              <div className="relative grid grid-cols-2 gap-2 my-4">
                {["Secure Auth", "Subscription Control", "Ownership Rules", "Encrypted Payments"].map(
                  (t) => (
                    <span
                      key={t}
                      className="flex items-center gap-1.5 text-xs text-gray-700 bg-gray-50 rounded px-2 py-1.5 border border-gray-200"
                    >
                      <Shield className="text-[#F8C734] w-3 h-3" /> {t}
                    </span>
                  ),
                )}
              </div>
              <div className="relative mt-auto pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200">
                  <LemonSimple className="w-3 h-3 text-[#F8C734]" /> Enterprise Security
                </span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ================= SECTION 5: FEATURE SPOTLIGHT ================= */}
        <section className="section-container py-20 lg:py-32">
          <motion.div {...fadeUp} className="bg-gray-50 rounded-2xl p-8 md:p-12 lg:p-16">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-4">
                <LemonSimple className="w-6 h-6 text-[#F8C734]" />
                <span className="text-sm font-semibold text-[#1E3A8A] uppercase tracking-wide">
                  Featured Capability
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">
                The Ownership Protection Model — Explained
              </h2>
              <p className="text-lg text-gray-600">
                Shared visibility, individual control — built into the platform.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#1E3A8A] mb-6">
                  You See Everything. You Control Only Yours.
                </h3>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    LemonGard is built on a unique principle: shared visibility with
                    individual ownership. Every subscriber can browse and search the entire
                    database — but editing and deleting are restricted to records you
                    personally created.
                  </p>
                  <p>
                    This creates a fair, accountable ecosystem where every contributor can
                    trust that their data remains protected while still benefiting from the
                    collective intelligence of the network.
                  </p>
                </div>

                <div className="space-y-4 mt-8">
                  {[
                    { icon: Eye, title: "View All Records", desc: "Search and browse every record in the database" },
                    { icon: PenLine, title: "Edit Only Yours", desc: "Modify or update records you personally added" },
                    { icon: Trash2, title: "Delete Only Yours", desc: "Remove records you created at any time" },
                    { icon: Shield, title: "Others Protected", desc: "Other users' records are always read-only for you" },
                  ].map((it) => {
                    const Icon = it.icon;
                    return (
                      <div key={it.title} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center flex-shrink-0">
                          <Icon className="text-[#F8C734] w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-[#1E3A8A] text-base flex items-center gap-2">
                            {it.title}
                            <LemonSimple className="w-3 h-3 text-[#F8C734]" opacity={0.6} />
                          </div>
                          <div className="text-sm text-gray-600 mt-0.5">{it.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right - mockup */}
              <div className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                <LemonSlice
                  className="absolute -top-6 -right-6 w-32 h-32 pointer-events-none"
                  opacity={0.1}
                />
                <LemonSlice
                  className="absolute -bottom-6 -left-6 w-24 h-24 pointer-events-none"
                  opacity={0.1}
                />
                <div className="relative">
                  <div className="flex gap-1.5 mb-6">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="text-white font-semibold mb-4">Database Records</div>
                  <div className="space-y-3">
                    <div className="bg-yellow-400/20 border border-yellow-400/40 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <LemonSimple className="w-4 h-4 text-[#F8C734]" />
                          <span className="text-white text-sm font-medium">
                            John Smith — Plumbing
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button className="bg-[#F8C734] text-[#1E3A8A] px-3 py-1 rounded text-xs font-bold">
                            Edit
                          </button>
                          <button className="bg-[#F8C734] text-[#1E3A8A] px-2 py-1 rounded text-xs font-bold">
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="text-[#F8C734] text-xs mt-1.5">Your Record</div>
                    </div>
                    {[
                      ["Sarah Johnson — HVAC"],
                      ["Mike Davis — Electrical"],
                    ].map(([n]) => (
                      <div
                        key={n}
                        className="bg-white/10 rounded-lg p-3 flex justify-between items-center"
                      >
                        <span className="text-gray-300 text-sm">{n}</span>
                        <span className="bg-gray-600 text-gray-300 px-3 py-1 rounded text-xs">
                          View Only
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-4 text-xs flex-wrap">
                    <span className="flex items-center gap-1.5 text-gray-300">
                      <span className="w-3 h-3 rounded-full bg-[#F8C734]" /> Your Records
                      (Editable)
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-300">
                      <span className="w-3 h-3 rounded-full bg-gray-500" /> Others' Records
                      (Read-Only)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ================= SECTION 6: HOW IT WORKS (5 STEPS) ================= */}
        <section className="section-container py-20 lg:py-32">
          <motion.div {...fadeUp} className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-4">
              <LemonSimple className="w-6 h-6 text-[#F8C734]" />
              <span className="text-sm font-semibold text-[#1E3A8A] uppercase tracking-wide">
                How It Works
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">
              From Sign Up to Growing Your Business in 5 Steps
            </h2>
            <p className="text-lg text-gray-600">A simple workflow built around you.</p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-0 right-0 border-t-2 border-dashed border-[#F8C734]/40 z-0 mx-32" />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.title}
                    initial={{ scale: 0, rotate: -90, opacity: 0 }}
                    whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 15,
                      delay: i * 0.12,
                    }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 rounded-full mb-6 bg-gradient-to-br from-[#FCD34D] to-[#F8C734] flex items-center justify-center shadow-lg shadow-yellow-400/30 text-2xl font-bold text-[#1E3A8A] border-4 border-white">
                      {i + 1}
                    </div>
                    <Icon className="w-10 h-10 text-[#F8C734] mb-4" />
                    <LemonSimple className="w-4 h-4 text-[#F8C734] mb-3" />
                    <h3 className="text-lg font-bold text-[#1E3A8A] mb-2">{s.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.description}</p>
                    <span
                      className={`mt-3 px-3 py-1 rounded-full text-xs border ${s.badge.color}`}
                    >
                      {s.badge.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            {...fadeUp}
            className="mt-16 max-w-3xl mx-auto bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6"
          >
            <LemonWhole className="w-20 h-20 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">A workflow built around you</h3>
              <p className="text-gray-600 leading-relaxed">
                This unique five-step process gives you the power of a shared professional
                network while ensuring your individual data contributions remain protected and
                yours alone.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ================= SECTION 7: WHY DIFFERENT ================= */}
        <section className="section-container py-20 lg:py-32">
          <motion.div {...fadeUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <LemonSimple className="w-6 h-6 text-[#F8C734]" />
              <span className="text-sm font-semibold text-[#1E3A8A] uppercase tracking-wide">
                The LemonGard Difference
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">
              Most platforms keep your data isolated. We share the value.
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-stretch">
            {/* Most Platforms */}
            <motion.div
              {...fadeUp}
              className="bg-gray-50 border-2 border-gray-300 rounded-2xl p-10 flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-700">Most Client Data Platforms</h3>
              </div>
              <ul className="space-y-5">
                {[
                  ["Private Data Silos", "Your records locked away — no shared value for anyone"],
                  ["Isolated Client Records", "No visibility beyond your own individual submissions"],
                  ["Limited Shared Intelligence", "Missing the collective knowledge of your industry"],
                  ["Static Platform Value", "The platform only grows with YOUR individual data"],
                  ["No Accountability Model", "No clear ownership rules for who can modify what"],
                ].map(([t, d]) => (
                  <li key={t} className="flex items-start gap-4">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-700">{t}</div>
                      <div className="text-sm text-gray-500 mt-0.5">{d}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6 border-t border-gray-300">
                <p className="text-sm text-gray-500 italic">
                  This is how most tools work — keeping everyone's data separate and isolated.
                </p>
              </div>
            </motion.div>

            {/* LemonGard */}
            <motion.div
              {...fadeUp}
              className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] rounded-2xl p-10 text-white flex flex-col h-full relative overflow-hidden"
            >
              <LemonSlice
                className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                opacity={0.1}
              />
              <LemonHalf
                className="absolute bottom-0 left-0 w-24 h-24 pointer-events-none"
                opacity={0.1}
              />
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="w-12 h-12 rounded-full bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-[#F8C734]" />
                </div>
                <h3 className="text-xl font-bold text-white">LemonGard Platform</h3>
              </div>
              <ul className="space-y-5 relative z-10">
                {[
                  ["Shared Visibility Model", "Every subscriber benefits from the collective database"],
                  ["Growing Collaborative Database", "More subscribers = more records = more value for all"],
                  ["Ownership-Protected Records", "View all records. Edit and delete only yours. Fair and clear."],
                  ["Network Effect Value", "The platform becomes more powerful as the community grows"],
                  ["Built-In Accountability", "Clear ownership rules ensure trust and data integrity"],
                ].map(([t, d]) => (
                  <li key={t} className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-[#F8C734] flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-semibold text-white flex items-center gap-2">
                        {t}
                        <LemonSimple className="w-3 h-3 text-[#F8C734]" opacity={0.6} />
                      </div>
                      <div className="text-sm text-gray-300 mt-0.5">{d}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6 border-t border-white/20 relative z-10">
                <p className="text-sm text-gray-400 italic">
                  This is the LemonGard model — shared intelligence with individual ownership
                  protection.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            {...fadeUp}
            className="mt-12 max-w-3xl mx-auto bg-gradient-to-r from-[#FCD34D] to-[#F8C734] rounded-2xl p-8 text-center relative overflow-hidden"
          >
            <LemonHalf
              className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
              opacity={0.1}
            />
            <LemonSimple className="w-12 h-12 text-[#1E3A8A] mx-auto mb-4 relative z-10" />
            <h3 className="text-xl font-bold text-[#1E3A8A] mb-2 relative z-10">
              The Result: A Smarter Service Data Network
            </h3>
            <p className="text-[#1E40AF] leading-relaxed max-w-2xl mx-auto relative z-10">
              A constantly growing, shared client data network where every subscriber both
              contributes value and benefits from the contributions of others — with full
              ownership protection built in.
            </p>
          </motion.div>
        </section>

        {/* ================= SECTION 8: COMPARISON TABLE ================= */}
        <section className="section-container py-20 lg:py-32">
          <motion.div {...fadeUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <LemonSimple className="w-6 h-6 text-[#F8C734]" />
              <span className="text-sm font-semibold text-[#1E3A8A] uppercase tracking-wide">
                Compare Plans
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">
              Pick the access level that fits your workflow
            </h2>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1E3A8A] to-[#1E40AF] grid grid-cols-3">
              <div className="p-6 text-left">
                <LemonWhole className="w-8 h-8 mb-2" />
                <div className="font-semibold text-white text-lg">Features</div>
              </div>
              <div className="p-6 text-center">
                <Eye className="w-8 h-8 text-[#F8C734] mx-auto mb-2" />
                <div className="font-bold text-white text-xl">View Only</div>
                <div className="text-[#F8C734] font-semibold mt-1">$14.99/month</div>
              </div>
              <div className="p-6 text-center bg-[#F8C734]/15">
                <Zap className="w-8 h-8 text-[#F8C734] mx-auto mb-2" />
                <div className="font-bold text-white text-xl">Full Access</div>
                <div className="text-[#F8C734] font-semibold mt-1">$19.99/month</div>
                <span className="bg-[#F8C734] text-[#1E3A8A] px-3 py-1 rounded-full text-xs font-bold mt-2 inline-block">
                  Most Popular
                </span>
              </div>
            </div>

            {tableGroups.map((g) => (
              <div key={g.label}>
                <div className="bg-yellow-50 p-3 border-b border-yellow-100 flex items-center gap-2">
                  <LemonSimple className="w-4 h-4 text-[#F8C734]" />
                  <span className="font-semibold text-[#1E3A8A] text-sm">{g.label}</span>
                </div>
                {g.rows.map(([feature, a, b], idx) => (
                  <div
                    key={feature as string}
                    className={`grid grid-cols-3 border-b border-gray-200 hover:bg-gray-50 transition ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    }`}
                  >
                    <div className="p-4 text-gray-700 font-medium text-sm">{feature}</div>
                    <div className="p-4 text-center">
                      {a ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto" />
                      ) : (
                        <Minus className="w-5 h-5 text-gray-300 mx-auto" />
                      )}
                    </div>
                    <div className="p-4 text-center">
                      {b ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto" />
                      ) : (
                        <Minus className="w-5 h-5 text-gray-300 mx-auto" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {/* Footer */}
            <div className="bg-gray-50 grid grid-cols-1 md:grid-cols-3 p-6 border-t-2 border-gray-200 gap-4">
              <div className="flex items-center gap-2">
                <LemonWhole className="w-8 h-8" />
                <span className="text-sm text-gray-600">Start with 30 days free</span>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-[#1E3A8A] mb-3">$14.99/month</div>
                <Link
                  href="/register"
                  className="border-2 border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white font-semibold px-5 py-2 rounded-lg transition-all duration-300 inline-flex items-center gap-2 text-sm"
                >
                  Start Free Trial
                </Link>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-[#1E3A8A] mb-3">$19.99/month</div>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-[#FCD34D] to-[#F8C734] hover:from-[#F8C734] hover:to-[#EAB308] text-[#1E3A8A] font-bold px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2 text-sm"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ================= SECTION 9: SECURITY & TRUST ================= */}
        <section className="section-container py-20 lg:py-32">
          <motion.div {...fadeUp} className="bg-gray-50 rounded-2xl p-8 md:p-12 lg:p-16">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-4">
                <LemonSimple className="w-6 h-6 text-[#F8C734]" />
                <span className="text-sm font-semibold text-[#1E3A8A] uppercase tracking-wide">
                  Security & Trust
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">
                Enterprise-grade infrastructure
              </h2>
              <p className="text-lg text-gray-600">
                Protecting every record, every transaction, every user.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: ShieldCheck,
                  title: "Ownership Enforcement",
                  desc: "Only the subscriber who created a record can edit or delete it. No exceptions, no overrides.",
                },
                {
                  icon: Users,
                  title: "Role-Based Permissions",
                  desc: "Separate Admin and Subscriber areas each with distinct, clearly defined access controls.",
                },
                {
                  icon: CreditCard,
                  title: "Subscription Enforcement",
                  desc: "Platform access is automatically managed based on active subscription status in real time.",
                },
                {
                  icon: Lock,
                  title: "Secure Payments (Stripe)",
                  desc: "Industry-standard Stripe-powered recurring billing with end-to-end encryption.",
                },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="relative bg-white border border-gray-200 rounded-xl p-8 text-center hover:shadow-xl hover:border-[#F8C734] transition-all duration-300 overflow-hidden"
                  >
                    <LemonSlice
                      className="absolute -top-4 -right-4 w-20 h-20 pointer-events-none"
                      opacity={0.05}
                    />
                    <div className="relative bg-yellow-50 rounded-full p-4 w-16 h-16 inline-flex items-center justify-center mb-4 mx-auto">
                      <Icon className="text-[#F8C734] w-8 h-8" />
                      <LemonSimple className="absolute -bottom-1 -right-1 w-4 h-4 text-[#F8C734]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1E3A8A] mb-3 relative">{c.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed relative">{c.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Trust badges */}
            <div className="mt-12 pt-12 border-t border-gray-200 flex justify-center items-center gap-6 md:gap-10 flex-wrap">
              {[
                { icon: Lock, label: "256-bit SSL", sub: "Encryption" },
                { icon: Shield, label: "GDPR Compliant", sub: "Data Protection" },
                { icon: Database, label: "Daily Backups", sub: "Data Safety" },
                { icon: Server, label: "99.9% Uptime", sub: "Reliability" },
                { icon: CreditCard, label: "Stripe Secured", sub: "Payments" },
              ].map((b, i, arr) => {
                const Icon = b.icon;
                return (
                  <div key={b.label} className="flex items-center gap-4">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center">
                        <Icon className="text-[#F8C734] w-6 h-6" />
                      </div>
                      <div className="text-sm font-medium text-[#1E3A8A]">{b.label}</div>
                      <div className="text-xs text-gray-500">{b.sub}</div>
                    </div>
                    {i < arr.length - 1 && (
                      <LemonSimple className="hidden md:block w-3 h-3 text-[#F8C734]" opacity={0.3} />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* ================= SECTION 10: TESTIMONIALS ================= */}
        <section className="section-container py-20 lg:py-32">
          <motion.div {...fadeUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <LemonSimple className="w-6 h-6 text-[#F8C734]" />
              <span className="text-sm font-semibold text-[#1E3A8A] uppercase tracking-wide">
                Trusted by Professionals
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A]">
              What our subscribers say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "The shared database concept is brilliant. I can see what other professionals in my industry are tracking — it saves hours of work every week.",
                initials: "JS",
                name: "James S.",
                role: "Service Contractor",
              },
              {
                quote:
                  "Finally a platform that respects data ownership. I add my records and know no one else can change them. That matters a lot in my business.",
                initials: "ML",
                name: "Maria L.",
                role: "HVAC Professional",
              },
              {
                quote:
                  "The 30-day trial was enough to convince me. The search is incredibly fast and the shared data is genuinely valuable.",
                initials: "RK",
                name: "Robert K.",
                role: "Independent Contractor",
              },
            ].map((t) => (
              <motion.div
                key={t.name}
                {...fadeUp}
                className="relative bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <LemonSlice
                  className="absolute -top-4 -right-4 w-24 h-24 pointer-events-none"
                  opacity={0.05}
                />
                <Quote className="text-[#F8C734] w-8 h-8 mb-4 relative" />
                <p className="text-gray-700 leading-relaxed relative">"{t.quote}"</p>
                <div className="flex gap-1 mt-4 mb-4 relative">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="text-[#F8C734] w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="flex items-center gap-3 relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FCD34D] to-[#F8C734] flex items-center justify-center font-bold text-[#1E3A8A] text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-[#1E3A8A] text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
                <LemonSimple
                  className="absolute bottom-3 right-3 w-4 h-4 text-[#F8C734]"
                  opacity={0.2}
                />
              </motion.div>
            ))}
          </div>

          {/* Stats strip */}
          <motion.div
            {...fadeUp}
            className="mt-12 bg-yellow-50 rounded-xl p-6 flex justify-center items-center gap-8 md:gap-12 flex-wrap"
          >
            {[
              ["500+", "Active Users"],
              ["50K+", "Records in Database"],
              ["4.9/5", "Average Rating"],
              ["99.9%", "Uptime"],
            ].map(([n, l], i, arr) => (
              <div key={l} className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-[#1E3A8A]">{n}</span>
                  <span className="text-sm text-gray-600">{l}</span>
                </div>
                {i < arr.length - 1 && (
                  <LemonSimple className="hidden md:block w-3 h-3 text-[#F8C734]" opacity={0.5} />
                )}
              </div>
            ))}
          </motion.div>
        </section>

        {/* ================= SECTION 11: FINAL CTA ================= */}
        <section className="section-container py-20 lg:py-32">
          <motion.div
            {...fadeUp}
            className="bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-[#0F172A] rounded-2xl p-10 md:p-16 lg:p-20 relative overflow-hidden text-center"
          >
            <LemonSlice
              className="absolute top-0 left-0 w-56 h-56 -mt-16 -ml-16 pointer-events-none"
              opacity={0.08}
            />
            <LemonSlice
              className="absolute bottom-0 right-0 w-72 h-72 -mb-20 -mr-20 pointer-events-none"
              opacity={0.1}
            />
            <LemonWhole
              className="absolute top-1/2 right-12 w-40 h-40 -translate-y-1/2 pointer-events-none hidden md:block"
              opacity={0.05}
            />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-2.5 rounded-full text-sm font-medium mb-8">
                <LemonSimple className="text-[#F8C734] w-4 h-4" />
                <span>Ready to Start?</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to Access the
                <br />
                <span className="text-[#F8C734]">LemonGard Network?</span>
              </h2>

              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
                Start your 30-day free trial and explore the power of shared client data
                tracking. No credit card required. Full access from day one.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center mb-10">
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-[#FCD34D] to-[#F8C734] hover:from-[#F8C734] hover:to-[#EAB308] text-[#1E3A8A] font-bold px-10 py-5 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
                >
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/pricing" className={whiteOutlineBtn}>
                  <Tag className="w-5 h-5" /> View Pricing
                </Link>
              </div>

              <div className="flex items-center justify-center gap-3 flex-wrap text-sm text-gray-400">
                {[
                  "30 days free",
                  "No credit card required",
                  "Full access immediately",
                  "Cancel anytime",
                ].map((t, i, arr) => (
                  <div key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" /> {t}
                    {i < arr.length - 1 && (
                      <LemonSimple className="w-3 h-3 ml-1 text-[#F8C734]" opacity={0.4} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      </PublicLayout>

  );
};

export default Features;
