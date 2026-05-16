"use strict";
exports.__esModule = true;
var PublicLayout_1 = require("@/layouts/PublicLayout");
var PricingHero_1 = require("@/components/public/pricing/PricingHero");
var PricingCards_1 = require("@/components/public/pricing/PricingCards");
var ComparisonTable_1 = require("@/components/public/pricing/ComparisonTable");
var PricingFAQ_1 = require("@/components/public/pricing/PricingFAQ");
var PricingTrust_1 = require("@/components/public/pricing/PricingTrust");
var PricingTestimonial_1 = require("@/components/public/pricing/PricingTestimonial");
var PricingCTA_1 = require("@/components/public/pricing/PricingCTA");
function Pricing() {
    return (React.createElement(PublicLayout_1["default"], null,
        React.createElement(PricingHero_1["default"], null),
        React.createElement(PricingCards_1["default"], null),
        React.createElement(ComparisonTable_1["default"], null),
        React.createElement(PricingFAQ_1["default"], null),
        React.createElement(PricingTrust_1["default"], null),
        React.createElement(PricingTestimonial_1["default"], null),
        React.createElement(PricingCTA_1["default"], null)));
}
exports["default"] = Pricing;
