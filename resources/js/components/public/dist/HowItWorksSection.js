"use strict";
exports.__esModule = true;
var lucide_react_1 = require("lucide-react");
var framer_motion_1 = require("framer-motion");
var LemonIcon_1 = require("./LemonIcon");
var steps = [
    {
        number: '1',
        icon: lucide_react_1.UserPlus,
        title: 'Sign Up Free',
        description: 'Start your 30-day trial, no credit card needed. Create your account in seconds.'
    },
    {
        number: '2',
        icon: lucide_react_1.Database,
        title: 'Add Your Data',
        description: 'Contribute your records and explore the shared database. See the power of collective data.'
    },
    {
        number: '3',
        icon: lucide_react_1.TrendingUp,
        title: 'Subscribe & Grow',
        description: 'Continue with monthly access after your trial ends. Scale your business with confidence.'
    },
];
/**
 * How It Works Section
 * Three-step process with connecting line
 */
var HowItWorksSection = function () {
    return (React.createElement("section", { id: "how-it-works", className: "section-padding" },
        React.createElement("div", { className: "relative overflow-hidden bg-gradient-to-br from-[hsl(224_76%_33%)] via-[hsl(224_76%_25%)] to-[hsl(225,90%,8%)] p-8 lg:p-16" },
            React.createElement("div", { className: "section-container" },
                React.createElement(LemonIcon_1.LemonWhole, { className: "absolute top-8 right-8 h-24 w-24", opacity: 0.15 }),
                React.createElement(LemonIcon_1.LemonWhole, { className: "absolute bottom-8 left-8 h-16 w-16", opacity: 0.1 }),
                React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "relative z-10 text-center" },
                    React.createElement("h2", { className: "text-3xl font-sans max-w-3xl m-auto font-bold text-white md:text-4xl" }, "Get Set Up Fast And Build A Client Base That Respects Your Time And Work"),
                    React.createElement("p", { className: "sub-text mt-4 text-lg text-gray-400" }, "Three simple steps to transform your workflow")),
                React.createElement("div", { className: "relative mt-16" },
                    React.createElement("div", { className: "absolute top-8 right-1/6 left-1/6 hidden h-1 rounded-full bg-yellow-400 md:block", style: {
                            left: 'calc(16.666% + 2rem)',
                            right: 'calc(16.666% + 2rem)'
                        } }),
                    React.createElement("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12" }, steps.map(function (step, index) { return (React.createElement(framer_motion_1.motion.div, { key: step.title, initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: {
                            duration: 0.5,
                            delay: index * 0.15
                        }, className: "relative z-10 text-center" },
                        React.createElement("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-lg" },
                            React.createElement("span", { className: "text-navy-900 text-3xl font-bold" }, step.number)),
                        React.createElement("div", { className: "mt-6 flex items-center justify-center gap-2" },
                            React.createElement(step.icon, { className: "h-10 w-10 text-yellow-500" }),
                            React.createElement(LemonIcon_1.LemonSimple, { className: "h-5 w-5 text-yellow-400" })),
                        React.createElement("h3", { className: "mt-4 text-2xl font-semibold text-white" }, step.title),
                        React.createElement("p", { className: "mt-4 leading-relaxed text-gray-400" }, step.description))); })))))));
};
exports["default"] = HowItWorksSection;
