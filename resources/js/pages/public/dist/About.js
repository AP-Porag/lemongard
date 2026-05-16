"use strict";
exports.__esModule = true;
var PublicLayout_1 = require("@/layouts/PublicLayout");
var AboutHero_1 = require("@/components/public/about/AboutHero");
var MissionSection_1 = require("@/components/public/about/MissionSection");
var OurStorySection_1 = require("@/components/public/about/OurStorySection");
var CoreValuesSection_1 = require("@/components/public/about/CoreValuesSection");
var ProblemSolutionSection_1 = require("@/components/public/about/ProblemSolutionSection");
var TeamSection_1 = require("@/components/public/about/TeamSection");
var WhyChooseUsSection_1 = require("@/components/public/about/WhyChooseUsSection");
var TestimonialsSection_1 = require("@/components/public/about/TestimonialsSection");
var TrustBadgesSection_1 = require("@/components/public/about/TrustBadgesSection");
var AboutCTA_1 = require("@/components/public/about/AboutCTA");
/**
 * About Us Page
 * Builds trust and tells the LemonGard company story
 */
function About() {
    return (React.createElement(PublicLayout_1["default"], null,
        React.createElement("div", { className: "overflow-hidden" },
            React.createElement(AboutHero_1["default"], null),
            React.createElement(MissionSection_1["default"], null),
            React.createElement(OurStorySection_1["default"], null),
            React.createElement(CoreValuesSection_1["default"], null),
            React.createElement(ProblemSolutionSection_1["default"], null),
            React.createElement(TeamSection_1["default"], null),
            React.createElement(WhyChooseUsSection_1["default"], null),
            React.createElement(TestimonialsSection_1["default"], null),
            React.createElement(TrustBadgesSection_1["default"], null),
            React.createElement(AboutCTA_1["default"], null))));
}
exports["default"] = About;
