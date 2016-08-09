"use strict";
var router_1 = require('nativescript-angular/router');
var blog_component_1 = require("../blogs/blog.component");
var main_component_1 = require("../pages/main.component");
var page1_component_1 = require("../pages/page1.component");
var blogui_component_1 = require("../bogsui/blogui.component");
var blogdrawer_component_1 = require("../blogdrawer/blogdrawer.component");
var blogswipe_component_1 = require("../blogswipe/blogswipe.component");
var routes = [
    { path: "", redirectTo: "/main", terminal: true },
    { path: "main", component: main_component_1.MainComponent },
    { path: "page1", component: page1_component_1.Page1Component },
    { path: "blog", component: blog_component_1.BlogComponent },
    { path: "blogui", component: blogui_component_1.BlogUIComponent },
    { path: "blogdrawer", component: blogdrawer_component_1.BlogDrawerComponent },
    { path: "blogswipecomponent", component: blogswipe_component_1.BlogSwipeComponent }
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.nsProvideRouter(routes, { enableTracing: false })
];
//# sourceMappingURL=app.route.js.map