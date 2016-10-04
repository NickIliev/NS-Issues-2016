"use strict";
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
function onNavigatingTo(args) {
    var page = args.object;
}
exports.onNavigatingTo = onNavigatingTo;
function onTap(args) {
    var topmost = frameModule.topmost();
    topmost.navigate({
        moduleName: "sub-page"
    });
}
exports.onTap = onTap;
function goToThird(args) {
    var topmost = frameModule.topmost();
    topmost.navigate({
        moduleName: "third-page",
        clearHistory: true
    });
}
exports.goToThird = goToThird;
//# sourceMappingURL=main-page.js.map