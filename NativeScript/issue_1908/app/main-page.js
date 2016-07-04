"use strict";
var frameModule = require("ui/frame");
var topmost;
// Event handler for Page "navigatingTo" event attached in main-page.xml
function onLoaded(args) {
    // Get the event sender
    var page = args.object;
    topmost = frameModule.topmost();
    console.log(topmost);
}
exports.onLoaded = onLoaded;
function goToNextPage(args) {
    topmost.navigate("./sub-page");
}
exports.goToNextPage = goToNextPage;
//# sourceMappingURL=main-page.js.map