"use strict";
// Event handler for Page "navigatingTo" event attached in main-page.xml
function onLoaded(args) {
    // Get the event sender
    var page = args.object;
    var background = page.getViewById("background");
    console.log("Starting...");
    background.animate({
        scale: { x: 1.2, y: 1.2 },
        duration: 4000
    }).then(function () {
        console.log("  DONE!");
    });
}
exports.onLoaded = onLoaded;
//# sourceMappingURL=main-page.js.map