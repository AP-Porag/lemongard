import { useState } from 'react';
import { Head, Link, Form, router } from '@inertiajs/react';
import heroBg from '@/assets/hero-bg.png';
import {
    Mail,
    ArrowRight,
    Loader2,
    Shield,
    LockKeyhole,
    Database,
    HelpCircle,
    AlertCircle,
    CheckCircle2,
    ArrowLeft,
    Send,
} from 'lucide-react';
import {
    LemonWhole,
    LemonSimple,
    LogoBlack,
} from '@/components/public/LemonIcon';
import Footer from '@/components/public/Footer';

const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const handleResendEmail = () => {
        setEmailSent(false);
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
            <Head title="Forgot Password" />

            {/* Nav Section */}
            <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="group flex items-center gap-2">
                        <LogoBlack className="h-12 w-auto" />
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

            {/* Background Wrapper */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `url(${heroBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.12,
                }}
            />

            {/* Main Content */}
            <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        {!emailSent ? (
                            <>
                                <h1 className="mb-2 text-3xl font-bold text-[#1E3A8A] md:text-4xl">
                                    Forgot Password
                                </h1>
                                <p className="text-gray-600">
                                    Enter your email to receive a password reset link
                                </p>
                            </>
                        ) : (
                            <>
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                    <CheckCircle2 className="h-10 w-10 text-green-500" />
                                </div>
                                <h1 className="mb-2 text-3xl font-bold text-[#1E3A8A] md:text-4xl">
                                    Check Your Email
                                </h1>
                                <p className="text-gray-600">
                                    We've sent a password reset link to
                                </p>
                                <p className="font-semibold text-[#1E3A8A]">{userEmail}</p>
                            </>
                        )}
                    </div>

                    {/* Form Card */}
                    <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl lg:p-10">
                        {/* Decorative Icons */}
                        <LemonWhole className="pointer-events-none absolute top-3 right-3 h-6 w-6" opacity={0.1} />
                        <LemonWhole className="pointer-events-none absolute bottom-3 left-3 h-6 w-6" opacity={0.1} />

                        {!emailSent ? (
                            <>
                                {/* Forgot Password Form */}
                                <Form
                                    action="/forgot-password"
                                    method="post"
                                    onSuccess={(response) => {
                                        setUserEmail(response.props?.flash?.email || '');
                                        setEmailSent(true);
                                    }}
                                >
                                    {({ processing, errors }) => (
                                        <div className="space-y-6">
                                            {/* Email Input Field */}
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="mb-2 block text-sm font-medium text-[#1E3A8A]"
                                                >
                                                    Email Address <span className="text-red-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        autoComplete="off"
                                                        autoFocus
                                                        placeholder="you@company.com"
                                                        className={`w-full rounded-lg border py-3 pr-4 pl-10 text-gray-900 transition-all outline-none placeholder:text-gray-400 focus:border-[#F8C734] focus:ring-2 focus:ring-[#F8C734] ${errors.email
                                                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                                : 'border-gray-300'
                                                            }`}
                                                        required
                                                    />
                                                </div>

                                                {/* Error Handle */}
                                                {errors.email && (
                                                    <p
                                                        className="mt-1 flex items-center gap-1 text-sm text-red-500"
                                                        role="alert"
                                                    >
                                                        <AlertCircle className="h-3.5 w-3.5" />
                                                        {errors.email}
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
                                                        <Loader2 className="h-5 w-5 animate-spin" />
                                                        Sending Link...
                                                    </>
                                                ) : (
                                                    <>
                                                        Email Password Reset Link
                                                        <ArrowRight className="h-5 w-5" />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </Form>

                                {/* Divider */}
                                <div className="relative my-8">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200" />
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="bg-white px-3 text-sm text-gray-500">OR</span>
                                    </div>
                                </div>

                                {/* Back to Login */}
                                <p className="text-center text-sm text-gray-600">
                                    Or, Return to{' '}
                                    <Link
                                        href="/login"
                                        className="font-semibold text-[#F8C734] transition-colors hover:text-[#EAB308]"
                                    >
                                        Login
                                    </Link>
                                </p>
                            </>
                        ) : (
                            <>
                                {/* Success Message */}
                                <div className="space-y-6">
                                    <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-green-800">
                                                    Reset link sent successfully
                                                </h3>
                                                <div className="mt-2 text-sm text-green-700">
                                                    <p>
                                                        If the email address you entered matches an existing account,
                                                        you'll receive a password reset link shortly.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tips Section */}
                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                        <h4 className="mb-2 text-sm font-medium text-gray-900">
                                            Didn't receive the email?
                                        </h4>
                                        <ul className="space-y-1 text-sm text-gray-600">
                                            <li>• Check your spam or junk folder</li>
                                            <li>• Verify you entered the correct email address</li>
                                            <li>• Wait a few minutes and try again</li>
                                        </ul>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-3">
                                        <button
                                            onClick={handleResendEmail}
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[#F8C734] bg-white px-8 py-3.5 font-bold text-[#1E3A8A] transition-all duration-300 hover:bg-[#F8C734]/10"
                                        >
                                            <Send className="h-5 w-5" />
                                            Send Another Email
                                        </button>

                                        <Link
                                            href="/login"
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 px-8 py-3.5 font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-200"
                                        >
                                            <ArrowLeft className="h-5 w-5" />
                                            Back to Login
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Security Info */}
                        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                            <Shield className="h-4 w-4 text-green-500" />
                            Secured with SSL encryption
                            <LemonSimple className="h-3 w-3 text-[#F8C734]" />
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
                        {[
                            { icon: Shield, label: 'Secure Login' },
                            { icon: LockKeyhole, label: '256-bit SSL' },
                            { icon: Database, label: 'Data Protected' },
                        ].map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center gap-2">
                                <Icon className="h-5 w-5 text-[#F8C734]" />
                                <span className="text-sm text-gray-600">{label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Support Block */}
                    <div className="mt-8 rounded-xl border border-yellow-200 bg-yellow-50 p-6 text-center">
                        <HelpCircle className="mx-auto mb-3 h-6 w-6 text-[#F8C734]" />
                        <h3 className="mb-2 font-semibold text-[#1E3A8A]">Need Help?</h3>
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
            <Footer />
        </div>
    );
};

export default ForgotPassword;
