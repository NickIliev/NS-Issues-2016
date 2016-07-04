"use strict";
var frameModule = require("ui/frame");
var page;
exports.navigatingTo = function (args) {
    page = args.object;
    page.bindingContext = {};
};
exports.topNav = function (args) {
    frameModule.topmost().navigate({
        moduleName: "sub-page",
        clearHistory: true
    });
};
//# sourceMappingURL=sub-page.js.map