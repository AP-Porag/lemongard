import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LemonSimple } from "../LemonIcon";

const faqs = [
  { q: "How does the 30-day free trial work?", a: "Your free trial gives you full access to the platform for 30 days with no credit card required. You can test all features, add data, and explore the shared database. After 30 days, you'll need to choose a subscription plan to continue accessing the platform." },
  { q: "What's the difference between View Only and Full Access?", a: "View Only ($14.99/month) lets you search and view all records in our shared database, perfect for research and analysis. Full Access ($19.99/month) includes everything in View Only plus the ability to add, edit, and delete your own records—ideal for active professionals who want to contribute to the database." },
  { q: "Can I upgrade or downgrade my plan?", a: "Yes! You can upgrade from View Only to Full Access at any time. Downgrades take effect at the end of your current billing period. Any changes can be made from your account settings." },
  { q: "What happens to my data if I downgrade from Full Access to View Only?", a: "Your data remains in the system and is still viewable by you and other subscribers. However, you won't be able to edit or delete it until you upgrade back to Full Access. Data ownership is preserved." },
  { q: "Do you offer annual billing?", a: "Currently, we offer monthly billing only. This gives you maximum flexibility to adjust your subscription as your needs change. Annual billing options may be introduced in the future." },
  { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards (Visa, MasterCard, American Express, Discover) processed securely through Stripe. We do not currently accept PayPal or other payment methods." },
  { q: "Can I cancel anytime?", a: "Yes! You can cancel your subscription at any time from your account settings. You'll need to provide 30 days' notice as outlined in our terms. Your access continues until the end of your paid period, and you can export your data within 30 days of cancellation." },
  { q: "Is there a setup fee or hidden costs?", a: "No. The price you see is the price you pay. No setup fees, no hidden charges, no surprises. Just straightforward monthly billing." },
  { q: "What happens after my trial ends?", a: "We'll send you reminder emails at Day 21 and Day 28 of your trial. On Day 30, if you haven't selected a plan, your access will pause. Your data is kept for 90 days in case you decide to subscribe. Simply choose a plan to continue." },
  { q: "Can I get a refund?", a: "Due to the immediate access to our shared database and the 30-day free trial, we generally don't offer refunds. However, if you experience technical issues that prevent you from using the service, please contact support and we'll work with you to resolve the situation." },
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
