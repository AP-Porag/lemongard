// // resources/js/pages/auth/Register.tsx

// import { Head, Form } from '@inertiajs/react';
// import AuthLayout from '@/layouts/auth-layout';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Spinner } from '@/components/ui/spinner';
// import InputError from '@/components/input-error';
// import TextLink from '@/components/text-link';
// import {
//     Select,
//     SelectTrigger,
//     SelectContent,
//     SelectItem,
//     SelectValue,
// } from '@/components/ui/select';
// import { Check } from 'lucide-react';
// import { useState } from 'react';
// import { store } from '@/routes/register';
// import { login } from '@/routes';

// export default function Register() {
//     const [password, setPassword] = useState('');

//     const getStrength = () => {
//         if (password.length > 10) return 'Strong';
//         if (password.length > 6) return 'Medium';
//         return 'Weak';
//     };

//     return (
//         <AuthLayout title="" description="">
//             <Head title="Register" />

//             <div className="space-y-8">
//                 {/* 🔥 HERO SECTION */}
//                 <div className="space-y-6 text-center">
//                     <div className="flex justify-center">
//                         <div className="flex items-center gap-2 rounded-full border border-yellow-300 bg-yellow-50 px-5 py-2 text-sm font-medium text-yellow-700">
//                             🎉 30-Day Free Trial
//                         </div>
//                     </div>

//                     <h1 className="text-3xl font-bold text-[#1e3a8a] md:text-4xl">
//                         Start Your Free Trial
//                     </h1>

//                     <p className="mx-auto max-w-md text-gray-600">
//                         Create your account and get full access to LemonGard for
//                         30 days. No credit card required.
//                     </p>

//                     <div className="flex justify-center gap-6 text-sm text-gray-600">
//                         {[
//                             'No Credit Card',
//                             'Cancel Anytime',
//                             'Full Access',
//                         ].map((item) => (
//                             <div key={item} className="flex items-center gap-1">
//                                 <Check className="h-4 w-4 text-yellow-500" />
//                                 {item}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* 🔥 SIGNUP CARD */}
//                 <div className="mx-auto w-full max-w-md">
//                     <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
//                         <Form
//                             {...store.form()}
//                             resetOnSuccess={[
//                                 'password',
//                                 'password_confirmation',
//                             ]}
//                             disableWhileProcessing
//                             className="space-y-6"
//                         >
//                             {({ processing, errors }) => (
//                                 <>
//                                     {/* Name */}
//                                     <div className="grid grid-cols-2 gap-4">
//                                         <div className="space-y-2">
//                                             <Label>First Name</Label>
//                                             <Input
//                                                 name="name"
//                                                 placeholder="John"
//                                             />
//                                             <InputError message={errors.name} />
//                                         </div>

//                                         <div className="space-y-2">
//                                             <Label>Last Name</Label>
//                                             <Input
//                                                 name="last_name"
//                                                 placeholder="Doe"
//                                             />
//                                         </div>
//                                     </div>

//                                     {/* Email */}
//                                     <div className="space-y-2">
//                                         <Label>Email Address</Label>
//                                         <Input
//                                             name="email"
//                                             type="email"
//                                             placeholder="john@example.com"
//                                         />
//                                         <InputError message={errors.email} />
//                                     </div>

//                                     {/* Company */}
//                                     <div className="space-y-2">
//                                         <Label>Company (Optional)</Label>
//                                         <Input
//                                             name="company"
//                                             placeholder="Your company"
//                                         />
//                                     </div>

//                                     {/* 🔥 Industry */}
//                                     <div className="space-y-2">
//                                         <Label>Industry</Label>
//                                         <Select>
//                                             <SelectTrigger>
//                                                 <SelectValue placeholder="Select industry" />
//                                             </SelectTrigger>
//                                             <SelectContent>
//                                                 <SelectItem value="saas">
//                                                     SaaS
//                                                 </SelectItem>
//                                                 <SelectItem value="agency">
//                                                     Agency
//                                                 </SelectItem>
//                                                 <SelectItem value="ecommerce">
//                                                     Ecommerce
//                                                 </SelectItem>
//                                                 <SelectItem value="other">
//                                                     Other
//                                                 </SelectItem>
//                                             </SelectContent>
//                                         </Select>
//                                     </div>

