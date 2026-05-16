"use strict";
exports.__esModule = true;
require("../../css/public.css");
var toaster_1 = require("@/components/public/ui/toaster");
var sonner_1 = require("@/components/public/ui/sonner");
var tooltip_1 = require("@/components/public/ui/tooltip");
var Navigation_1 = require("@/components/public/Navigation");
var Footer_1 = require("@/components/public/Footer");
var react_query_1 = require("@tanstack/react-query");
var queryClient = new react_query_1.QueryClient();
function PublicLayout(_a) {
    var children = _a.children;
    return (React.createElement(react_query_1.QueryClientProvider, { client: queryClient },
        React.createElement(tooltip_1.TooltipProvider, null,
            React.createElement(toaster_1.Toaster, null),
            React.createElement(sonner_1.Toaster, null),
            React.createElement("div", { className: "flex min-h-screen flex-col bg-background" },
                React.createElement(Navigation_1["default"], null),
                React.createElement("main", { className: "flex-1" }, children),
                React.createElement(Footer_1["default"], null)))));
}
exports["default"] = PublicLayout;
