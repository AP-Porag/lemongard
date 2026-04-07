import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from '@inertiajs/react';
import { login } from '@/routes';
import { router } from '@inertiajs/react';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Loader2,
    Shield,
    LockKeyhole,
    Database,
    HelpCircle,
    AlertCircle,
    User,
    Building2,
    Briefcase,
    CheckCircle2,
    Calendar,
    Users,
    Info,
} from 'lucide-react';
import {
    LemonWhole,
    LemonSlice,
    LemonSimple,
    LemonHalf,
} from '@/components/LemonIcon';
import { Progress } from '@/components/ui/progress';

/* ── Zod Schema ─────────────────────────────────────── */
const registerSchema = z
    .object({
        firstName: z
            .string()
            .trim()
            .min(2, 'First name must be at least 2 characters')
            .max(50, 'First name is too long'),
        lastName: z
            .string()
            .trim()
            .min(2, 'Last name must be at least 2 characters')
            .max(50, 'Last name is too long'),
        email: z
            .string()
            .trim()
            .min(1, 'Email is required')
            .email('Please enter a valid email address')
            .max(255),
        company: z.string().max(100).optional(),
        industry: z.string().min(1, 'Please select your industry'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(
                /[A-Z]/,
                'Password must contain at least one uppercase letter',
            )
            .regex(/[0-9]/, 'Password must contain at least one number'),
        confirmPassword: z.string().min(1, 'Please confirm your password'),
        agreeToTerms: z
            .boolean()
            .refine((v) => v, 'You must accept the terms and conditions'),
        marketingEmails: z.boolean().optional(),
    })
    .refine((d) => d.password === d.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

type RegisterFormData = z.infer<typeof registerSchema>;

/* ── Password Strength ──────────────────────────────── */
const calcStrength = (pwd: string) => {
    let s = 0;
    if (pwd.length >= 8) s++;
    if (pwd.length >= 12) s++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) s++;
    if (/[0-9]/.test(pwd)) s++;
    if (/[^a-zA-Z0-9]/.test(pwd)) s++;
    if (s <= 2) return { value: 33, label: 'Weak', color: 'bg-red-500' };
    if (s <= 4) return { value: 66, label: 'Medium', color: 'bg-yellow-500' };
    return { value: 100, label: 'Strong', color: 'bg-green-500' };
};

const PasswordStrength = ({ password }: { password: string }) => {
    if (!password) return null;
    const { value, label, color } = calcStrength(password);
    return (
        <div className="mt-2 space-y-1">
            <div className="flex justify-between text-xs">
                <span className="text-gray-500">Password strength:</span>
                <span
                    className={`font-medium ${color.replace('bg-', 'text-')}`}
                >
                    {label}
                </span>
            </div>
            <Progress value={value} className="h-1.5 [&>div]:transition-all" />
        </div>
    );
};

/* ── Industries ─────────────────────────────────────── */
const industries = [
    'Service Industry',
    'Consulting',
    'Contracting',
    'Maintenance & Repair',
    'Professional Services',
    'Other',
];

/* ── Benefits ───────────────────────────────────────── */
const benefits = [
    {
        icon: CheckCircle2,
        title: 'Full Platform Access',
        desc: 'Use all features including search, data entry, and reporting',
    },
    {
        icon: Database,
        title: '50,000+ Industry Records',
        desc: 'Search and view comprehensive industry data',
    },
    {
        icon: Users,
        title: 'Add Your Own Data',
        desc: 'Contribute records and build your database',
    },
    {
        icon: Shield,
        title: 'Data Ownership Protection',
        desc: 'Your data remains yours, always',
    },
    {
        icon: Mail,
        title: 'Priority Support',
        desc: 'Get help when you need it via email',
    },
    {
        icon: Calendar,
        title: 'No Commitments',
        desc: 'Cancel anytime, no questions asked',
    },
];

/* ── Component ──────────────────────────────────────── */
const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: { agreeToTerms: false, marketingEmails: false },
    });

    const password = watch('password') || '';

    const onSubmit = (data: RegisterFormData) => {
        setFormError(null);

        router.post(
            '/register',
            {
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                password: data.password,
                password_confirmation: data.confirmPassword,
                industry: data.industry,
                company: data.company,
                agree_to_terms: data.agreeToTerms,
                marketing_emails: data.marketingEmails,
            },
            {
                onError: (errors) => {
                    if (errors.email) {
                        setFormError(errors.email); // ✅ SHOW EMAIL ERROR
                    }
                },
            },
        );
    };

    /* helper: input class */
    const inputCls = (field: keyof RegisterFormData) =>
        `w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-all outline-none text-gray-900 placeholder:text-gray-400 ${
            errors[field]
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-[#F8C734] focus:border-[#F8C734]'
        }`;

    return (
        <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
            {/* ── Nav ──────────────────────────────────────── */}
            <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="group flex items-center gap-2">
                        <LemonWhole className="h-8 w-8 transition-transform group-hover:rotate-12" />
                        <span className="text-2xl font-bold text-[#1E3A8A]">
                            LemonGard
                        </span>
                    </Link>
                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="font-semibold text-[#F8C734] transition-colors hover:text-[#EAB308]"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </nav>

            {/* ── Main ─────────────────────────────────────── */}
            <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                {/* Background watermarks */}
                <LemonSlice
                    className="pointer-events-none absolute top-0 left-0 -mt-32 -ml-32 h-96 w-96"
                    opacity={0.05}
                />
                <LemonSlice
                    className="pointer-events-none absolute right-0 bottom-0 -mr-20 -mb-20 h-64 w-64"
                    opacity={0.05}
                />
                <LemonHalf
                    className="pointer-events-none absolute top-1/2 right-0 h-48 w-48"
                    opacity={0.05}
                />

                <div className="w-full max-w-md">
                    {/* ── Header ─────────────────────────────── */}
                    <div className="mb-8 text-center">
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-800">
                            <LemonSimple className="h-4 w-4" />
                            🎉 30-Day Free Trial
                        </span>
                        <h1 className="mb-2 text-3xl font-bold text-[#1E3A8A] md:text-4xl">
                            Start Your Free Trial
                        </h1>
                        <p className="leading-relaxed text-gray-600">
                            Create your account and get full access to LemonGard
                            for 30&nbsp;days. No credit card required.
                        </p>
                    </div>

                    {/* Trust indicators */}
                    <div className="mb-8 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600 sm:gap-6 sm:text-sm">
                        {[
                            'No Credit Card',
                            'Cancel Anytime',
                            'Full Access',
                        ].map((t) => (
                            <span
                                key={t}
                                className="inline-flex items-center gap-1"
                            >
                                <CheckCircle2 className="h-4 w-4 text-[#F8C734]" />
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* ── Card ───────────────────────────────── */}
                    <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl lg:p-10">
                        <LemonWhole
                            className="pointer-events-none absolute top-3 right-3 h-6 w-6"
                            opacity={0.1}
                        />
                        <LemonWhole
                            className="pointer-events-none absolute bottom-3 left-3 h-6 w-6"
                            opacity={0.1}
                        />
                        <LemonSlice
                            className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2"
                            opacity={0.03}
                        />

                        {formError && (
                            <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                                <p className="text-sm text-red-700">
                                    {formError}
                                </p>
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-5"
                            noValidate
                        >
                            {/* Name row */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* First Name */}
                                <div>
                                    <label
                                        htmlFor="firstName"
                                        className="mb-2 block text-sm font-medium text-[#1E3A8A]"
                                    >
                                        First Name{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                        <input
                                            id="firstName"
                                            placeholder="John"
                                            {...register('firstName')}
                                            className={inputCls('firstName')}
                                        />
                                    </div>
                                    {errors.firstName && (
                                        <p
                                            className="mt-1 flex items-center gap-1 text-sm text-red-500"
                                            role="alert"
                                        >
                                            <AlertCircle className="h-3.5 w-3.5" />{' '}
                                            {errors.firstName.message}
                                        </p>
                                    )}
                                </div>
                                {/* Last Name */}
                                <div>
                                    <label
                                        htmlFor="lastName"
                                        className="mb-2 block text-sm font-medium text-[#1E3A8A]"
                                    >
                                        Last Name{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                        <input
                                            id="lastName"
                                            placeholder="Doe"
                                            {...register('lastName')}
                                            className={inputCls('lastName')}
                                        />
                                    </div>
                                    {errors.lastName && (
                                        <p
                                            className="mt-1 flex items-center gap-1 text-sm text-red-500"
                                            role="alert"
                                        >
                                            <AlertCircle className="h-3.5 w-3.5" />{' '}
                                            {errors.lastName.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-[#1E3A8A]"
                                >
                                    Email Address{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="john.doe@company.com"
                                        {...register('email')}
                                        className={inputCls('email')}
                                    />
                                </div>
                                {errors.email && (
                                    <p
                                        className="mt-1 flex items-center gap-1 text-sm text-red-500"
                                        role="alert"
                                    >
                                        <AlertCircle className="h-3.5 w-3.5" />{' '}
                                        {errors.email.message}
                                    </p>
                                )}
                                {/* {formError && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {formError}
                                    </p>
                                )} */}
                            </div>

                            {/* Company */}
                            <div>
                                <label
                                    htmlFor="company"
                                    className="mb-2 block text-sm font-medium text-[#1E3A8A]"
                                >
                                    Company or Business Name{' '}
                                    <span className="text-gray-400">
                                        (Optional)
                                    </span>
                                </label>
                                <div className="relative">
                                    <Building2 className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        id="company"
                                        placeholder="Your Company Name"
                                        {...register('company')}
                                        className={inputCls('company')}
                                    />
                                </div>
                            </div>

                            {/* Industry */}
                            <div>
                                <label
                                    htmlFor="industry"
                                    className="mb-2 block text-sm font-medium text-[#1E3A8A]"
                                >
                                    Industry{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Briefcase className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <select
                                        id="industry"
                                        {...register('industry')}
                                        className={`${inputCls('industry')} appearance-none`}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            Select your industry
                                        </option>
                                        {industries.map((i) => (
                                            <option key={i} value={i}>
                                                {i}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.industry && (
                                    <p
                                        className="mt-1 flex items-center gap-1 text-sm text-red-500"
                                        role="alert"
                                    >
                                        <AlertCircle className="h-3.5 w-3.5" />{' '}
                                        {errors.industry.message}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-[#1E3A8A]"
                                >
                                    Password{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        id="password"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        autoComplete="new-password"
                                        placeholder="Create a strong password"
                                        {...register('password')}
                                        className={`${inputCls('password')} !pr-12`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-[#1E3A8A]"
                                        aria-label={
                                            showPassword
                                                ? 'Hide password'
                                                : 'Show password'
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p
                                        className="mt-1 flex items-center gap-1 text-sm text-red-500"
                                        role="alert"
                                    >
                                        <AlertCircle className="h-3.5 w-3.5" />{' '}
                                        {errors.password.message}
                                    </p>
                                )}
                                <PasswordStrength password={password} />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-2 block text-sm font-medium text-[#1E3A8A]"
                                >
                                    Confirm Password{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        id="confirmPassword"
                                        type={showConfirm ? 'text' : 'password'}
                                        autoComplete="new-password"
                                        placeholder="Re-enter your password"
                                        {...register('confirmPassword')}
                                        className={`${inputCls('confirmPassword')} !pr-12`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirm(!showConfirm)
                                        }
                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-[#1E3A8A]"
                                        aria-label={
                                            showConfirm
                                                ? 'Hide password'
                                                : 'Show password'
                                        }
                                    >
                                        {showConfirm ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p
                                        className="mt-1 flex items-center gap-1 text-sm text-red-500"
                                        role="alert"
                                    >
                                        <AlertCircle className="h-3.5 w-3.5" />{' '}
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>

                            {/* Terms */}
                            <div className="space-y-3 pt-2">
                                <label className="flex cursor-pointer items-start gap-3">
                                    <input
                                        type="checkbox"
                                        {...register('agreeToTerms')}
                                        className="mt-0.5 h-4 w-4 rounded accent-[#F8C734]"
                                    />
                                    <span className="text-sm text-gray-600">
                                        I agree to the{' '}
                                        <Link
                                            to="/"
                                            className="text-[#F8C734] underline hover:text-[#EAB308]"
                                        >
                                            Terms &amp; Conditions
                                        </Link>{' '}
                                        and{' '}
                                        <Link
                                            to="/"
                                            className="text-[#F8C734] underline hover:text-[#EAB308]"
                                        >
                                            Privacy Policy
                                        </Link>
                                        <LemonSimple className="ml-1 inline-block h-3 w-3 text-[#F8C734]" />
                                    </span>
                                </label>
                                {errors.agreeToTerms && (
                                    <p
                                        className="flex items-center gap-1 text-sm text-red-500"
                                        role="alert"
                                    >
                                        <AlertCircle className="h-3.5 w-3.5" />{' '}
                                        {errors.agreeToTerms.message}
                                    </p>
                                )}

                                <label className="flex cursor-pointer items-start gap-3">
                                    <input
                                        type="checkbox"
                                        {...register('marketingEmails')}
                                        className="mt-0.5 h-4 w-4 rounded accent-[#F8C734]"
                                    />
                                    <span className="text-sm text-gray-600">
                                        Send me product updates, tips, and
                                        special offers via email
                                    </span>
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#FCD34D] to-[#F8C734] px-8 py-4 font-bold text-[#1E3A8A] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-[#F8C734] hover:to-[#EAB308] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />{' '}
                                        Creating your account...
                                    </>
                                ) : (
                                    <>
                                        Start My Free Trial{' '}
                                        <ArrowRight className="h-5 w-5" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Trial reminder */}
                        <div className="mt-6 flex items-start gap-3 rounded-r-lg border-l-4 border-[#F8C734] bg-yellow-50 p-4">
                            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#F8C734]" />
                            <div>
                                <p className="mb-1 text-sm font-semibold text-[#1E3A8A]">
                                    What happens next?
                                </p>
                                <p className="text-sm text-gray-600">
                                    You'll get immediate access to the full
                                    platform for 30 days. No credit card
                                    required. Choose a plan when your trial
                                    ends.
                                </p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-white px-3 text-sm text-gray-500">
                                    OR
                                </span>
                            </div>
                        </div>

                        {/* Social */}
                        <a href="/auth/google/redirect">
                            <button
                                type="button"
                                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-gray-300 px-8 py-3 font-semibold text-gray-700 transition-all duration-300 hover:border-[#F8C734] hover:bg-gray-50"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Sign up with Google
                            </button>
                        </a>

                        {/* Login link */}
                        <p className="mt-8 text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link
                                href={login()}
                                className="font-semibold text-[#F8C734] transition-colors hover:text-[#EAB308]"
                            >
                                Login
                            </Link>
                        </p>

                        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                            <Shield className="h-4 w-4 text-green-500" />
                            Your data is secured with 256-bit SSL encryption
                            <LemonSimple className="h-3 w-3 text-[#F8C734]" />
                        </div>
                    </div>

                    {/* ── Benefits ─────────────────────────────── */}
                    <div className="mt-12">
                        <h2 className="mb-6 text-center text-lg font-semibold text-[#1E3A8A]">
                            What you get with your free trial:
                        </h2>
                        <div className="space-y-3">
                            {benefits.map(({ icon: Icon, title, desc }) => (
                                <div
                                    key={title}
                                    className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-yellow-50"
                                >
                                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#F8C734]" />
                                    <div>
                                        <p className="text-sm font-medium text-[#1E3A8A]">
                                            {title}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {desc}
                                        </p>
                                    </div>
                                    <LemonSimple className="mt-1 h-3 w-3 shrink-0 text-[#F8C734]" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Trust Badges ─────────────────────────── */}
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
                        {[
                            { icon: Shield, label: 'Secure Signup' },
                            { icon: LockKeyhole, label: 'SSL Encrypted' },
                            { icon: Database, label: 'GDPR Compliant' },
                            { icon: CheckCircle2, label: '500+ Users' },
                        ].map(({ icon: Icon, label }) => (
                            <div
                                key={label}
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="rounded-full bg-yellow-50 p-3">
                                    <Icon className="h-6 w-6 text-[#F8C734]" />
                                </div>
                                <span className="text-sm text-gray-600">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* ── Testimonial ──────────────────────────── */}
                    <div className="relative mt-12 overflow-hidden rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] p-8 text-white">
                        <LemonSlice
                            className="pointer-events-none absolute top-2 right-2 h-20 w-20 text-white"
                            opacity={0.1}
                        />
                        <svg
                            className="mb-4 h-8 w-8 text-[#F8C734]"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                        <p className="mb-4 text-lg leading-relaxed font-medium">
                            "The free trial gave us time to test LemonGard
                            thoroughly. We were impressed by the data quality
                            and ease of use."
                        </p>
                        <p className="text-sm text-gray-400">
                            — Service Professional
                        </p>
                    </div>

                    {/* ── Quick FAQ ────────────────────────────── */}
                    <div className="mt-12 rounded-2xl bg-gray-50 p-8">
                        <h3 className="mb-6 text-center font-semibold text-[#1E3A8A]">
                            Quick Questions
                        </h3>
                        <div className="space-y-4">
                            {[
                                {
                                    q: 'Do I need a credit card?',
                                    a: 'No! Start your trial without any payment information.',
                                },
                                {
                                    q: 'What happens after 30 days?',
                                    a: "We'll remind you before your trial ends. Choose a plan or let it expire—your choice.",
                                },
                                {
                                    q: 'Can I cancel anytime?',
                                    a: 'Yes! Cancel during or after your trial with no penalties.',
                                },
                            ].map(({ q, a }) => (
                                <div key={q}>
                                    <p className="flex items-center gap-1 text-sm font-medium text-[#1E3A8A]">
                                        <LemonSimple className="h-3 w-3 text-[#F8C734]" />{' '}
                                        {q}
                                    </p>
                                    <p className="mt-1 ml-4 text-sm text-gray-600">
                                        {a}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Help ─────────────────────────────────── */}
                    <div className="mt-8 rounded-xl border border-yellow-200 bg-yellow-50 p-6 text-center">
                        <HelpCircle className="mx-auto mb-3 h-6 w-6 text-[#F8C734]" />
                        <h3 className="mb-2 font-semibold text-[#1E3A8A]">
                            Need Help Getting Started?
                        </h3>
                        <p className="mb-4 text-sm text-gray-600">
                            Our team is here to help you set up your account.
                        </p>
                        <a
                            href="mailto:support@lemongard.com"
                            className="inline-flex items-center gap-1 text-sm font-medium text-[#F8C734] transition-colors hover:text-[#EAB308]"
                        >
                            Contact Support <LemonWhole className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </main>

            {/* ── Footer ───────────────────────────────────── */}
            <footer className="mx-auto w-full max-w-7xl border-t border-gray-200 px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <LemonWhole className="h-6 w-6" />© 2026 LemonGard. All
                        rights reserved.
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <Link
                            to="/"
                            className="transition-colors hover:text-[#F8C734]"
                        >
                            Privacy Policy
                        </Link>
                        <LemonSimple className="h-3 w-3 text-[#F8C734]" />
                        <Link
                            to="/"
                            className="transition-colors hover:text-[#F8C734]"
                        >
                            Terms
                        </Link>
                        <LemonSimple className="h-3 w-3 text-[#F8C734]" />
                        <Link
                            to="/"
                            className="transition-colors hover:text-[#F8C734]"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Register;
