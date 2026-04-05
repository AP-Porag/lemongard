import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
} from '@/components/public/LemonIcon';

import { Progress } from '@/components/public/ui/progress';

const registerSchema = z
    .object({
        firstName: z.string().trim().min(2).max(50),
        lastName: z.string().trim().min(2).max(50),
        email: z.string().email(),
        company: z.string().max(100).optional(),
        industry: z.string().min(1),
        password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
        confirmPassword: z.string(),
        agreeToTerms: z.boolean().refine((v) => v),
        marketingEmails: z.boolean().optional(),
    })
    .refine((d) => d.password === d.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

type RegisterFormData = z.infer<typeof registerSchema>;

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

const industries = [
    'Service Industry',
    'Consulting',
    'Contracting',
    'Maintenance & Repair',
    'Professional Services',
    'Other',
];

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

    const onSubmit = async () => {
        setFormError(null);

        await new Promise((r) => setTimeout(r, 2000));

        setFormError(
            'Registration is not yet configured. This is a frontend preview.',
        );
    };

    const inputCls = (field: keyof RegisterFormData) =>
        `w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-all outline-none text-gray-900 placeholder:text-gray-400 ${
            errors[field]
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-[#F8C734] focus:border-[#F8C734]'
        }`;

    return (
        <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
            <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="group flex items-center gap-2">
                        <LemonWhole className="h-8 w-8 transition-transform group-hover:rotate-12" />
                        <span className="text-2xl font-bold text-[#1E3A8A]">
                            LemonGard
                        </span>
                    </Link>

                    <p className="text-sm text-gray-600">
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

            <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
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
                    <div className="mb-8 text-center">
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-800">
                            <LemonSimple className="h-4 w-4" />
                            🎉 30-Day Free Trial
                        </span>

                        <h1 className="mb-2 text-3xl font-bold text-[#1E3A8A] md:text-4xl">
                            Start Your Free Trial
                        </h1>

                        <p className="text-gray-600">
                            Create your account and get full access to LemonGard
                            for 30 days.
                        </p>
                    </div>

                    <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl lg:p-10">
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
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#1E3A8A]">
                                        First Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                        <input
                                            {...register('firstName')}
                                            className={inputCls('firstName')}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#1E3A8A]">
                                        Last Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                        <input
                                            {...register('lastName')}
                                            className={inputCls('lastName')}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#1E3A8A]">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        {...register('email')}
                                        className={inputCls('email')}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#1E3A8A]">
                                    Industry
                                </label>

                                <select
                                    {...register('industry')}
                                    className={inputCls('industry')}
                                >
                                    <option value="">
                                        Select your industry
                                    </option>

                                    {industries.map((i) => (
                                        <option key={i} value={i}>
                                            {i}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#1E3A8A]">
                                    Password
                                </label>

                                <div className="relative">
                                    <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        {...register('password')}
                                        className={`${inputCls('password')} !pr-12`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}{' '}
                                    </button>
                                </div>

                                <PasswordStrength password={password} />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#FCD34D] to-[#F8C734] px-8 py-4 font-bold text-[#1E3A8A] shadow-lg"
                            >
                                {isSubmitting ? (
                                    <>
                                        {' '}
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        Start My Free Trial{' '}
                                        <ArrowRight className="h-5 w-5" />
                                    </>
                                )}{' '}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Register;
