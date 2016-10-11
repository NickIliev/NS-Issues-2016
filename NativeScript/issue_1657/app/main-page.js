"use strict";
var frameModule = require("ui/frame");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    frameModule.topmost().ios.controller.navigationBar.translucent = false;
}
exports.navigatingTo = navigatingTo;
function onTap() {
    frameModule.topmost().navigate({
        moduleName: "sub-page",
    });
}
exports.onTap = onTap;
//# sourceMappingURL=main-page.js.map