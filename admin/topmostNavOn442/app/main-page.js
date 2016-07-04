"use strict";
var frameModule = require("ui/frame");
var topmost;
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    topmost = frameModule.topmost();
}
exports.navigatingTo = navigatingTo;
function goToSubPage() {
    topmost.navigate("sub-page");
}
exports.goToSubPage = goToSubPage;
;
//# sourceMappingURL=main-page.js.map