//                                     {/* Password */}
//                                     <div className="space-y-2">
//                                         <Label>Password</Label>
//                                         <Input
//                                             type="password"
//                                             name="password"
//                                             placeholder="Create a strong password"
//                                             onChange={(e) =>
//                                                 setPassword(e.target.value)
//                                             }
//                                         />
//                                         <div className="space-y-1 text-xs">
//                                             <p
//                                                 className={
//                                                     password.length >= 8
//                                                         ? 'text-green-500'
//                                                         : 'text-gray-400'
//                                                 }
//                                             >
//                                                 ✔ At least 8 characters
//                                             </p>
//                                             <p
//                                                 className={
//                                                     /[A-Z]/.test(password)
//                                                         ? 'text-green-500'
//                                                         : 'text-gray-400'
//                                                 }
//                                             >
//                                                 ✔ One uppercase letter
//                                             </p>
//                                             <p
//                                                 className={
//                                                     /[0-9]/.test(password)
//                                                         ? 'text-green-500'
//                                                         : 'text-gray-400'
//                                                 }
//                                             >
//                                                 ✔ One number
//                                             </p>
//                                         </div>
//                                         <InputError message={errors.password} />
//                                     </div>

//                                     {/* Confirm Password */}
//                                     <div className="space-y-2">
//                                         <Label>Confirm Password</Label>
//                                         <Input
//                                             type="password"
//                                             name="password_confirmation"
//                                             placeholder="Re-enter password"
//                                         />
//                                         <InputError
//                                             message={
//                                                 errors.password_confirmation
//                                             }
//                                         />
//                                     </div>

//                                     {/* Terms */}
//                                     <div className="flex items-start gap-2 text-sm">
//                                         <Checkbox />
//                                         <span className="text-muted-foreground">
//                                             I agree to the Terms & Privacy
//                                             Policy
//                                         </span>
//                                     </div>

//                                     {/* CTA */}
//                                     <Button
//                                         type="submit"
//                                         className="w-full bg-yellow-400 font-medium text-black hover:bg-yellow-500"
//                                     >
//                                         {processing && <Spinner />}
//                                         Start My Free Trial →
//                                     </Button>

//                                     {/* Info Box */}
//                                     <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4 text-sm">
//                                         <p className="mb-1 font-medium">
//                                             What happens next?
//                                         </p>
//                                         <p className="text-muted-foreground">
//                                             You’ll get instant access to all
//                                             features. No credit card required.
//                                         </p>
//                                     </div>

//                                     {/* Divider */}
//                                     <div className="flex items-center gap-2">
//                                         <div className="h-px flex-1 bg-gray-200" />
//                                         <span className="text-xs text-gray-400">
//                                             OR
//                                         </span>
//                                         <div className="h-px flex-1 bg-gray-200" />
//                                     </div>

//                                     {/* Google */}
//                                     <Button
//                                         variant="outline"
//                                         className="w-full"
//                                         type="button"
//                                     >
//                                         Sign up with Google
//                                     </Button>

//                                     {/* Login */}
//                                     <p className="text-center text-sm text-muted-foreground">
//                                         Already have an account?{' '}
//                                         <TextLink href={login()}>
//                                             Log in
//                                         </TextLink>
//                                     </p>

//                                     {/* Security */}
//                                     <p className="text-center text-xs text-gray-400">
//                                         🔒 Your data is secure and encrypted
//                                     </p>
//                                 </>
//                             )}
//                         </Form>
//                         {/* 🔥 FEATURES */}
//                         <div className="mx-auto max-w-md space-y-4 text-sm text-gray-600">
//                             <h3 className="text-center font-semibold text-gray-800">
//                                 What you get with your free trial:
//                             </h3>

