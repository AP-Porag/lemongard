import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LemonSimple } from "../LemonIcon";

const faqs = [
  { q: "How does the 30-day free trial work?", a: "Your free trial gives you full access for 30 days—no credit card required. You can explore all features, add data, and search the shared database. After 30 days, you’ll need to choose a subscription plan to continue using the service." },
  { q: "What's the difference between View Only and Full Access?", a: "View Only ($14.99/month) lets you search and view all records in the shared database—ideal for research and analysis.                              Full Access ($19.99/month) includes everything in View Only, plus the ability to add, edit, and delete your own records—ideal for active professionals who want to contribute to the database." },
  { q: "Can I upgrade or downgrade my plan?", a: "Yes. You can upgrade from View Only to Full Access at any time. If you downgrade, the change will take effect at the end of your current billing period. You can manage all plan changes in your account settings." },
  { q: "What happens to my data if I downgrade from Full Access to View Only?", a: "Your data remains in the system and is still viewable by you and other subscribers. However, you won’t be able to edit or delete it unless you upgrade back to Full Access. Your data ownership is always preserved" },
  { q: "Do you offer annual billing?", a: "Yes, we offer annual billing at $199 per year. Subscriptions are billed once annually and may be cancelled after the 12-month period ends. Please note that no refunds are provided for early cancellation of annual plans. Monthly billing is also available for added flexibility." },
  { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards, including Visa, Mastercard, American Express, and Discover, with secure payment processing through Stripe. At this time, we do not accept PayPal or other payment methods." },
  { q: "Can I cancel anytime?", a: "Yes. You can cancel your subscription at any time from your account settings with 30 days’ notice, as outlined in our terms. Your access will continue until the end of your paid period, and you can export your data within 30 days of cancellation. Please note that no refunds are provided for 12-month subscriptions." },
  { q: "What happens after my trial ends?", a: "We’ll send reminder emails on Day 21 and Day 28 of your trial. On Day 30, if no plan has been selected, your access will be paused. Simply choose a plan at any time to continue." },
  { q: "Can I get a refund?", a: "All payments are non-refundable. We do not offer refunds for any subscription fees, including monthly or annual plans." },
];

const PricingFAQ = () => (
  <section className="py-16 lg:py-24">
    <div className="bg-secondary/50 p-8 lg:p-16">
     <div className="section-container">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-600 uppercase tracking-wide mb-4">
          <LemonSimple className="w-5 h-5 text-yellow-500" /> Pricing FAQ
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-navy-600 mb-4">Common Questions</h2>
        <p className="text-lg text-muted-foreground">Everything you need to know about our pricing</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl px-6 border border-border">
              <AccordionTrigger className="text-left text-navy-600 font-bold hover:text-yellow-500 py-5">
                <span className="flex items-center gap-3">
                  <LemonSimple className="w-4 h-4 text-yellow-500 shrink-0" />
                  {f.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
      </motion.div>
      </div>
    </div>
  </section>
);

export default PricingFAQ;
