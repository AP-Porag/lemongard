import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ChevronRight,
    Mail,
    Phone,
    HelpCircle,
    Briefcase,
    Send,
    Loader2,
    Lock,
    CheckCircle2,
    LifeBuoy,
    MessageSquare,
    Building2,
    Clock,
    MapPin,
    Book,
    Video,
    Users,
    ArrowRight,
    ChevronDown,
    User,
    Globe,
    Linkedin,
    Twitter,
} from 'lucide-react';
import Navigation from '@/components/public/Navigation';
import Footer from '@/components/public/Footer';
import {
    LemonSlice,
    LemonSimple,
    LemonWhole,
    LemonHalf,
} from '@/components/LemonIcon';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import heroBg from '@/assets/hero-bg.png';

const contactSchema = z.object({
    firstName: z
        .string()
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name is too long'),
    lastName: z
        .string()
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name is too long'),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    phone: z.string().optional(),
    subject: z.string().min(1, 'Please select a topic'),
    message: z
        .string()
        .min(10, 'Message must be at least 10 characters')
        .max(1000, 'Message must be less than 1000 characters'),
    consent: z.boolean().refine((val) => val === true, {
        message: 'You must agree to be contacted',
    }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactMethods = [
    {
        icon: Mail,
        title: 'Email Us',
        desc: 'Get in touch via email',
        link: 'mailto:support@lemongard.com',
        linkText: 'support@lemongard.com',
        response: 'Response within 24 hours',
        responseIcon: Clock,
    },
    {
        icon: HelpCircle,
        title: 'Help Center',
        desc: 'Browse our documentation',
        link: '#help',
        linkText: 'View Help Articles',
        response: 'Available 24/7',
        responseIcon: Clock,
    },
    {
        icon: Briefcase,
        title: 'Sales Inquiries',
        desc: 'Questions about plans?',
        link: '#sales',
        linkText: 'Talk to Sales',
        response: 'Mon-Fri, 9AM-5PM EST',
        responseIcon: Clock,
    },
];

const whyReachOut = [
    {
        icon: CheckCircle2,
        title: 'Pre-Sales Questions',
        text: 'Learn about features, pricing, and how LemonGard can help your business',
    },
    {
        icon: LifeBuoy,
        title: 'Technical Support',
        text: 'Get help with platform issues, data import, or account setup',
    },
    {
        icon: MessageSquare,
        title: 'Feature Requests',
        text: 'Share ideas for new features or improvements',
    },
    {
        icon: Building2,
        title: 'Enterprise Inquiries',
        text: 'Discuss custom solutions for larger teams',
    },
];

const faqs = [
    {
        q: 'How quickly will I receive a response?',
        a: 'We aim to respond to all contact form submissions within 24 hours during business days (Monday-Friday). For urgent technical issues, our support team typically responds within 2-4 hours.',
    },
    {
        q: 'What information should I include in my message?',
        a: 'Please provide as much detail as possible about your inquiry. For technical issues, include screenshots, error messages, and steps to reproduce the problem. For sales questions, let us know about your business size and specific needs.',
    },
    {
        q: 'Can I schedule a demo or call?',
        a: "Yes! Mention in your message that you'd like to schedule a demo, and we'll send you a calendar link to book a time that works for you.",
    },
    {
        q: 'Do you offer phone support?',
        a: 'Currently, we provide support primarily through email for all users. Pro and Enterprise plan users can request phone support for critical issues.',
    },
    {
        q: 'What if I have a billing question?',
        a: "For billing inquiries, select 'Billing Question' from the topic dropdown. Please include your account email address so we can quickly locate your account.",
    },
    {
        q: 'How do I report a bug or technical issue?',
        a: "Select 'Bug Report' or 'Technical Support' from the dropdown and describe the issue in detail. Include any error messages, screenshots, and the steps that led to the problem.",
    },
];

const resources = [
    {
        icon: Book,
        title: 'Help Center',
        desc: 'Browse our comprehensive documentation and guides',
        btn: 'Visit Help Center',
    },
    {
        icon: Video,
        title: 'Video Tutorials',
        desc: 'Watch step-by-step guides and walkthroughs',
        btn: 'Watch Tutorials',
    },
    {
        icon: Users,
        title: 'Community Forum',
        desc: 'Connect with other users and share tips',
        btn: 'Join Community',
    },
];

const subjectOptions = [
    'General Inquiry',
    'Technical Support',
    'Billing Question',
    'Feature Request',
    'Sales & Pricing',
    'Bug Report',
    'Other',
];

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

const Contact = () => {
    const [showSuccess, setShowSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: { consent: false },
    });

    const messageVal = watch('message');
    const messageLength = messageVal?.length || 0;

    const onSubmit = async (data: ContactFormData) => {
        await new Promise((r) => setTimeout(r, 2000));
        setShowSuccess(true);
        reset();
    };

    const inputBase =
        'w-full pl-10 pr-4 py-3 border rounded-lg transition-all outline-none text-foreground placeholder:text-muted-foreground';
    const inputOk =
        'border-border focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400';
    const inputErr =
        'border-destructive focus:ring-destructive focus:border-destructive';

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main>
                {/* Hero */}
                <section className="section-container section-padding relative overflow-hidden">
                    <div
                        className="absolute inset-0 z-0"
                        style={{
                            backgroundImage: `url(${heroBg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.12,
                        }}
                    />
                    <LemonSlice className="absolute top-0 right-0 z-0 h-64 w-64 text-yellow-400 opacity-[0.05]" />
                    <LemonSlice className="absolute bottom-0 left-0 z-0 h-48 w-48 text-yellow-400 opacity-[0.05]" />

                    <div className="relative z-10">
                        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
                            <Link
                                to="/"
                                className="transition-colors hover:text-yellow-500"
                            >
                                Home
                            </Link>
                            <ChevronRight className="h-4 w-4" />
                            <span className="font-medium text-foreground">
                                Contact
                            </span>
                        </div>

                        <motion.div {...fadeIn} className="text-center">
                            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-800">
                                <LemonSimple className="h-4 w-4" /> Get in Touch
                            </span>
                            <h1 className="text-navy-600 mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                                We're Here to Help
                            </h1>
                            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                                Have questions about LemonGard? Want to learn
                                more about our platform? We'd love to hear from
                                you.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Contact Methods */}
                <section className="section-container py-12">
                    <motion.div
                        {...fadeIn}
                        className="grid grid-cols-1 gap-8 md:grid-cols-3"
                    >
                        {contactMethods.map((m, i) => (
                            <motion.div
                                key={m.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                className="relative overflow-hidden rounded-2xl border-2 border-border bg-card p-8 text-center transition-all duration-300 hover:border-yellow-400 hover:shadow-xl"
                            >
                                <LemonSlice className="absolute top-2 right-2 h-20 w-20 opacity-[0.05]" />
                                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-yellow-50 p-4">
                                    <m.icon className="h-8 w-8 text-yellow-500" />
                                </div>
                                <h3 className="text-navy-600 mb-2 text-xl font-semibold">
                                    {m.title}
                                </h3>
                                <p className="mb-4 text-sm text-muted-foreground">
                                    {m.desc}
                                </p>
                                <a
                                    href={m.link}
                                    className="font-medium text-yellow-500 transition-colors hover:text-yellow-600"
                                >
                                    {m.linkText}
                                </a>
                                <div className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" /> {m.response}
                                    <LemonSimple className="ml-1 h-3 w-3 text-yellow-400" />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Contact Form Section */}
                <section className="section-container py-20 lg:py-32">
                    <motion.div {...fadeIn} className="mb-12 text-center">
                        <div className="mb-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <LemonSimple className="h-4 w-4 text-yellow-500" />{' '}
                            Send Us a Message
                        </div>
                        <h2 className="text-navy-600 mb-4 text-3xl font-bold md:text-4xl">
                            Contact Form
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Fill out the form below and we'll get back to you as
                            soon as possible
                        </p>
                    </motion.div>

                    <div className="grid items-start gap-12 lg:grid-cols-2">
                        {/* Form */}
                        <motion.div
                            {...fadeIn}
                            className="relative overflow-hidden rounded-2xl border-2 border-border bg-card p-8 shadow-xl lg:p-10"
                        >
                            <LemonWhole className="absolute top-3 left-3 h-12 w-12 opacity-[0.08]" />
                            <LemonWhole className="absolute top-3 right-3 h-12 w-12 opacity-[0.08]" />
                            <LemonWhole className="absolute bottom-3 left-3 h-12 w-12 opacity-[0.08]" />
                            <LemonWhole className="absolute right-3 bottom-3 h-12 w-12 opacity-[0.08]" />

                            {showSuccess ? (
                                <div className="py-12 text-center">
                                    <div className="inline-block rounded-2xl border border-green-200 bg-green-50 p-8">
                                        <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />
                                        <h3 className="text-navy-600 mb-2 text-2xl font-bold">
                                            Message Sent Successfully! 🎉
                                        </h3>
                                        <p className="mb-6 text-muted-foreground">
                                            Thank you for contacting us. We'll
                                            get back to you within 24 hours.
                                        </p>
                                        <button
                                            onClick={() =>
                                                setShowSuccess(false)
                                            }
                                            className="text-sm font-medium text-green-600 hover:text-green-700"
                                        >
                                            Send another message
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="relative z-10 space-y-6"
                                >
                                    {/* Name */}
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label
                                                htmlFor="firstName"
                                                className="text-navy-600 mb-2 block text-sm font-medium"
                                            >
                                                First Name *
                                            </label>
                                            <div className="relative">
                                                <User className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                                <input
                                                    id="firstName"
                                                    {...register('firstName')}
                                                    placeholder="John"
                                                    className={`${inputBase} ${errors.firstName ? inputErr : inputOk}`}
                                                />
                                            </div>
                                            {errors.firstName && (
                                                <p className="mt-1 text-xs text-destructive">
                                                    {errors.firstName.message}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="lastName"
                                                className="text-navy-600 mb-2 block text-sm font-medium"
                                            >
                                                Last Name *
                                            </label>
                                            <div className="relative">
                                                <User className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                                <input
                                                    id="lastName"
                                                    {...register('lastName')}
                                                    placeholder="Doe"
                                                    className={`${inputBase} ${errors.lastName ? inputErr : inputOk}`}
                                                />
                                            </div>
                                            {errors.lastName && (
                                                <p className="mt-1 text-xs text-destructive">
                                                    {errors.lastName.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="text-navy-600 mb-2 block text-sm font-medium"
                                        >
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <Mail className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                            <input
                                                id="email"
                                                type="email"
                                                {...register('email')}
                                                placeholder="john.doe@company.com"
                                                className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="mt-1 text-xs text-destructive">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="text-navy-600 mb-2 block text-sm font-medium"
                                        >
                                            Phone Number (Optional)
                                        </label>
                                        <div className="relative">
                                            <Phone className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                            <input
                                                id="phone"
                                                type="tel"
                                                {...register('phone')}
                                                placeholder="+1 (555) 123-4567"
                                                className={`${inputBase} ${inputOk}`}
                                            />
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label
                                            htmlFor="subject"
                                            className="text-navy-600 mb-2 block text-sm font-medium"
                                        >
                                            What can we help you with? *
                                        </label>
                                        <div className="relative">
                                            <Briefcase className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                            <select
                                                id="subject"
                                                {...register('subject')}
                                                className={`${inputBase} appearance-none pr-10 ${errors.subject ? inputErr : inputOk}`}
                                            >
                                                <option value="">
                                                    Select a topic
                                                </option>
                                                {subjectOptions.map((o) => (
                                                    <option key={o} value={o}>
                                                        {o}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                        </div>
                                        {errors.subject && (
                                            <p className="mt-1 text-xs text-destructive">
                                                {errors.subject.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="text-navy-600 mb-2 block text-sm font-medium"
                                        >
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={6}
                                            {...register('message')}
                                            placeholder="Tell us more about how we can help you..."
                                            className={`w-full resize-none rounded-lg border px-4 py-3 text-foreground transition-all outline-none placeholder:text-muted-foreground ${errors.message ? inputErr : inputOk}`}
                                        />
                                        <p className="mt-1 text-right text-xs text-muted-foreground">
                                            {messageLength}/1000 characters
                                        </p>
                                        {errors.message && (
                                            <p className="mt-1 text-xs text-destructive">
                                                {errors.message.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Consent */}
                                    <div className="flex items-start gap-3">
                                        <input
                                            id="consent"
                                            type="checkbox"
                                            {...register('consent')}
                                            className="mt-1 h-4 w-4 rounded border-border text-yellow-500 focus:ring-yellow-400"
                                        />
                                        <label
                                            htmlFor="consent"
                                            className="flex items-center gap-1 text-sm text-muted-foreground"
                                        >
                                            I agree to be contacted about this
                                            inquiry{' '}
                                            <LemonSimple className="inline h-3 w-3 text-yellow-400" />
                                        </label>
                                    </div>
                                    {errors.consent && (
                                        <p className="text-xs text-destructive">
                                            {errors.consent.message}
                                        </p>
                                    )}

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-lg py-4 text-base font-bold disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="h-5 w-5 animate-spin" />{' '}
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-5 w-5" />{' '}
                                                Send Message
                                            </>
                                        )}
                                    </button>

                                    <p className="flex items-center justify-center gap-1 text-center text-xs text-muted-foreground">
                                        <Lock className="h-3 w-3" /> Your
                                        information is secure and will never be
                                        shared{' '}
                                        <LemonSimple className="h-3 w-3 text-yellow-400" />
                                    </p>
                                </form>
                            )}
                        </motion.div>

                        {/* Right Column */}
                        <motion.div
                            {...fadeIn}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h3 className="text-navy-600 mb-6 text-2xl font-bold">
                                Why Reach Out?
                            </h3>
                            <div className="space-y-5">
                                {whyReachOut.map((item) => (
                                    <div
                                        key={item.title}
                                        className="flex gap-4"
                                    >
                                        <item.icon className="mt-1 h-5 w-5 shrink-0 text-yellow-500" />
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-navy-600 font-semibold">
                                                    {item.title}
                                                </span>
                                                <LemonSimple className="h-3 w-3 text-yellow-400" />
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="my-8 border-t border-border" />

                            {/* Response Time */}
                            <div className="relative overflow-hidden rounded-r-xl border-l-4 border-yellow-400 bg-yellow-50 p-6">
                                <LemonWhole className="absolute top-2 right-2 h-10 w-10 opacity-[0.1]" />
                                <Clock className="mb-3 h-6 w-6 text-yellow-500" />
                                <h4 className="text-navy-600 mb-2 font-semibold">
                                    Response Time
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    We typically respond to all inquiries within
                                    24 hours during business days.
                                </p>
                                <p className="mt-2 text-xs text-muted-foreground">
                                    Business hours: Mon-Fri, 9AM-5PM EST
                                </p>
                            </div>

                            <div className="my-8 border-t border-border" />

                            {/* Social */}
                            <h4 className="text-navy-600 mb-4 font-semibold">
                                Connect With Us
                            </h4>
                            <div className="space-y-3">
                                {[
                                    {
                                        icon: Linkedin,
                                        label: 'LinkedIn',
                                        href: '#linkedin',
                                    },
                                    {
                                        icon: Twitter,
                                        label: 'Twitter',
                                        href: '#twitter',
                                    },
                                ].map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-yellow-500"
                                    >
                                        <s.icon className="h-5 w-5" /> {s.label}{' '}
                                        <LemonSimple className="h-3 w-3 text-yellow-400" />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="section-container py-20 lg:py-10">
                    <div className="rounded-2xl bg-muted p-8 lg:p-16">
                        <motion.div {...fadeIn} className="mb-12 text-center">
                            <div className="mb-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                <LemonSimple className="h-4 w-4 text-yellow-500" />{' '}
                                Frequently Asked Questions
                            </div>
                            <h2 className="text-navy-600 mb-4 text-3xl font-bold md:text-4xl">
                                Common Questions
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Quick answers to common questions
                            </p>
                        </motion.div>

                        <motion.div {...fadeIn} className="mx-auto max-w-3xl">
                            <Accordion type="single" collapsible>
                                {faqs.map((faq, i) => (
                                    <AccordionItem
                                        key={i}
                                        value={`faq-${i}`}
                                        className="border-b border-border"
                                    >
                                        <AccordionTrigger className="text-navy-600 py-6 text-left text-base font-semibold hover:text-yellow-500 hover:no-underline">
                                            <span className="flex items-center gap-2">
                                                <LemonSimple className="h-4 w-4 shrink-0 text-yellow-400" />{' '}
                                                {faq.q}
                                            </span>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-6 leading-relaxed text-muted-foreground">
                                            {faq.a}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </motion.div>
                    </div>
                </section>

                {/* Location */}
                <section className="section-container py-20 lg:py-32">
                    <motion.div {...fadeIn} className="mb-12 text-center">
                        <div className="mb-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <LemonSimple className="h-4 w-4 text-yellow-500" />{' '}
                            Our Presence
                        </div>
                        <h2 className="text-navy-600 mb-4 text-3xl font-bold md:text-4xl">
                            Global & Remote
                        </h2>
                    </motion.div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        <motion.div
                            {...fadeIn}
                            className="relative overflow-hidden rounded-2xl border-2 border-border bg-card p-8"
                        >
                            <LemonWhole className="absolute right-3 bottom-3 h-12 w-12 opacity-[0.08]" />
                            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-yellow-50 p-4">
                                <Globe className="h-8 w-8 text-yellow-500" />
                            </div>
                            <h3 className="text-navy-600 mb-3 text-xl font-semibold">
                                Fully Remote Team
                            </h3>
                            <p className="text-muted-foreground">
                                We're a fully remote team serving customers
                                worldwide. Available via email and online
                                support.
                            </p>
                        </motion.div>

                        <motion.div
                            {...fadeIn}
                            transition={{ delay: 0.15 }}
                            className="relative overflow-hidden rounded-2xl border-2 border-border bg-card p-8"
                        >
                            <LemonSimple className="absolute right-3 bottom-3 h-8 w-8 text-yellow-400 opacity-[0.15]" />
                            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-yellow-50 p-4">
                                <Clock className="h-8 w-8 text-yellow-500" />
                            </div>
                            <h3 className="text-navy-600 mb-3 text-xl font-semibold">
                                Business Hours
                            </h3>
                            <div className="space-y-1 text-sm text-muted-foreground">
                                <p>Monday – Friday: 9:00 AM – 5:00 PM EST</p>
                                <p>Saturday – Sunday: Closed</p>
                                <p className="mt-2 text-xs">
                                    Support emails answered within 24 hours
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Resources */}
                <section className="section-container py-20 lg:py-32">
                    <motion.div {...fadeIn} className="mb-12 text-center">
                        <div className="mb-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <LemonSimple className="h-4 w-4 text-yellow-500" />{' '}
                            Other Ways to Get Help
                        </div>
                        <h2 className="text-navy-600 mb-4 text-3xl font-bold md:text-4xl">
                            Alternative Resources
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {resources.map((r, i) => (
                            <motion.div
                                key={r.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                className="relative overflow-hidden rounded-2xl border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-card p-8 text-center"
                            >
                                <LemonSlice className="absolute top-2 right-2 h-16 w-16 opacity-[0.05]" />
                                <r.icon className="mx-auto mb-4 h-10 w-10 text-yellow-500" />
                                <h3 className="text-navy-600 mb-2 text-xl font-semibold">
                                    {r.title}
                                </h3>
                                <p className="mb-6 text-sm text-muted-foreground">
                                    {r.desc}
                                </p>
                                <a
                                    href="#"
                                    className="btn-secondary rounded-lg px-6 py-3 text-sm"
                                >
                                    {r.btn}
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="section-container py-20 lg:py-32">
                    <motion.div
                        {...fadeIn}
                        className="from-navy-600 to-navy-800 relative overflow-hidden rounded-2xl bg-gradient-to-br p-12 text-white lg:p-16"
                    >
                        <LemonSlice className="absolute top-4 left-4 h-24 w-24 text-white opacity-[0.08]" />
                        <LemonSlice className="absolute right-4 bottom-4 h-32 w-32 text-white opacity-[0.08]" />
                        <LemonHalf className="absolute top-4 right-4 h-16 w-16 text-white opacity-[0.08]" />

                        <div className="relative z-10 text-center">
                            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                                Ready to Get Started?
                            </h2>
                            <p className="mb-10 text-lg text-gray-300 md:text-xl">
                                Don't wait for answers—try LemonGard free for 30
                                days
                            </p>
                            <Link
                                to="/register"
                                className="btn-primary inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-bold"
                            >
                                Start Your Free Trial{' '}
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                            <p className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
                                30 days free <LemonSimple className="h-3 w-3" />{' '}
                                No credit card required{' '}
                                <LemonSimple className="h-3 w-3" /> Cancel
                                anytime
                            </p>
                        </div>
                    </motion.div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
