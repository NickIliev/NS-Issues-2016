"use strict";
var Frames = require('ui/frame');
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    var listPicker = page.getViewById("picker");
    listPicker.items = ["one", "two", "three"];
    Frames.topmost().navigate('sub-page');
}
exports.navigatingTo = navigatingTo;
function onTap() {
    Frames.topmost().navigate('sub-page');
}
exports.onTap = onTap;
//# sourceMappingURL=main-page.js.map