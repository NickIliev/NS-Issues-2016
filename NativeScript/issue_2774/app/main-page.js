"use strict";
var frame_1 = require("ui/frame");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
}
exports.navigatingTo = navigatingTo;
function onTap() {
    frame_1.topmost().navigate({ moduleName: "sub-page" });
}
exports.onTap = onTap;
//# sourceMappingURL=main-page.js.map