//                             {[
//                                 'Full Platform Access',
//                                 '50,000+ Industry Records',
//                                 'Add Your Own Data',
//                                 'Data Ownership Protection',
//                                 'Priority Support',
//                                 'No Commitments',
//                             ].map((item) => (
//                                 <div
//                                     key={item}
//                                     className="flex items-start gap-2"
//                                 >
//                                     <span className="mt-1 text-yellow-500">
//                                         ✔
//                                     </span>
//                                     <span>{item}</span>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* 🔥 TRUST */}
//                         <div className="flex justify-center gap-6 text-xs text-gray-500">
//                             <span>🔒 Secure Signup</span>
//                             <span>🛡️ SSL Encrypted</span>
//                             <span>🌍 GDPR Compliant</span>
//                         </div>

//                         {/* 🔥 TESTIMONIAL */}
//                         <div className="mx-auto max-w-md rounded-xl bg-[#1e3a8a] p-5 text-white shadow-lg">
//                             <p className="text-sm">
//                                 “The free trial gave us time to test LemonGard
//                                 thoroughly. We were impressed by the data
//                                 quality and ease of use.”
//                             </p>
//                             <p className="mt-2 text-xs text-gray-300">
//                                 — Service Professional
//                             </p>
//                         </div>

//                         {/* 🔥 FAQ */}
//                         <div className="mx-auto max-w-md space-y-3 text-sm">
//                             <h3 className="text-center font-semibold text-gray-800">
//                                 Quick Questions
//                             </h3>

//                             {[
//                                 {
//                                     q: 'Do I need a credit card?',
//                                     a: 'No, you can start your trial without payment.',
//                                 },
//                                 {
//                                     q: 'What happens after 30 days?',
//                                     a: 'You can choose a plan or cancel anytime.',
//                                 },
//                                 {
//                                     q: 'Can I cancel anytime?',
//                                     a: 'Yes, no contracts or commitments.',
//                                 },
//                             ].map((item, i) => {
//                                 const [open, setOpen] = useState(false);

//                                 return (
//                                     <div
//                                         key={i}
//                                         className="rounded-md border p-3"
//                                     >
//                                         <button
//                                             onClick={() => setOpen(!open)}
//                                             className="w-full text-left font-medium"
//                                         >
//                                             {item.q}
//                                         </button>

//                                         {open && (
//                                             <p className="mt-2 text-gray-500">
//                                                 {item.a}
//                                             </p>
//                                         )}
//                                     </div>
//                                 );
//                             })}
//                         </div>

//                         {/* 🔥 SUPPORT */}
//                         <div className="mx-auto max-w-md rounded-lg border border-yellow-300 bg-yellow-50 p-5 text-center">
//                             <p className="font-medium text-gray-800">
//                                 Need Help Getting Started?
//                             </p>
//                             <p className="text-sm text-gray-600">
//                                 Our team is here to help you set up your
//                                 account.
//                             </p>

//                             <button className="mt-3 font-medium text-yellow-700 underline">
//                                 Contact Support
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </AuthLayout>
//     );
// }

import { Head, Form } from '@inertiajs/react';
import AuthLayout from '@/layouts/auth-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Spinner } from '@/components/ui/spinner';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select';
import { Check } from 'lucide-react';
import { useState, useMemo } from 'react';
import { store } from '@/routes/register';
import { login } from '@/routes';
import { Progress } from '@/components/ui/progress'; // shadcn progress bar
import {
    CheckCircle,
    Database,
    Users,
    Shield,
    Mail,
    Calendar,
    Sparkles,
    Lock,
    CircleCheck,
    User,
    Building2,
    Briefcase,
    Eye,
    EyeOff,
} from 'lucide-react';

