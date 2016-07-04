"use strict";
var blue;
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    blue = page.getViewById("mr-blue");
}
exports.navigatingTo = navigatingTo;
function onTap() {
    blue.android.bringToFront();
}
exports.onTap = onTap;
//# sourceMappingURL=main-page.js.map