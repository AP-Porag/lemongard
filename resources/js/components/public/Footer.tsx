import { Linkedin, Twitter } from "lucide-react";
import LemonIcon from "./LemonIcon";

const productLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About Us", href: "#about" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms & Conditions", href: "#terms" },
  { label: "Cookie Policy", href: "#cookies" },
];

const contactLinks = [
  { label: "Contact Us", href: "#contact" },
  { label: "Support", href: "#support" },
];

/**
 * Footer Component
 * Four-column layout with brand, navigation, and contact info
 */
const Footer = () => {
  return (
    <footer className="section-container py-12 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div>
          <a href="#home" className="flex items-center gap-2">
            <LemonIcon className="w-8 h-8 text-yellow-500" />
            <span className="text-xl font-bold text-navy-600">LemonGard</span>
          </a>
          <p className="text-sm text-gray-600 mt-4 leading-relaxed">
            Professional CRM & Data Platform for Service Industry
          </p>
          <div className="flex gap-4 mt-6">
            <a
              href="#linkedin"
              className="text-gray-400 hover:text-yellow-500 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#twitter"
              className="text-gray-400 hover:text-yellow-500 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Product Column */}
        <div>
          <h4 className="font-semibold text-navy-600 mb-4">Product</h4>
          <div className="space-y-3">
            {productLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-sm text-gray-600 hover:text-yellow-500 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Legal Column */}
        <div>
          <h4 className="font-semibold text-navy-600 mb-4">Legal</h4>
          <div className="space-y-3">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-sm text-gray-600 hover:text-yellow-500 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="font-semibold text-navy-600 mb-4">Contact</h4>
          <div className="space-y-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-sm text-gray-600 hover:text-yellow-500 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:support@lemongard.com"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-yellow-500 transition-colors"
            >
              <LemonIcon className="w-3 h-3 text-yellow-400" />
              support@lemongard.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-center text-sm text-gray-500">
          © 2026 LemonGard. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
