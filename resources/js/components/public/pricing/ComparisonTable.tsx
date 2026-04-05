import { CheckCircle2, XCircle, Eye, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { LemonSimple } from "../LemonIcon";

interface Row { feature: string; view: boolean; full: boolean }

const sections: { title: string; rows: Row[] }[] = [
  {
    title: "Database Access",
    rows: [
      { feature: "Access Shared Database", view: true, full: true },
      { feature: "Search All Fields", view: true, full: true },
      { feature: "Advanced Filtering", view: true, full: true },
      { feature: "View All Records", view: true, full: true },
      { feature: "Export Data", view: true, full: true },
    ],
  },
  {
    title: "Data Management",
    rows: [
      { feature: "Add New Records", view: false, full: true },
      { feature: "Edit Own Records", view: false, full: true },
      { feature: "Delete Own Records", view: false, full: true },
      { feature: "Data Ownership Control", view: false, full: true },
    ],
  },
  {
    title: "Features & Support",
    rows: [
      { feature: "Mobile Access", view: true, full: true },
      { feature: "Email Support", view: true, full: true },
      { feature: "Priority Support", view: false, full: true },
      { feature: "Early Access to Features", view: false, full: true },
    ],
  },
  {
    title: "Trial & Billing",
    rows: [
      { feature: "30-Day Free Trial", view: true, full: true },
      { feature: "Monthly Billing", view: true, full: true },
      { feature: "Cancel Anytime", view: true, full: true },
    ],
  },
];

const Check = () => <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />;
const Cross = () => <XCircle className="w-5 h-5 text-gray-400 mx-auto" />;

const ComparisonTable = () => (
  <section className="section-container py-16 lg:py-24">
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-600 uppercase tracking-wide mb-4">
        <LemonSimple className="w-5 h-5 text-yellow-500" /> Detailed Comparison
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-navy-600 mb-4">See What's Included</h2>
      <p className="text-lg text-muted-foreground">Compare plans side by side</p>
    </motion.div>

    {/* Desktop table */}
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="hidden md:block max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-card">
              <th className="text-left p-4 font-semibold text-navy-600 w-1/2">Features</th>
              <th className="text-center p-4 w-1/4">
                <span className="flex items-center justify-center gap-2 font-semibold text-navy-600">
                  <Eye className="w-5 h-5" /> View Only
                </span>
                <span className="text-muted-foreground text-xs">$14.99/mo</span>
              </th>
              <th className="text-center p-4 w-1/4 bg-yellow-50">
                <span className="flex items-center justify-center gap-2 font-semibold text-navy-600">
                  <Zap className="w-5 h-5 text-yellow-500" /> Full Access
                </span>
                <span className="text-yellow-600 text-xs font-medium">$19.99/mo</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sections.map((s) => (
              <>
                <tr key={s.title}>
                  <td colSpan={3} className="bg-secondary/50 px-4 py-2 font-semibold text-navy-600 text-xs uppercase tracking-wide">{s.title}</td>
                </tr>
                {s.rows.map((r, i) => (
                  <tr key={r.feature} className={i % 2 === 0 ? "bg-card" : "bg-secondary/30"}>
                    <td className="p-4 text-muted-foreground">{r.feature}</td>
                    <td className="p-4">{r.view ? <Check /> : <Cross />}</td>
                    <td className="p-4 bg-yellow-50/50">{r.full ? <Check /> : <Cross />}</td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>

    {/* Mobile cards */}
    <div className="md:hidden space-y-6 max-w-sm mx-auto">
      {sections.map((s) => (
        <div key={s.title} className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-semibold text-navy-600 mb-3 text-sm uppercase tracking-wide">{s.title}</h3>
          <ul className="space-y-3">
            {s.rows.map((r) => (
              <li key={r.feature} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{r.feature}</span>
                <span className="flex gap-3 shrink-0 ml-2">
                  {r.view ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-gray-400" />}
                  {r.full ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-gray-400" />}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default ComparisonTable;
