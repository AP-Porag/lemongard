"use strict";
exports.__esModule = true;
var lucide_react_1 = require("lucide-react");
var framer_motion_1 = require("framer-motion");
var LemonIcon_1 = require("@/components/LemonIcon");
var features = [
    {
        icon: lucide_react_1.Search,
        title: "Advanced Search & Filters",
        description: "Find exactly what you need with powerful search across all fields, saved filters, and boolean operators.",
        points: ["Full-text search", "Multi-field filtering", "Saved search queries", "Export search results"]
    },
    {
        icon: lucide_react_1.Shield,
        title: "Enterprise-Grade Security",
        description: "Your data is protected with bank-level encryption, secure backups, and compliance with industry standards.",
        points: ["256-bit SSL encryption", "Daily automated backups", "GDPR compliant", "Role-based access"]
    },
    {
        icon: lucide_react_1.Users,
        title: "Team Collaboration",
        description: "Share insights with your team, assign tasks, and work together on client management.",
        points: ["Team workspaces", "Activity tracking", "Comment threads", "@mentions"]
    },
    {
        icon: lucide_react_1.BarChart,
        title: "Powerful Analytics",
        description: "Generate custom reports, visualize trends, and make data-driven decisions for your business.",
        points: ["Custom report builder", "Visual dashboards", "Trend analysis", "Export to Excel/PDF"]
    },
    {
        icon: lucide_react_1.Smartphone,
        title: "Mobile Responsive",
        description: "Access your CRM from anywhere with our fully responsive web app that works on all devices.",
        points: ["Works on any device", "Touch-optimized", "Offline mode coming soon", "Native app in development"]
    },
    {
        icon: lucide_react_1.Zap,
        title: "API & Integrations",
        description: "Connect LemonGard with your existing tools via our REST API or pre-built integrations.",
        points: ["RESTful API", "Zapier integration", "Webhook support", "Custom integrations"]
    },
];
/**
 * Features Deep Dive - 6 feature cards in a 3-column grid
 */
var FeaturesDeepDive = function () {
    return (React.createElement("section", { className: "section-container section-padding" },
        React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "text-center mb-16" },
            React.createElement("div", { className: "flex items-center justify-center gap-2 mb-4" },
                React.createElement(LemonIcon_1.LemonSimple, { className: "w-6 h-6 text-yellow-500" }),
                React.createElement("span", { className: "text-sm font-medium text-yellow-600 uppercase tracking-wide" }, "Platform Features")),
            React.createElement("h2", { className: "text-3xl md:text-4xl font-bold text-navy-600" }, "Everything You Need in One Place"),
            React.createElement("p", { className: "text-lg text-muted-foreground mt-4 max-w-[500px] mx-auto" }, "Find out why LemonGard is the platform service pros rely on for dependable client management and real business growth")),
        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" }, features.map(function (feature, index) { return (React.createElement(framer_motion_1.motion.div, { key: feature.title, initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay: index * 0.1 }, className: "feature-card !rounded-2xl relative overflow-hidden" },
            React.createElement(LemonIcon_1.LemonSlice, { className: "absolute -bottom-6 -right-6 w-24 h-24", opacity: 0.05 }),
            React.createElement("div", { className: "relative z-10" },
                React.createElement("div", { className: "icon-circle" },
                    React.createElement(feature.icon, { className: "icon-circle-icon" })),
                React.createElement("h3", { className: "text-xl font-semibold text-navy-600 mt-5" }, feature.title),
                React.createElement("p", { className: "text-sm text-muted-foreground mt-3 leading-relaxed" }, feature.description),
                React.createElement("ul", { className: "mt-4 space-y-2" }, feature.points.map(function (point) { return (React.createElement("li", { key: point, className: "flex items-center gap-2 text-sm text-gray-700" },
                    React.createElement(LemonIcon_1.LemonSimple, { className: "w-3 h-3 text-yellow-400 shrink-0" }),
                    point)); }))))); }))));
};
exports["default"] = FeaturesDeepDive;
