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
} from 'lucide-react';

import {
    LemonWhole,
    LemonSlice,
    LemonSimple,
} from '@/components/public/LemonIcon';

const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: { rememberMe: false },
    });

    const onSubmit = async (data: LoginFormData) => {
        setFormError(null);

        console.log('Login data:', data);

        await new Promise((resolve) => setTimeout(resolve, 1500));

        setFormError(
            'Authentication is not yet configured. This is a frontend preview.',
        );
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="group flex items-center gap-2">
                        <LemonWhole className="h-8 w-8 transition-transform group-hover:rotate-12" />
                        <span className="text-2xl font-bold text-[#1E3A8A]">
                            LemonGard
                        </span>
                    </Link>

                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link
                            href="/register"
                            className="font-semibold text-[#F8C734] transition-colors hover:text-[#EAB308]"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </nav>

            {/* Login Section */}
            <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                {/* Background Decorations */}
                <LemonSlice
                    className="pointer-events-none absolute top-0 left-0 -mt-32 -ml-32 h-96 w-96"
                    opacity={0.05}
                />

                <LemonSlice
                    className="pointer-events-none absolute right-0 bottom-0 -mr-20 -mb-20 h-64 w-64"
                    opacity={0.05}
                />

                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-800">
                            <LemonSimple className="h-4 w-4" />
                            Welcome Back
                        </span>

                        <h1 className="mb-2 text-3xl font-bold text-[#1E3A8A] md:text-4xl">
                            Login to LemonGard
                        </h1>

                        <p className="text-gray-600">
                            Access your CRM dashboard and shared industry data
                        </p>
                    </div>

                    {/* Login Card */}
                    <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl lg:p-10">
                        <LemonWhole
                            className="pointer-events-none absolute top-3 right-3 h-6 w-6"
                            opacity={0.1}
                        />

                        <LemonWhole
                            className="pointer-events-none absolute bottom-3 left-3 h-6 w-6"
                            opacity={0.1}
                        />

                        {/* Form Error */}
                        {formError && (
                            <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                                <p className="text-sm text-red-700">
                                    {formError}
                                </p>
                            </div>
                        )}

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                            noValidate
                        >
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
                                        placeholder="you@company.com"
                                        {...register('email')}
                                        className={`w-full rounded-lg border py-3 pr-4 pl-10 text-gray-900 transition-all outline-none placeholder:text-gray-400 focus:border-[#F8C734] focus:ring-2 focus:ring-[#F8C734] ${
                                            errors.email
                                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                : 'border-gray-300'
                                        }`}
                                    />
                                </div>

                                {errors.email && (
                                    <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
                                        <AlertCircle className="h-3.5 w-3.5" />
                                        {errors.email.message}
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
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        {...register('password')}
                                        className={`w-full rounded-lg border py-3 pr-12 pl-10 text-gray-900 transition-all outline-none placeholder:text-gray-400 focus:border-[#F8C734] focus:ring-2 focus:ring-[#F8C734] ${
                                            errors.password
                                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                : 'border-gray-300'
                                        }`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-[#1E3A8A]"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>

                                {errors.password && (
                                    <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
                                        <AlertCircle className="h-3.5 w-3.5" />
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center justify-between">
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="checkbox"
                                        {...register('rememberMe')}
                                        className="h-4 w-4 rounded accent-[#F8C734]"
                                    />
                                    <span className="text-sm text-gray-600">
                                        Remember me
                                    </span>
                                </label>

                                <Link
                                    href="/"
                                    className="text-sm font-medium text-[#F8C734] hover:text-[#EAB308]"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#FCD34D] to-[#F8C734] px-8 py-4 font-bold text-[#1E3A8A] shadow-lg transition-all duration-300 hover:from-[#F8C734] hover:to-[#EAB308] hover:shadow-xl disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Logging in...
                                    </>
                                ) : (
                                    <>
                                        Login to Dashboard
                                        <ArrowRight className="h-5 w-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
