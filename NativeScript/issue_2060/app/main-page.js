"use strict";
var observable_1 = require("data/observable");
var frameModule = require("ui/frame");
var topmost;
var context = new observable_1.Observable();
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    topmost = frameModule.topmost();
}
exports.navigatingTo = navigatingTo;
function onTap(args) {
    var navigationEntry = {
        moduleName: "sub-page",
        context: context,
        clearHistory: true,
        transitioniOS: {
            name: "slideRight"
        },
        transitionAndroid: {
            name: "slideRight"
        }
    };
    topmost.navigate(navigationEntry);
}
exports.onTap = onTap;
//# sourceMappingURL=main-page.js.map