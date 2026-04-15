import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LemonSimple } from "@/components/LemonIcon";

const faqs = [
  {
    q: "Do I need a credit card to start my free trial?",
    a: "No! Your 30-day free trial begins immediately upon signup with no credit card required. You'll only need to add payment information if you decide to continue after the trial period.",
  },
  {
    q: "What happens to my data if I don't subscribe?",
    a: "If you choose not to subscribe after your trial, your account access ends immediately. However, we keep your data for 90 days in case you change your mind. After 90 days, all data is permanently deleted from our servers. You can export your data anytime during the trial or active subscription.",
  },
  {
    q: "Can I edit or delete records added by other users?",
    a: "No. You can view and search all records in the shared database, but you can only edit or delete records that you personally created. This ensures data integrity and ownership rights for all users.",
  },
  {
    q: "How does the shared database work?",
    a: "Every user contributes their records to a shared, searchable database. This creates a valuable collective knowledge base for the service industry. You can search and view all records, but your specific business data remains secure and only you can modify your entries.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes! There are no long-term contracts. You can cancel your subscription at any time from your account settings. Your access continues until the end of your current billing period, and you can export your data for 30 days after cancellation.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards (Visa, MasterCard, American Express, Discover) processed securely through Stripe. We currently don't accept PayPal or other payment methods.",
  },
  {
    q: "Is there a discount for annual billing?",
    a: "Yes! Annual subscribers save 16% compared to monthly billing. That's $490/year vs $588/year for monthly subscribers — a savings of $98.",
  },
  {
    q: "How do I get support if I need help?",
    a: "All subscribers get priority email support with response within 24 hours. We also have a comprehensive knowledge base, video tutorials, and active community forum. Live chat support is available for annual subscribers.",
  },
  {
    q: "Can I upgrade or downgrade my plan?",
    a: "Currently, we offer one comprehensive Professional Plan that includes all features. We may introduce additional plan tiers in the future based on user feedback.",
  },
  {
    q: "Is my data backed up?",
    a: "Yes! We perform automated daily backups of all data to secure, geographically distributed servers. Your data is protected against hardware failure, and we maintain backup copies for disaster recovery.",
  },
];

/**
 * FAQ Section - Accordion with 10 frequently asked questions
 */
const FAQSection = () => {
  return (
    <section className="section-padding">
      <div className="bg-[#f8fafc] p-8 lg:p-16">
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
            <span className="text-sm font-medium text-yellow-600 uppercase tracking-wide">Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-600">Got Questions? We've Got Answers</h2>
          <p className="text-lg text-muted-foreground mt-4">
            Everything you need to know about how LemonGard works
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-white rounded-lg px-5 border border-gray-200 data-[state=open]:border-yellow-300 transition-colors"
              >
                <AccordionTrigger className="text-left text-base font-bold text-[#143694] hover:text-yellow-500 hover:no-underline py-5 gap-3">
                  <span className="flex items-center gap-2">
                    <LemonSimple className="w-4 h-4 text-yellow-400 shrink-0" />
                    {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
