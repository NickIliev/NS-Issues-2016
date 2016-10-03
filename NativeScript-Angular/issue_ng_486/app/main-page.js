"use strict";
var frame_1 = require("ui/frame");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
}
exports.navigatingTo = navigatingTo;
function goToSub() {
    var navigationEntry = {
        moduleName: "sub-page",
        clearHistory: true
    };
    frame_1.topmost().navigate(navigationEntry);
}
exports.goToSub = goToSub;
function goToThird() {
    var navigationEntry = {
        moduleName: "third-page",
        clearHistory: false
    };
    frame_1.topmost().navigate(navigationEntry);
}
exports.goToThird = goToThird;
//# sourceMappingURL=main-page.js.map