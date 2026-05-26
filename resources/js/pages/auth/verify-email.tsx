import { Head, Link, Form } from '@inertiajs/react';
import heroBg from '@/assets/hero-bg.png';
import {
    Mail,
    LogOut,
    Loader2,
    Shield,
    LockKeyhole,
    Database,
    HelpCircle,
    CheckCircle2,
} from 'lucide-react';
import {
    LemonWhole,
    LemonSimple,
    LogoBlack,
} from '@/components/public/LemonIcon';
import Footer from '@/components/public/Footer';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
            <Head title="Email Verification" />

            {/* Nav Section */}
            <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="group flex items-center gap-2">
                        <LogoBlack className="h-12 w-auto" />
                    </Link>
                    <div className="text-sm text-gray-600">
                        {/* কাস্টম লিংক বা মেথড না থাকলে সরাসরি /logout এ পোস্ট করার ব্যবস্থা করা হলো */}
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex items-center gap-1 font-semibold text-gray-500 transition-colors hover:text-red-500"
                        >
                            <LogOut className="h-4 w-4" />
                            Log out
                        </Link>
                    </div>
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
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-[#F8C734]">
                            <Mail className="h-6 w-6" />
                        </div>
                        <h1 className="mb-2 text-3xl font-bold text-[#1E3A8A] md:text-4xl">
                            Verify Email
                        </h1>
                        <p className="text-gray-600">
                            Please verify your email address by clicking on the link we just emailed to you.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl lg:p-10">
                        {/* Decorative Icons */}
                        <LemonWhole className="pointer-events-none absolute top-3 right-3 h-6 w-6" opacity={0.1} />
                        <LemonWhole className="pointer-events-none absolute bottom-3 left-3 h-6 w-6" opacity={0.1} />

                        {/* Status Message */}
                        {status === 'verification-link-sent' && (
                            <div className="mb-6 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                                <div>
                                    A new verification link has been sent to the email address you provided during registration.
                                </div>
                            </div>
                        )}

                        {/* Inertia Form for Resending Verification Link */}
                        {/* রাউট লিস্ট অনুযায়ী: POST email/verification-notification */}
                        <Form action="/email/verification-notification" method="post">
                            {({ processing }) => (
                                <div className="space-y-6">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#FCD34D] to-[#F8C734] px-8 py-4 font-bold text-[#1E3A8A] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-[#F8C734] hover:to-[#EAB308] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                                    >
                                        {processing ? (
                                            <>
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                Resending...
                                            </>
                                        ) : (
                                            <>
                                                Resend verification email
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </Form>

                        {/* Bottom Text */}
                        <p className="mt-8 text-center text-xs text-gray-500">
                            Could not find the email? Please check your spam folder or request a new link above.
                        </p>

                        {/* Security Info */}
                        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                            <Shield className="h-4 w-4 text-green-500" />
                            Secured Verification System
                            <LemonSimple className="h-3 w-3 text-[#F8C734]" />
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
                        {[
                            { icon: Shield, label: 'Secure Verification' },
                            { icon: LockKeyhole, label: 'Protected Link' },
                            { icon: Database, label: 'Data Encrypted' },
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
                        <h3 className="mb-2 font-semibold text-[#1E3A8A]">Still Having Issues?</h3>
                        <p className="mb-4 text-sm text-gray-600">
                            If you're not receiving the email, get in touch with support.
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
}
