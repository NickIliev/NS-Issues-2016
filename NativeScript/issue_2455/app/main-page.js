"use strict";
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    var btn = page.getViewById("btn");
    btn.text = "0000123456"; // this works
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map