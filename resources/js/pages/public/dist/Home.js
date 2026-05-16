"use strict";
exports.__esModule = true;
var PublicLayout_1 = require("@/layouts/PublicLayout");
var HeroSection_1 = require("@/components/public/HeroSection");
var TrustIndicators_1 = require("@/components/public/TrustIndicators");
var FeaturesSection_1 = require("@/components/public/FeaturesSection");
var HowItWorksSection_1 = require("@/components/public/HowItWorksSection");
var PricingSection_1 = require("@/components/public/PricingSection");
var FinalCTA_1 = require("@/components/public/FinalCTA");
function Home() {
    return (React.createElement(PublicLayout_1["default"], null,
        React.createElement("div", { className: "overflow-hidden" },
            React.createElement(HeroSection_1["default"], null),
            React.createElement(TrustIndicators_1["default"], null),
            React.createElement(FeaturesSection_1["default"], null),
            React.createElement(HowItWorksSection_1["default"], null),
            React.createElement(PricingSection_1["default"], null),
            React.createElement(FinalCTA_1["default"], null))));
}
exports["default"] = Home;
