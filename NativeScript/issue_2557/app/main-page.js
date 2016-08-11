"use strict";
// Event handler for Page "navigatingTo" event attached in main-page.xml
function onLoaded(args) {
    // Get the event sender
    var page = args.object;
    var webView = page.getViewById('webview');
    webView.on("pan", function (args) {
        if (args.deltaY < -10) {
            console.log(args.deltaY);
        }
        else if (args.deltaY > 0) {
            console.log(args.deltaY);
        }
    });
}
exports.onLoaded = onLoaded;
//# sourceMappingURL=main-page.js.map