import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { LemonWhole } from "./LemonIcon";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

interface NavLinkItem {
  label: string;
  href: string;
  type: "hash" | "route";
}

const navLinks: NavLinkItem[] = [
  { label: "Home", href: "/", type: "route" },
  { label: "How It Works", href: "/how-it-works", type: "route" },
  { label: "About", href: "/about", type: "route" },
  { label: "Pricing", href: "/pricing", type: "route" },
  { label: "Contact", href: "/#contact", type: "hash" },
];

/**
 * Navigation Component
 * Fixed header with backdrop blur on scroll, mobile hamburger menu
 * Supports both React Router links and hash links
 */
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (link: NavLinkItem) => {
    if (link.type === "route") return location.pathname === link.href;
    return false;
  };

  const renderLink = (link: NavLinkItem, onClick?: () => void, extraClass?: string) => {
    const active = isActive(link);
    const className = `${extraClass || "text-navy-600 hover:text-yellow-500 font-medium transition-colors duration-300"} ${active ? "text-yellow-500 underline underline-offset-4" : ""}`;

    if (link.type === "route") {
      return (
        <Link key={link.label} to={link.href} onClick={onClick} className={className}>
          {link.label}
        </Link>
      );
    }

    // Hash links - if on home page, just scroll; otherwise navigate
    if (location.pathname === "/") {
      const hash = link.href.replace("/", "");
      return (
        <a key={link.label} href={hash} onClick={onClick} className={className}>
          {link.label}
        </a>
      );
    }

    return (
      <Link key={link.label} to={link.href} onClick={onClick} className={className}>
        {link.label}
      </Link>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="section-container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <LemonWhole className="w-8 h-8 transition-transform group-hover:rotate-12" />
            <span className="text-2xl font-bold text-navy-600">LemonGard</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => renderLink(link))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="text-navy-600 hover:text-yellow-500 font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn-primary !px-6 !py-2.5 !shadow-md"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-navy-600 hover:text-yellow-500 transition-colors"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-64 bg-white shadow-2xl md:hidden"
          >
            <div className="flex flex-col p-6 pt-20 gap-4">
              {navLinks.map((link) =>
                renderLink(link, () => setIsMobileMenuOpen(false), "text-navy-600 hover:text-yellow-500 font-medium py-2 transition-colors")
              )}
              <hr className="border-gray-200 my-2" />
              <Link
                to="/login"
                className="text-navy-600 hover:text-yellow-500 font-medium py-2 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn-primary !rounded-lg text-center !shadow-md"
              >
                Start Free Trial
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
