// import { Form, Head } from '@inertiajs/react';
// import InputError from '@/components/input-error';
// import TextLink from '@/components/text-link';
// import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Spinner } from '@/components/ui/spinner';
// import AuthLayout from '@/layouts/auth-layout';
// import { register } from '@/routes';
// import { store } from '@/routes/login';
// import { request } from '@/routes/password';

// type Props = {
//     status?: string;
//     canResetPassword: boolean;
//     canRegister: boolean;
// };

// export default function Login({
//     status,
//     canResetPassword,
//     canRegister,
// }: Props) {
//     return (
//         <AuthLayout
//             title="Log in to your account"
//             description="Enter your email and password below to log in"
//         >
//             <Head title="Log in" />

//             <Form
//                 {...store.form()}
//                 resetOnSuccess={['password']}
//                 className="flex flex-col gap-6"
//             >
//                 {({ processing, errors }) => (
//                     <>
//                         <div className="grid gap-6">
//                             <div className="grid gap-2">
//                                 <Label htmlFor="email">Email address</Label>
//                                 <Input
//                                     id="email"
//                                     type="email"
//                                     name="email"
//                                     required
//                                     autoFocus
//                                     tabIndex={1}
//                                     autoComplete="email"
//                                     placeholder="email@example.com"
//                                 />
//                                 <InputError message={errors.email} />
//                             </div>

//                             <div className="grid gap-2">
//                                 <div className="flex items-center">
//                                     <Label htmlFor="password">Password</Label>
//                                     {canResetPassword && (
//                                         <TextLink
//                                             href={request()}
//                                             className="ml-auto text-sm"
//                                             tabIndex={5}
//                                         >
//                                             Forgot password?
//                                         </TextLink>
//                                     )}
//                                 </div>
//                                 <Input
//                                     id="password"
//                                     type="password"
//                                     name="password"
//                                     required
//                                     tabIndex={2}
//                                     autoComplete="current-password"
//                                     placeholder="Password"
//                                 />
//                                 <InputError message={errors.password} />
//                             </div>

//                             <div className="flex items-center space-x-3">
//                                 <Checkbox
//                                     id="remember"
//                                     name="remember"
//                                     tabIndex={3}
//                                 />
//                                 <Label htmlFor="remember">Remember me</Label>
//                             </div>

//                             <Button
//                                 type="submit"
//                                 className="mt-4 w-full"
//                                 tabIndex={4}
//                                 disabled={processing}
//                                 data-test="login-button"
//                             >
//                                 {processing && <Spinner />}
//                                 Log in
//                             </Button>
//                         </div>

//                         {canRegister && (
//                             <div className="text-center text-sm text-muted-foreground">
//                                 Don't have an account?{' '}
//                                 <TextLink href={register()} tabIndex={5}>
//                                     Sign up
//                                 </TextLink>
//                             </div>
//                         )}
//                     </>
//                 )}
//             </Form>

//             {status && (
//                 <div className="mb-4 text-center text-sm font-medium text-green-600">
//                     {status}
//                 </div>
//             )}
//         </AuthLayout>
//     );
// }

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from '@inertiajs/react';
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
} from 'lucide-react';
import { LemonWhole, LemonSlice, LemonSimple } from '@/components/LemonIcon';

const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
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

    const onSubmit = (data: LoginFormData) => {
        setFormError(null);

        router.post('/login', data, {
            onError: (errors: any) => {
                if (errors.email) setFormError(errors.email);
                if (errors.password) setFormError(errors.password);
            },
        });
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
            {/* Simplified Nav */}
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
                {/* Background Lemons */}
                <LemonSlice
                    className="pointer-events-none absolute top-0 left-0 -mt-32 -ml-32 h-96 w-96"
                    opacity={0.05}
                />
                <LemonSlice
                    className="pointer-events-none absolute right-0 bottom-0 -mr-20 -mb-20 h-64 w-64"
                    opacity={0.05}
                />

                <div className="w-full max-w-md">
                    {/* Welcome */}
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

                    {/* Card */}
                    <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl lg:p-10">
                        {/* Corner lemons */}
                        <LemonWhole
                            className="pointer-events-none absolute top-3 right-3 h-6 w-6"
                            opacity={0.1}
                        />
                        <LemonWhole
                            className="pointer-events-none absolute bottom-3 left-3 h-6 w-6"
                            opacity={0.1}
                        />

                        {/* Form-level error */}
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
                                        className={`w-full rounded-lg border py-3 pr-4 pl-10 text-gray-900 transition-all outline-none placeholder:text-gray-400 focus:border-[#F8C734] focus:ring-2 focus:ring-[#F8C734] ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
                                    />
                                </div>
                                {errors.email && (
                                    <p
                                        className="mt-1 flex items-center gap-1 text-sm text-red-500"
                                        role="alert"
                                    >
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
                                        className={`w-full rounded-lg border py-3 pr-12 pl-10 text-gray-900 transition-all outline-none placeholder:text-gray-400 focus:border-[#F8C734] focus:ring-2 focus:ring-[#F8C734] ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
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
                                        <AlertCircle className="h-3.5 w-3.5" />
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Remember / Forgot */}
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
                                    to="/"
                                    className="text-sm font-medium text-[#F8C734] transition-colors hover:text-[#EAB308]"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#FCD34D] to-[#F8C734] px-8 py-4 font-bold text-[#1E3A8A] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-[#F8C734] hover:to-[#EAB308] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
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

                        {/* Social Buttons */}
                        <div className="space-y-3">
                            <a href="/auth/google/redirect">
                                <button
                                    type="button"
                                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-gray-300 px-8 py-3 font-semibold text-gray-700 transition-all duration-300 hover:border-[#F8C734] hover:bg-gray-50"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                    >
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
                                    Continue with Google
                                </button>
                            </a>
                        </div>

                        {/* Sign up link */}
                        <p className="mt-8 text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link
                                to="/register"
                                className="font-semibold text-[#F8C734] transition-colors hover:text-[#EAB308]"
                            >
                                Start your free trial
                            </Link>
                        </p>

                        {/* Security badge */}
                        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                            <Shield className="h-4 w-4 text-green-500" />
                            Secured with SSL encryption
                            <LemonSimple className="h-3 w-3 text-[#F8C734]" />
                        </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
                        {[
                            { icon: Shield, label: 'Secure Login' },
                            { icon: LockKeyhole, label: '256-bit SSL' },
                            { icon: Database, label: 'Data Protected' },
                        ].map(({ icon: Icon, label }) => (
                            <div
                                key={label}
                                className="flex items-center gap-2"
                            >
                                <Icon className="h-5 w-5 text-[#F8C734]" />
                                <span className="text-sm text-gray-600">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Help */}
                    <div className="mt-8 rounded-xl border border-yellow-200 bg-yellow-50 p-6 text-center">
                        <HelpCircle className="mx-auto mb-3 h-6 w-6 text-[#F8C734]" />
                        <h3 className="mb-2 font-semibold text-[#1E3A8A]">
                            Need Help?
                        </h3>
                        <p className="mb-4 text-sm text-gray-600">
                            Having trouble logging in? Contact our support team.
                        </p>
                        <a
                            href="mailto:support@lemongard.com"
                            className="inline-flex items-center gap-1 text-sm font-medium text-[#F8C734] transition-colors hover:text-[#EAB308]"
                        >
                            Contact Support
                            <LemonSimple className="h-3 w-3" />
                        </a>
                    </div>
                </div>
            </main>

            {/* Minimal Footer */}
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

export default Login;
