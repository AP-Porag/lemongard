import { Linkedin, Twitter } from 'lucide-react';
import LemonIcon from './LemonIcon';
import { Logo } from '@/components/public/LemonIcon';
import { LogoWhite } from '@/components/public/LemonIcon';

const productLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About Us', href: '#about' },
];

const legalLinks = [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms & Conditions', href: '#terms' },
    { label: 'Cookie Policy', href: '#cookies' },
];

const contactLinks = [
    { label: 'Contact Us', href: '#contact' },
    { label: 'Support', href: '#support' },
];

/**
 * Footer Component
 * Four-column layout with brand, navigation, and contact info
 */
const Footer = () => {
    return (
        <footer id="footer" className="section-container py-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                {/* Brand Column */}
                <div>
                    <a href="#home" className="flex items-center gap-2">
                        {/* <LemonIcon className="h-8 w-8 text-yellow-500" /> */}
                        <LogoWhite className="h-15 w-auto" />
                    </a>
                    <p className="footer-link-text mt-4 text-sm leading-relaxed">
                        Professional CRM & Data Platform for Service Industry
                    </p>
                    <div className="mt-6 flex gap-4">
                        <a
                            href="#linkedin"
                            className="text-gray-400 transition-colors hover:text-yellow-500"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="h-5 w-5" />
                        </a>
                        <a
                            href="#twitter"
                            className="text-gray-400 transition-colors hover:text-yellow-500"
                            aria-label="Twitter"
                        >
                            <Twitter className="h-5 w-5" />
                        </a>
                    </div>
                </div>

                {/* Product Column */}
                <div>
                    <h4 className="mb-4 font-semibold text-white">Product</h4>
                    <div className="space-y-3">
                        {productLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="footer-link-text block text-sm transition-colors hover:text-yellow-500"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Legal Column */}
                <div>
                    <h4 className="mb-4 font-semibold text-white">Legal</h4>
                    <div className="space-y-3">
                        {legalLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="footer-link-text block text-sm transition-colors hover:text-yellow-500"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Contact Column */}
                <div>
                    <h4 className="mb-4 font-semibold text-white">Contact</h4>
                    <div className="space-y-3">
                        {contactLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="footer-link-text block text-sm transition-colors hover:text-yellow-500"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="mailto:support@lemongard.com"
                            className="footer-link-text flex items-center gap-2 text-sm transition-colors hover:text-yellow-500"
                        >
                            <LemonIcon className="h-3 w-3 text-yellow-400" />
                            support@lemongard.com
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 border-t border-gray-200 pt-8">
                <p className="text-center text-sm text-gray-500">
                    © 2026 LemonGard. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
