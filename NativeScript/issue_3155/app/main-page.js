"use strict";
var web_view_1 = require("ui/web-view");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    var wv = new web_view_1.WebView();
    wv.url = "index.html";
    page.content = wv;
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map