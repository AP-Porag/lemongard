import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import heroBg from '@/assets/hero-bg.png';
import {
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
    CheckCircle2,
    Info,
    Mail,
} from 'lucide-react';
import {
    LemonWhole,
    LemonSlice,
    LemonSimple,
    LogoBlack,
} from '@/components/public/LemonIcon';
import { Progress } from '@/components/ui/progress';
import Footer from '@/components/public/Footer';

/* ── Password Strength Calculator ──────────────────── */
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
                <span className={`font-medium ${color.replace('bg-', 'text-')}`}>
                    {label}
                </span>
            </div>
            <Progress value={value} className="h-1.5 [&>div]:transition-all" />
        </div>
    );
};

/* ── Benefits ───────────────────────────────────────── */
const benefits = [
    {
        icon: CheckCircle2,
        title: 'Secure Reset',
        desc: 'Your password reset is encrypted and secure',
    },
    {
        icon: Shield,
        title: 'Data Protection',
        desc: 'Your account and data remain protected',
    },
    {
        icon: LockKeyhole,
        title: 'Strong Passwords',
        desc: 'Create a password that keeps your account safe',
    },
];

/* ── Component Props ────────────────────────────────── */
type Props = {
    token: string;
    email: string;
};

/* ── Component ──────────────────────────────────────── */
export default function ResetPassword({ token, email }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        post('/reset-password', {
            onError: (errors) => {
                if (errors.email) {
                    setFormError(errors.email);
                }
            },
            onSuccess: () => {
                reset('password', 'password_confirmation');
            },
        });
    };

    const inputCls = (field: 'password' | 'password_confirmation') =>
        `w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-all outline-none text-gray-900 placeholder:text-gray-400 ${errors[field]
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-[#F8C734] focus:border-[#F8C734]'
        }`;

    return (
        <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
            <Head title="Reset Password" />

            {/* ── Nav ──────────────────────────────────────── */}
            <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="group flex items-center gap-2">
                        <LogoBlack className="h-12 w-auto" />
                    </Link>
                    <p className="text-sm text-gray-600">
                        Remember your password?{' '}
                        <Link
                            href="/login"
                            className="font-semibold text-[#F8C734] transition-colors hover:text-[#EAB308]"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </nav>

            {/* ── Background Pattern ──────────────────────── */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `url(${heroBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.12,
                }}
            />

            {/* ── Main Content ────────────────────────────── */}
            <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                <div className="w-full max-w-md">
                    {/* ── Header ─────────────────────────────── */}
                    <div className="mb-8 text-center">
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-800">
                            <LemonSimple className="h-4 w-4" />
                            🔒 Secure Password Reset
                        </span>
                        <h1 className="mb-2 text-3xl font-bold text-[#1E3A8A] md:text-4xl">
                            Reset Your Password
                        </h1>
                        <p className="leading-relaxed text-gray-600">
                            Create a new strong password for your LemonGard account
                        </p>
                    </div>

                    {/* Trust indicators */}
                    <div className="mb-8 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600 sm:gap-6 sm:text-sm">
                        {['Secure SSL', '256-bit Encryption', 'Protected Data'].map(
                            (t) => (
                                <span
                                    key={t}
                                    className="inline-flex items-center gap-1"
                                >
                                    <CheckCircle2 className="h-4 w-4 text-[#F8C734]" />
                                    {t}
                                </span>
                            )
                        )}
                    </div>

                    {/* ── Form Card ──────────────────────────── */}
                    <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl lg:p-10">
                        {/* Decorative Icons */}
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

                        {/* Error Alert */}
                        {formError && (
                            <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                                <p className="text-sm text-red-700">{formError}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                            {/* Email (Read Only) */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-[#1E3A8A]"
                                >
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        readOnly
                                        className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pr-4 pl-10 text-gray-500 outline-none cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            {/* New Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-[#1E3A8A]"
                                >
                                    New Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="new-password"
                                        autoFocus
                                        placeholder="Enter new password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        className={`${inputCls('password')} !pr-12`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
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
                                        {errors.password}
                                    </p>
                                )}
                                <PasswordStrength password={data.password} />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label
                                    htmlFor="password_confirmation"
                                    className="mb-2 block text-sm font-medium text-[#1E3A8A]"
                                >
                                    Confirm New Password{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        id="password_confirmation"
                                        type={showConfirm ? 'text' : 'password'}
                                        autoComplete="new-password"
                                        placeholder="Confirm new password"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                'password_confirmation',
                                                e.target.value
                                            )
                                        }
                                        className={`${inputCls('password_confirmation')} !pr-12`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
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
                                {errors.password_confirmation && (
                                    <p
                                        className="mt-1 flex items-center gap-1 text-sm text-red-500"
                                        role="alert"
                                    >
                                        <AlertCircle className="h-3.5 w-3.5" />{' '}
                                        {errors.password_confirmation}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#FCD34D] to-[#F8C734] px-8 py-4 font-bold text-[#1E3A8A] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-[#F8C734] hover:to-[#EAB308] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />{' '}
                                        Resetting Password...
                                    </>
                                ) : (
                                    <>
                                        Reset Password{' '}
                                        <ArrowRight className="h-5 w-5" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Tips */}
                        <div className="mt-6 flex items-start gap-3 rounded-r-lg border-l-4 border-blue-500 bg-blue-50 p-4">
                            <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
                            <div>
                                <p className="mb-1 text-sm font-semibold text-[#1E3A8A]">
                                    Password Tips
                                </p>
                                <ul className="space-y-1 text-sm text-gray-600">
                                    <li>• Use at least 8 characters</li>
                                    <li>• Include uppercase and lowercase letters</li>
                                    <li>• Add numbers and special characters</li>
                                    <li>• Don't reuse passwords from other sites</li>
                                </ul>
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

                        {/* Back to Login */}
                        <p className="text-center text-sm text-gray-600">
                            Remember your password?{' '}
                            <Link
                                href="/login"
                                className="font-semibold text-[#F8C734] transition-colors hover:text-[#EAB308]"
                            >
                                Log in
                            </Link>
                        </p>

                        {/* Security Info */}
                        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                            <Shield className="h-4 w-4 text-green-500" />
                            Your data is secured with 256-bit SSL encryption
                            <LemonSimple className="h-3 w-3 text-[#F8C734]" />
                        </div>
                    </div>

                    {/* ── Benefits ─────────────────────────────── */}
                    <div className="mt-12">
                        <h2 className="mb-6 text-center text-lg font-semibold text-[#1E3A8A]">
                            Your account security matters:
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
                                        <p className="text-sm text-gray-600">{desc}</p>
                                    </div>
                                    <LemonSimple className="mt-1 h-3 w-3 shrink-0 text-[#F8C734]" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Trust Badges ─────────────────────────── */}
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
                        {[
                            { icon: Shield, label: 'Secure Reset' },
                            { icon: LockKeyhole, label: 'SSL Encrypted' },
                            { icon: Database, label: 'Data Protected' },
                        ].map(({ icon: Icon, label }) => (
                            <div
                                key={label}
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="rounded-full bg-yellow-50 p-3">
                                    <Icon className="h-6 w-6 text-[#F8C734]" />
                                </div>
                                <span className="text-sm text-gray-600">{label}</span>
                            </div>
                        ))}
                    </div>

                    {/* ── Help Section ────────────────────────── */}
                    <div className="mt-8 rounded-xl border border-yellow-200 bg-yellow-50 p-6 text-center">
                        <HelpCircle className="mx-auto mb-3 h-6 w-6 text-[#F8C734]" />
                        <h3 className="mb-2 font-semibold text-[#1E3A8A]">
                            Need Help?
                        </h3>
                        <p className="mb-4 text-sm text-gray-600">
                            Having trouble resetting your password? Our support team is ready to assist.
                        </p>
                        <a
                            href="mailto:support@lemongard.com"
                            className="inline-flex items-center gap-1 text-sm font-medium text-[#F8C734] transition-colors hover:text-[#EAB308]"
                        >
                            Contact Support{' '}
                            <LemonWhole className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
