"use strict";
exports.__esModule = true;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var framer_motion_1 = require("framer-motion");
var react_2 = require("@inertiajs/react");
var LemonIcon_1 = require("@/components/public/LemonIcon");
var navLinks = [
    { label: 'Home', href: '/', type: 'route' },
    { label: 'How It Works', href: '/how-it-works', type: 'route' },
    { label: 'About', href: '/about', type: 'route' },
    { label: 'Pricing', href: '/pricing', type: 'route' },
    { label: 'Contact', href: '/contact', type: 'route' },
];
var Navigation = function () {
    var _a;
    var _b = react_1.useState(false), isScrolled = _b[0], setIsScrolled = _b[1];
    var _c = react_1.useState(false), isMobileMenuOpen = _c[0], setIsMobileMenuOpen = _c[1];
    var _d = react_2.usePage(), url = _d.url, props = _d.props;
    var auth = props.auth;
    react_1.useEffect(function () {
        var handleScroll = function () {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return function () { return window.removeEventListener('scroll', handleScroll); };
    }, []);
    var isActive = function (link) {
        if (link.type === 'route')
            return url === link.href;
        return false;
    };
    var renderLink = function (link, onClick, extraClass) {
        var active = isActive(link);
        var className = (extraClass ||
            'text-navy-600 hover:text-yellow-500 font-medium transition-colors duration-300') + " " + (active ? 'text-yellow-500 underline underline-offset-4' : '');
        if (link.type === 'route') {
            return (React.createElement(react_2.Link, { key: link.label, href: link.href, onClick: onClick, className: className }, link.label));
        }
        if (url === '/') {
            var hash = link.href.replace('/', '');
            return (React.createElement("a", { key: link.label, href: hash, onClick: onClick, className: className }, link.label));
        }
        return (React.createElement(react_2.Link, { key: link.label, href: link.href, onClick: onClick, className: className }, link.label));
    };
    return (React.createElement("nav", { className: "fixed top-0 right-0 left-0 z-50 transition-all duration-300 " + (isScrolled
            ? 'bg-white/95 shadow-md backdrop-blur-md'
            : 'bg-transparent'), "aria-label": "Main navigation" },
        React.createElement("div", { className: "section-container" },
            React.createElement("div", { className: "flex h-16 items-center justify-between" },
                React.createElement(react_2.Link, { href: "/", className: "group flex items-center gap-2" },
                    React.createElement(LemonIcon_1.Logo, { className: "h-15 w-auto" })),
                React.createElement("div", { className: "hidden items-center gap-8 md:flex" }, navLinks.map(function (link) { return renderLink(link); })),
                React.createElement("div", { className: "hidden items-center gap-4 md:flex" }, (auth === null || auth === void 0 ? void 0 : auth.user) ? (React.createElement(react_2.Link, { href: ((_a = auth === null || auth === void 0 ? void 0 : auth.user) === null || _a === void 0 ? void 0 : _a.role) === 'admin'
                        ? '/admin/dashboard'
                        : '/app/dashboard', className: "btn-primary !px-6 !py-2.5 !shadow-md" }, "Dashboard")) : (React.createElement(React.Fragment, null,
                    React.createElement(react_2.Link, { href: "/login", className: "text-navy-600 ml-3 font-medium transition-colors hover:text-yellow-500" }, "Login"),
                    React.createElement(react_2.Link, { href: "/register", className: "btn-primary !px-6 !py-2.5 !shadow-md" }, "Start Free Trial")))),
                React.createElement("button", { onClick: function () { return setIsMobileMenuOpen(!isMobileMenuOpen); }, 
                    // className="text-navy-600 p-2 transition-colors hover:text-yellow-500 md:hidden"
                    className: "absolute top-4 right-4 z-9999 rounded-full transition-colors p-2 text-navy-600 shadow-lg hover:text-yellow-500 md:hidden", "aria-expanded": isMobileMenuOpen, "aria-label": "Toggle menu" }, isMobileMenuOpen ? (React.createElement(lucide_react_1.X, { className: "h-6 w-6" })) : (React.createElement(lucide_react_1.Menu, { className: "h-6 w-6" }))))),
        React.createElement(framer_motion_1.AnimatePresence, null, isMobileMenuOpen && (React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, x: '100%' }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: '100%' }, transition: { duration: 0.3 }, className: "fixed top-0 right-0 z-999 h-screen w-64 bg-white shadow-2xl md:hidden" },
            React.createElement("div", { className: "flex flex-col gap-4 p-6 pt-20" },
                navLinks.map(function (link) {
                    return renderLink(link, function () { return setIsMobileMenuOpen(false); }, 'text-navy-600 hover:text-yellow-500 font-medium py-2 transition-colors');
                }),
                React.createElement("hr", { className: "my-2 border-gray-200" }),
                React.createElement(react_2.Link, { href: "/login", className: "text-navy-600 py-2 font-medium transition-colors hover:text-yellow-500" }, "Login"),
                React.createElement(react_2.Link, { href: "/register", className: "btn-primary !rounded-lg text-center !shadow-md" }, "Start Free Trial")))))));
};
exports["default"] = Navigation;
