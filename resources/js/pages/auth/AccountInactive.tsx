import { Link } from '@inertiajs/react';
import heroBg from '@/assets/hero-bg.png';
import { ShieldX, HelpCircle, Mail, ArrowLeft } from 'lucide-react';
import { LogoBlack, LemonSimple, LemonWhole } from '@/components/public/LemonIcon';
import Footer from '@/components/public/Footer';

const AccountInactive = () => {
    return (
        <div className="flex min-h-screen flex-col bg-[#FAFAFA]">

            {/* Navbar */}
            <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center">
                        <LogoBlack className="h-12 w-auto" />
                    </Link>
                </div>
            </nav>

            {/* Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${heroBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.12,
                }}
            />

            <main className="relative flex flex-1 items-center justify-center px-4 py-16">

                <div className="w-full max-w-xl">

                    {/* Heading */}
                    <div className="mb-8 text-center">

                        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700">
                            <ShieldX className="h-4 w-4" />
                            Account Inactive
                        </span>

                        <h1 className="text-4xl font-bold text-[#1E3A8A]">
                            Your Account Has Been Deactivated
                        </h1>

                        <p className="mt-4 text-gray-600">
                            Your account has been marked as inactive by an administrator.
                            For security reasons, access to your account has been disabled.
                        </p>

                    </div>

                    {/* Card */}
                    <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl">

                        <LemonWhole
                            className="absolute right-4 top-4 h-6 w-6 opacity-10"
                        />

                        <div className="mb-8 flex justify-center">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
                                <ShieldX className="h-12 w-12 text-red-600" />
                            </div>
                        </div>

                        <div className="rounded-xl border border-red-200 bg-red-50 p-6">

                            <h3 className="mb-4 text-lg font-semibold text-red-700">
                                Access Restricted
                            </h3>

                            <ul className="space-y-3 text-sm text-gray-700">
                                <li>• Your account is currently inactive.</li>
                                <li>• All active sessions have been terminated.</li>
                                <li>• Your subscription has been canceled.</li>
                                <li>• You cannot access your dashboard until your account is reactivated.</li>
                            </ul>

                        </div>

                        <div className="mt-8 rounded-xl border border-yellow-200 bg-yellow-50 p-5">

                            <div className="flex items-start gap-3">

                                <HelpCircle className="mt-1 h-5 w-5 text-[#F8C734]" />

                                <div>
                                    <h4 className="font-semibold text-[#1E3A8A]">
                                        Need Help?
                                    </h4>

                                    <p className="mt-2 text-sm text-gray-600">
                                        If you believe your account was deactivated by mistake,
                                        please contact our support team. We'll review your account
                                        and assist you as quickly as possible.
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                            <Link
                                href="/contact"
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#FCD34D] to-[#F8C734] px-6 py-4 font-bold text-[#1E3A8A] shadow-lg transition hover:scale-[1.02]"
                            >
                                <Mail className="h-5 w-5" />
                                Contact Support
                            </Link>

                            <Link
                                href="/"
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-4 font-semibold text-gray-700 transition hover:bg-gray-50"
                            >
                                <ArrowLeft className="h-5 w-5" />
                                Back to Home
                            </Link>

                        </div>

                    </div>

                </div>

            </main>

            <Footer />

        </div>
    );
};

export default AccountInactive;
