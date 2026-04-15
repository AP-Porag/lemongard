import { motion } from "framer-motion";
import { CheckCircle2, Database, Upload, Search, Briefcase, BarChart, Download, AlertCircle, Shield, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LemonSimple, LemonHalf, LemonWhole } from "@/components/LemonIcon";

/**
 * Detailed Walkthrough Section
 * Tabbed interface with in-depth explanations of each phase
 */
const DetailedWalkthrough = () => {
  return (
    <section className="section-container section-padding">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <LemonSimple className="w-6 h-6 text-yellow-500" />
          <span className="text-sm font-medium text-yellow-600 uppercase tracking-wide">Detailed Walkthrough</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-navy-600">Every Step, Explained</h2>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          Let's dive deeper into each phase of your LemonGard experience
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Tabs defaultValue="getting-started" className="w-full">
          <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent h-auto mb-10">
            {[
              { value: "getting-started", label: "Getting Started" },
              { value: "free-trial", label: "Your Free Trial" },
              { value: "adding-data", label: "Adding Your Data" },
              { value: "subscription", label: "Subscription & Billing" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="px-6 py-3 rounded-lg text-sm font-medium data-[state=active]:bg-yellow-50 data-[state=active]:text-yellow-800 data-[state=active]:border data-[state=active]:border-yellow-200 data-[state=active]:shadow-sm border border-transparent hover:bg-gray-50 transition-all"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab 1: Getting Started */}
          <TabsContent value="getting-started">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              <div className="lg:col-span-3 space-y-6">
                <h3 className="text-2xl font-bold text-navy-600">Creating Your Account</h3>

                <div className="space-y-6">
                  {[
                    { step: "1", title: "Visit Registration Page", details: ["Click \"Start Free Trial\" anywhere on site", "No credit card required upfront"] },
                    { step: "2", title: "Fill Basic Information", details: ["Business name and type", "Your name and email", "Create secure password"] },
                    { step: "3", title: "Verify Email", details: ["Check inbox for verification link", "Click to activate account", "Instant platform access"] },
                    { step: "4", title: "Complete Profile (Optional)", details: ["Add business details", "Upload logo", "Set preferences"] },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-sm font-bold text-yellow-700">{item.step}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-navy-600">{item.title}</h4>
                        <ul className="mt-2 space-y-1">
                          {item.details.map((d) => (
                            <li key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <LemonSimple className="w-3 h-3 text-yellow-400" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-lg text-sm font-medium text-yellow-800">
                  <Clock className="w-4 h-4" />
                  Estimated time: 2-3 minutes
                </div>

                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <LemonSimple className="w-3 h-3 text-yellow-400" />
                  Need help? Our support team is available 24/7
                </p>
              </div>

              {/* Visual mockup */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-navy-600 to-navy-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                  <LemonHalf className="absolute top-3 right-3 w-12 h-12" opacity={0.15} />
                  <div className="flex gap-1.5 mb-5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="h-3 bg-white/20 rounded w-24 mb-2" />
                      <div className="h-8 bg-white/10 rounded w-full" />
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="h-3 bg-white/20 rounded w-20 mb-2" />
                      <div className="h-8 bg-white/10 rounded w-full" />
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="h-3 bg-white/20 rounded w-16 mb-2" />
                      <div className="h-8 bg-white/10 rounded w-full" />
                    </div>
                    <div className="h-10 bg-gradient-to-r from-chart-4 to-chart-5 rounded-lg flex items-center justify-center">
                      <span className="text-navy-900 text-sm font-semibold">Create Account</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 2: Free Trial */}
          <TabsContent value="free-trial">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              <div className="lg:col-span-3 space-y-6">
                <h3 className="text-2xl font-semibold text-navy-600">Making the Most of 30 Days</h3>

                <div className="space-y-1">
                  {[
                    "Full platform access",
                    "Search unlimited records",
                    "Add your own data",
                    "Use all CRM features",
                    "Export capabilities",
                    "Priority support",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 py-2">
                      <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0" />
                      <LemonSimple className="w-3 h-3 text-yellow-400 shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Trial Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {[
                    { icon: Database, name: "Shared Database Access", desc: "View and search all records" },
                    { icon: Upload, name: "Data Contribution", desc: "Add your own records" },
                    { icon: Search, name: "Advanced Search", desc: "Filter by any field" },
                    { icon: Briefcase, name: "CRM Tools", desc: "Manage client relationships" },
                    { icon: BarChart, name: "Reports & Analytics", desc: "Generate insights" },
                    { icon: Download, name: "Data Export", desc: "Export your records anytime" },
                  ].map((f) => (
                    <div key={f.name} className="flex gap-3 p-3 rounded-lg border border-gray-100 hover:border-yellow-200 transition-colors">
                      <div className="icon-circle !p-2.5 shrink-0">
                        <f.icon className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-navy-600">{f.name}</h4>
                        <p className="text-xs text-muted-foreground">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trial reminder */}
                <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-xl flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Trial Reminders</p>
                    <p className="text-sm text-yellow-700 mt-1">
                      We'll send reminders at Day 21 and Day 28 so you're never surprised.
                    </p>
                  </div>
                  <LemonSimple className="w-4 h-4 text-yellow-400 shrink-0" />
                </div>
              </div>

              {/* Visual */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-navy-600 to-navy-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                  <div className="flex gap-1.5 mb-5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 mb-4">
                    <div className="text-white/70 text-xs mb-2">Trial Remaining</div>
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-bold text-yellow-400">30</span>
                      <span className="text-white/60 text-sm mb-1">days</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 mt-3">
                      <div className="bg-yellow-400 h-2 rounded-full w-full" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {["Records", "Searches", "Exports", "Reports"].map((label) => (
                      <div key={label} className="bg-white/10 rounded-lg p-3 text-center">
                        <div className="text-lg font-bold text-white">∞</div>
                        <div className="text-white/60 text-xs">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 3: Adding Data */}
          <TabsContent value="adding-data">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              <div className="lg:col-span-3 space-y-6">
                <h3 className="text-2xl font-semibold text-navy-600">Contributing to the Shared Database</h3>

                {/* Data ownership card */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-800 flex items-center gap-2">
                      Your Data, Your Control
                      <LemonSimple className="w-3 h-3 text-yellow-500" />
                    </h4>
                    <p className="text-sm text-blue-700 mt-1">
                      You can view all records, but you can only edit or delete records you personally created.
                    </p>
                  </div>
                </div>

                {/* How to add data steps */}
                <div>
                  <h4 className="font-semibold text-navy-600 mb-3">How to Add Data</h4>
                  <ol className="space-y-3">
                    {[
                      "Navigate to \"Add Record\"",
                      "Fill in required fields",
                      "Add optional details",
                      "Submit to database",
                      "Instantly searchable by all users",
                    ].map((step, i) => (
                      <li key={step} className="flex items-center gap-3 text-sm text-gray-700">
                        <span className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center text-xs font-bold text-yellow-700 shrink-0">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Best practices */}
                <div>
                  <h4 className="font-semibold text-navy-600 mb-3">Best Practices</h4>
                  <ul className="space-y-2">
                    {[
                      "Complete all fields for better searchability",
                      "Use consistent formatting",
                      "Add relevant tags",
                      "Update records regularly",
                      "Respect data privacy guidelines",
                    ].map((tip) => (
                      <li key={tip} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-yellow-500 shrink-0" />
                        <LemonSimple className="w-3 h-3 text-yellow-400 shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Visual */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-navy-600 to-navy-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                  <LemonWhole className="absolute bottom-3 right-3 w-10 h-10" opacity={0.12} />
                  <div className="flex gap-1.5 mb-5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="space-y-3">
                    {["Client Name", "Business", "Service Type", "Tags"].map((field) => (
                      <div key={field} className="bg-white/10 rounded-lg p-3">
                        <div className="h-2.5 bg-white/20 rounded w-20 mb-2" />
                        <div className="h-7 bg-white/10 rounded w-full" />
                      </div>
                    ))}
                    <div className="h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center">
                      <span className="text-navy-900 text-sm font-semibold">Add Record</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 4: Subscription */}
          <TabsContent value="subscription">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              <div className="lg:col-span-3 space-y-6">
                <h3 className="text-2xl font-semibold text-navy-600">Continuing After Your Trial</h3>

                {/* Timeline */}
                <div className="space-y-3">
                  {[
                    { day: "Day 21", text: "First reminder email", icon: LemonSimple },
                    { day: "Day 28", text: "Final reminder email", icon: LemonSimple },
                    { day: "Day 30", text: "Trial ends", icon: AlertCircle },
                  ].map((item) => (
                    <div key={item.day} className="flex items-center gap-3 text-sm">
                      <span className="font-semibold text-navy-600 w-16">{item.day}</span>
                      <div className="w-2 h-2 rounded-full bg-yellow-400" />
                      <span className="text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Two options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border-2 border-yellow-400 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-yellow-500" />
                      <h4 className="font-semibold text-navy-600">Subscribe to Continue</h4>
                    </div>
                    <ul className="space-y-1.5 text-sm text-gray-600">
                      <li>• Keep all your data</li>
                      <li>• Maintain full access</li>
                      <li>• Simple monthly billing</li>
                    </ul>
                    <button className="btn-primary !px-5 !py-2.5 !text-sm mt-4 w-full justify-center">
                      View Pricing Plans
                    </button>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-gray-400" />
                      <h4 className="font-semibold text-navy-600">Let Trial Expire</h4>
                    </div>
                    <ul className="space-y-1.5 text-sm text-gray-600">
                      <li>• Access ends immediately</li>
                      <li>• Data kept for 90 days</li>
                      <li>• Re-subscribe anytime</li>
                      <li>• No penalties or fees</li>
                    </ul>
                  </div>
                </div>

                {/* Billing details */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-navy-600">Billing Details</h4>
                  <ul className="space-y-1.5 text-sm text-gray-700">
                    {[
                      "Monthly: $49/month",
                      "Annual: $490/year (Save 16%)",
                      "Automatic renewal",
                      "Cancel anytime",
                      "No long-term contracts",
                      "Secure payment via Stripe",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <LemonSimple className="w-3 h-3 text-yellow-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cancellation */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <p className="text-sm font-medium text-navy-600">Cancellation Policy</p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>• Cancel anytime, no questions asked</li>
                    <li>• Access until end of billing period</li>
                    <li>• Data export available for 30 days</li>
                  </ul>
                </div>
              </div>

              {/* Visual */}
              <div className="lg:col-span-2">
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-xl relative">
                  <LemonHalf className="absolute top-3 right-3 w-14 h-14" opacity={0.15} />
                  <span className="bg-navy-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium">Professional Plan</span>
                  <div className="mt-5">
                    <span className="text-4xl font-bold text-navy-600">$49</span>
                    <span className="text-lg text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-yellow-600 font-medium mt-1">or $490/year (Save 16%)</p>
                  <ul className="mt-5 space-y-2.5">
                    {["Unlimited record access", "Full CRM features", "Advanced search & filters", "Data export tools", "API access"].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-yellow-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className="btn-primary w-full justify-center mt-6">Start Free Trial</button>
                  <p className="text-xs text-center text-muted-foreground mt-3">30 days free • No credit card required</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </section>
  );
};

export default DetailedWalkthrough;
