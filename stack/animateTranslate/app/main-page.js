"use strict";
var enums_1 = require("ui/enums");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    var header = page.getViewById("header");
    var start = 0;
    header.animate({
        translate: { x: -(header.marginLeft + start), y: 0 },
        curve: enums_1.AnimationCurve.easeOut
    }).then(function () {
        header.translateX = 0;
        header.marginLeft = -start;
    });
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map