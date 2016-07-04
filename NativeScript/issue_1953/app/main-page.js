// backstackVisible = false not working on Android with physical back button #1953
"use strict";
var frameModule = require('ui/frame');
var topmost;
function navigatingTo(args) {
    var page = args.object;
    topmost = frameModule.topmost();
}
exports.navigatingTo = navigatingTo;
function onTap(args) {
    var navigationEntry = {
        moduleName: "sub-page",
        backstackVisible: false
    };
    topmost.navigate(navigationEntry);
}
exports.onTap = onTap;
//# sourceMappingURL=main-page.js.map