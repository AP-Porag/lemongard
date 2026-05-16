"use strict";
exports.__esModule = true;
var PublicLayout_1 = require("@/layouts/PublicLayout");
var HowItWorksHero_1 = require("@/components/public/how-it-works/HowItWorksHero");
var OverviewTimeline_1 = require("@/components/public/how-it-works/OverviewTimeline");
var DetailedWalkthrough_1 = require("@/components/public/how-it-works/DetailedWalkthrough");
var FeaturesDeepDive_1 = require("@/components/public/how-it-works/FeaturesDeepDive");
var FAQSection_1 = require("@/components/public/how-it-works/FAQSection");
var DemoSection_1 = require("@/components/public/how-it-works/DemoSection");
var TrustSecurity_1 = require("@/components/public/how-it-works/TrustSecurity");
var HowItWorksCTA_1 = require("@/components/public/how-it-works/HowItWorksCTA");
/**
 * How It Works Page
 * Comprehensive walkthrough of the LemonGard user journey
 */
function HowItWorks() {
    return (React.createElement(PublicLayout_1["default"], null,
        React.createElement(HowItWorksHero_1["default"], null),
        React.createElement(OverviewTimeline_1["default"], null),
        React.createElement(DetailedWalkthrough_1["default"], null),
        React.createElement(FeaturesDeepDive_1["default"], null),
        React.createElement(FAQSection_1["default"], null),
        React.createElement(DemoSection_1["default"], null),
        React.createElement(TrustSecurity_1["default"], null),
        React.createElement(HowItWorksCTA_1["default"], null)));
}
exports["default"] = HowItWorks;