export default function Register() {
    const [password, setPassword] = useState('');
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    // Strength check logic
    const checkStrength = (pass: string) => {
        let score = 0;
        if (pass.length > 6) score++;
        if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) score++;
        if (pass.match(/\d/)) score++;
        if (pass.match(/[^a-zA-Z\d]/)) score++;
        return score; // returns 0 to 4
    };

    const strength = useMemo(() => checkStrength(password), [password]);

    const strengthColor = () => {
        if (strength === 0) return 'bg-gray-200';
        if (strength <= 2) return 'bg-red-500';
        if (strength === 3) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const strengthText = () => {
        if (password.length === 0) return '';
        if (strength <= 2) return 'Weak';
        if (strength === 3) return 'Medium';
        return 'Strong';
    };

    return (
        <AuthLayout title="" description="">
            <Head title="Register" />

            <div className="space-y-10">
                {/* HERO */}
                <div className="space-y-5 text-center">
                    <div className="flex justify-center">
                        <div className="rounded-full border border-yellow-300 bg-yellow-50 px-4 py-1.5 text-xs font-medium text-yellow-700">
                            🎉 30-Day Free Trial
                        </div>
                    </div>

                    <h1 className="font-sans font-semibold tracking-tight text-[#1e3a8a] md:text-4xl">
                        Start Your Free Trial
                    </h1>

                    <p className="mx-auto max-w-sm text-base text-gray-500">
                        Create your account and get full access to LemonGard for
                        30 days. No credit card required.
                    </p>

                    <div className="flex justify-center gap-5 text-xs text-gray-500">
                        {[
                            'No Credit Card',
                            'Cancel Anytime',
                            'Full Access',
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-1">
                                <CircleCheck className="h-3.5 w-3.5 text-yellow-500" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                {/* CARD */}
                <div className="mx-auto w-full max-w-[380px]">
                    <div className="space-y-5 rounded-2xl bg-white p-6 shadow-[0_25px_70px_rgba(0,0,0,0.08),0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-sm">
                        <Form {...store.form()} className="space-y-5">
                            {({ processing, errors }) => (
                                <>
                                    {/* Name */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1.5">
                                            <Label className="text-xs">
                                                First Name{' '}
                                            </Label>
                                            <span className="text-red-500">
                                                *
                                            </span>
                                            <div className="relative">
                                                <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                                <Input
                                                    className="h-10 pl-10"
                                                    name="first_name"
                                                    placeholder="John"
                                                />
                                            </div>
                                            <InputError message={errors.name} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-xs">
                                                Last Name{' '}
                                            </Label>
                                            <span className="text-red-500">
                                                *
                                            </span>
                                            <div className="relative">
                                                <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                                <Input
                                                    className="h-10 pl-10"
                                                    name="last_name"
                                                    placeholder="Doe"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Email */}
                                    <div className="space-y-1.5">
                                        <Label className="text-xs">
                                            Email Address{' '}
                                        </Label>
                                        <span className="text-red-500">*</span>
                                        <div className="relative">
                                            <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                            <Input
                                                className="h-10 pl-10"
                                                name="name"
                                                placeholder="John.doe@company.com"
                                            />
                                        </div>
                                        <InputError message={errors.email} />
                                    </div>
                                    {/* Company */}
                                    <div className="space-y-1.5">
                                        <Label className="text-xs">
                                            Company or Business Name (Optional)
                                        </Label>
                                        <div className="relative">
                                            <Building2 className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                            <Input
                                                className="h-10 pl-10"
                                                name="company_name"
                                                placeholder="Your Company Name"
                                            />
                                        </div>
                                    </div>
                                    {/* Industry */}
                                    <div className="space-y-1.5">
                                        <Label className="text-xs">
                                            Industry{' '}
                                        </Label>
                                        <span className="text-red-500">*</span>
                                        <Select>
                                            <SelectTrigger className="relative h-10 pl-10">
                                                <Briefcase className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                                <SelectValue placeholder="Select your industry" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="saas">
                                                    SaaS
                                                </SelectItem>
                                                <SelectItem value="agency">
                                                    Agency
                                                </SelectItem>
                                                <SelectItem value="ecommerce">
                                                    Ecommerce
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    {/* Password
                                    <div className="space-y-1.5">
                                        <Label className="text-xs">
                                            Password{' '}
                                        </Label>
                                        <span className="text-red-500">*</span>
                                        <Input
                                            className="h-10"
                                            type="password"
                                            name="password"
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                        <div className="space-y-1 text-[11px]">
                                            <p
                                                className={
                                                    password.length >= 8
                                                        ? 'text-green-500'
                                                        : 'text-gray-400'
                                                }
                                            >
                                                ✔ At least 8 characters
                                            </p>
                                            <p
                                                className={
                                                    /[A-Z]/.test(password)
                                                        ? 'text-green-500'
                                                        : 'text-gray-400'
                                                }
                                            >
                                                ✔ One uppercase
                                            </p>
                                            <p
                                                className={
                                                    /[0-9]/.test(password)
                                                        ? 'text-green-500'
                                                        : 'text-gray-400'
                                                }
                                            >
                                                ✔ One number
                                            </p>
                                        </div>
                                    </div> */}
                                    <Label className="text-xs">Password </Label>
                                    <span className="text-red-500">*</span>
                                    <div className="relative">
                                        {/* Lock Icon */}
                                        <div className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
                                            <Lock size={18} />
                                        </div>

                                        <Input
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            className="border-2 py-6 pr-10 pl-10 text-lg"
                                        />

                                        {/* Toggle Eye Icon */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        >
                                            {showPassword ? (
                                                <EyeOff size={20} />
                                            ) : (
                                                <Eye size={20} />
                                            )}
                                        </button>
                                    </div>

                                    {/* Strength Label & Progress Bar */}
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                Password strength:
                                            </span>
                                            <span
                                                className={`font-semibold ${strength > 3 ? 'text-green-600' : ''}`}
                                            >
                                                {strengthText()}
                                            </span>
                                        </div>

                                        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                                            <div
                                                className={`h-full transition-all duration-300 ${strengthColor()}`}
                                                style={{
                                                    width: `${(strength / 4) * 100}%`,
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Confirm */}
                                    <div className="space-y-1.5">
                                        <Label className="text-xs">
                                            Confirm Password{' '}
                                        </Label>
                                        <span className="text-red-500">*</span>
                                        <Input
                                            className="h-10"
                                            type="password"
                                            name="password_confirmation"
                                        />
                                    </div>
                                    <div className="space-y-3 text-xs">
                                        {/* Terms */}
                                        <div className="flex items-start gap-2">
                                            <Checkbox className="mt-[2px]" />

                                            <p className="leading-relaxed text-gray-600">
                                                I agree to the{' '}
                                                <a
                                                    href="#"
                                                    className="text-yellow-600 underline underline-offset-2"
                                                >
                                                    Terms & Conditions
                                                </a>{' '}
                                                and{' '}
                                                <a
                                                    href="#"
                                                    className="text-yellow-600 underline underline-offset-2"
                                                >
                                                    Privacy Policy
                                                </a>{' '}
                                                <span className="ml-1 text-yellow-500">
                                                    ↗
                                                </span>
                                            </p>
                                        </div>

                                        {/* Marketing */}
                                        <div className="flex items-start gap-2">
                                            <Checkbox className="mt-[2px]" />

                                            <p className="leading-relaxed text-gray-500">
                                                Send me product updates, tips,
                                                and special offers via email
                                            </p>
                                        </div>
                                    </div>
                                    {/* CTA */}
                                    <Button
                                        type="submit"
                                        className="h-11 w-full rounded-xl bg-yellow-400 font-semibold text-black shadow-[0px_10px_25px_rgba(0,0,0,0.15)] transition-all duration-200 hover:bg-yellow-500"
                                    >
                                        {processing && <Spinner />}
                                        Start My Free Trial →
                                    </Button>
                                    {/* Info */}
                                    <div className="relative flex gap-3 rounded-xl bg-[#F9F5E8] p-4">
                                        {/* Left yellow bar */}
                                        <div className="absolute top-0 left-0 h-full w-1 rounded-l-xl bg-yellow-400" />

                                        {/* Content */}
                                        <div className="flex items-start gap-3 pl-3">
                                            {/* Icon */}
                                            <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-yellow-400 text-xs font-bold text-yellow-500">
                                                i
                                            </div>

                                            {/* Text */}
                                            <div className="space-y-1">
                                                <p className="text-sm font-semibold text-[#1e3a8a]">
                                                    What happens next?
                                                </p>

                                                <p className="text-sm leading-relaxed text-gray-600">
                                                    You'll get immediate access
                                                    to the full platform for 30
                                                    days. No credit card
                                                    required. Choose a plan when
                                                    your trial ends.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Divider */}
                                    <div className="flex items-center gap-2">
                                        <div className="h-px flex-1 bg-gray-200" />
                                        <span className="text-[10px] text-gray-400">
                                            OR
                                        </span>
                                        <div className="h-px flex-1 bg-gray-200" />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white font-medium text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50"
                                    >
                                        {/* Google Icon */}
                                        <svg
                                            className="h-5 w-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="#EA4335"
                                                d="M12 10.2v3.9h5.5c-.2 1.3-1.5 3.8-5.5 3.8-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.2 14.6 2 12 2 6.9 2 2.7 6.2 2.7 11.3S6.9 20.7 12 20.7c6.1 0 9.3-4.3 9.3-9.4 0-.6-.1-1-.2-1.1H12z"
                                            />
                                            <path
                                                fill="#34A853"
                                                d="M3.5 7.7l3.2 2.3C7.6 8.1 9.6 6.7 12 6.7c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.2 14.6 2 12 2 8.1 2 4.8 4.3 3.5 7.7z"
                                            />
                                            <path
                                                fill="#FBBC05"
                                                d="M12 20.7c2.5 0 4.6-.8 6.1-2.2l-2.8-2.3c-.8.5-1.9.9-3.3.9-2.5 0-4.7-1.7-5.4-4l-3.2 2.5c1.3 3.6 4.7 6.1 8.6 6.1z"
                                            />
                                            <path
                                                fill="#4285F4"
                                                d="M21.3 11.3c0-.6-.1-1-.2-1.1H12v3.9h5.5c-.3 1.5-1.4 2.8-2.9 3.6l2.8 2.3c1.6-1.5 2.9-3.8 2.9-6.7z"
                                            />
                                        </svg>
                                        Sign up with Google
                                    </Button>
                                    <p className="text-center text-[13px] text-gray-500">
                                        Already have an account?{' '}
                                        <a
                                            href={login()}
                                            className="pl-0.2 font-medium text-yellow-600 underline-offset-2 hover:underline"
                                        >
                                            Login here
                                        </a>
                                    </p>
                                    <div className="flex items-center justify-center gap-2 text-[12px] text-gray-500">
                                        {/* Shield Icon */}
                                        <svg
                                            className="h-4 w-4 text-green-500"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 3l7 4v5c0 5-3.5 9-7 9s-7-4-7-9V7l7-4z"
                                            />
                                        </svg>

                                        {/* Text */}
                                        <span>
                                            Your data is secured with 256-bit
                                            SSL encryption
                                        </span>

                                        {/* Small sparkle icon */}
                                        <span className="text-xs text-yellow-400">
                                            ✦
                                        </span>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>
                </div>

                {/* FEATURES */}
                <div className="mx-auto max-w-md space-y-6">
                    {/* Heading */}
                    <h3 className="text-center text-[16px] font-semibold text-[#1e3a8a]">
                        What you get with your free trial:
                    </h3>

                    <div className="space-y-6">
                        {/* 1 */}
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="mt-[2px] h-5 w-5 text-yellow-500" />

                                <div>
                                    <p className="text-[14px] font-semibold text-[#1e3a8a]">
                                        Full Platform Access
                                    </p>
                                    <p className="text-[13px] leading-relaxed text-gray-600">
                                        Use all features including search, data
                                        entry, and reporting
                                    </p>
                                </div>
                            </div>

                            <Sparkles className="mt-1 h-4 w-4 text-yellow-400" />
                        </div>

                        {/* 2 */}
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                <Database className="mt-[2px] h-5 w-5 text-yellow-500" />

                                <div>
                                    <p className="text-[14px] font-semibold text-[#1e3a8a]">
                                        50,000+ Industry Records
                                    </p>
                                    <p className="text-[13px] leading-relaxed text-gray-600">
                                        Search and view comprehensive industry
                                        data
                                    </p>
                                </div>
                            </div>

                            <Sparkles className="mt-1 h-4 w-4 text-yellow-400" />
                        </div>

                        {/* 3 */}
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                <Users className="mt-[2px] h-5 w-5 text-yellow-500" />

                                <div>
                                    <p className="text-[14px] font-semibold text-[#1e3a8a]">
                                        Add Your Own Data
                                    </p>
                                    <p className="text-[13px] leading-relaxed text-gray-600">
                                        Contribute records and build your
                                        database
                                    </p>
                                </div>
                            </div>

                            <Sparkles className="mt-1 h-4 w-4 text-yellow-400" />
                        </div>

                        {/* 4 */}
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                <Shield className="mt-[2px] h-5 w-5 text-yellow-500" />

                                <div>
                                    <p className="text-[14px] font-semibold text-[#1e3a8a]">
                                        Data Ownership Protection
                                    </p>
                                    <p className="text-[13px] leading-relaxed text-gray-600">
                                        Your data remains yours, always
                                    </p>
                                </div>
                            </div>

                            <Sparkles className="mt-1 h-4 w-4 text-yellow-400" />
                        </div>

                        {/* 5 */}
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                <Mail className="mt-[2px] h-5 w-5 text-yellow-500" />

                                <div>
                                    <p className="text-[14px] font-semibold text-[#1e3a8a]">
                                        Priority Support
                                    </p>
                                    <p className="text-[13px] leading-relaxed text-gray-600">
                                        Get help when you need it via email
                                    </p>
                                </div>
                            </div>

                            <Sparkles className="mt-1 h-4 w-4 text-yellow-400" />
                        </div>

                        {/* 6 */}
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                <Calendar className="mt-[2px] h-5 w-5 text-yellow-500" />

                                <div>
                                    <p className="text-[14px] font-semibold text-[#1e3a8a]">
                                        No Commitments
                                    </p>
                                    <p className="text-[13px] leading-relaxed text-gray-600">
                                        Cancel anytime, no questions asked
                                    </p>
                                </div>
                            </div>

                            <Sparkles className="mt-1 h-4 w-4 text-yellow-400" />
                        </div>
                    </div>
                </div>
                {/* TRUST */}
                <div className="mx-auto max-w-md space-y-6 text-center">
                    {/* Top 3 items */}
                    <div className="flex items-center justify-between">
                        {/* 1 */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-50">
                                <Shield className="h-5 w-5 text-yellow-500" />
                            </div>
                            <p className="text-[13px] text-gray-600">
                                Secure Signup
                            </p>
                        </div>

                        {/* 2 */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-50">
                                <Lock className="h-5 w-5 text-yellow-500" />
                            </div>
                            <p className="text-[13px] text-gray-600">
                                SSL Encrypted
                            </p>
                        </div>

                        {/* 3 */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-50">
                                <Database className="h-5 w-5 text-yellow-500" />
                            </div>
                            <p className="text-[13px] text-gray-600">
                                GDPR Compliant
                            </p>
                        </div>
                    </div>

                    {/* Bottom stats */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-50">
                            <CheckCircle className="h-5 w-5 text-yellow-500" />
                        </div>

                        <p className="text-[13px] text-gray-600">500+ Users</p>
                    </div>
                </div>

                {/* TESTIMONIAL */}
                <div className="mx-auto max-w-[380px] rounded-xl bg-[#1e3a8a] p-5 text-white">
                    <p className="text-xs leading-relaxed">
                        “The free trial gave us time to test LemonGard
                        thoroughly. We were impressed by the data quality and
                        ease of use.”
                    </p>
                    <p className="mt-2 text-[10px] text-gray-300">
                        — Service Professional
                    </p>
                </div>

                {/* FAQ */}
                <div className="mx-auto max-w-[380px] space-y-2 text-xs">
                    <h3 className="text-center font-medium text-gray-800">
                        Quick Questions
                    </h3>

                    {[
                        'Do I need a credit card?',
                        'What happens after 30 days?',
                        'Can I cancel anytime?',
                    ].map((q, i) => (
                        <div key={i} className="rounded-md border p-2">
                            <button
                                onClick={() =>
                                    setOpenFaq(openFaq === i ? null : i)
                                }
                                className="w-full text-left font-medium"
                            >
                                {q}
                            </button>

                            {openFaq === i && (
                                <p className="mt-1 text-gray-500">
                                    No commitment required.
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {/* SUPPORT */}
                <div className="mx-auto max-w-[380px] rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-center">
                    <p className="text-sm font-medium">
                        Need Help Getting Started?
                    </p>
                    <p className="text-xs text-gray-600">
                        Our team is here to help.
                    </p>
                    <button className="mt-2 text-xs font-medium text-yellow-700 underline">
                        Contact Support
                    </button>
                </div>
            </div>
        </AuthLayout>
    );
}
