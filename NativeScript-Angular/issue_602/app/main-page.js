"use strict";
var label_1 = require("ui/label");
var gestures_1 = require("ui/gestures");
function navigatingTo(args) {
    var page = args.object;
    var label = new label_1.Label();
    var observer = label.on(gestures_1.GestureTypes.touch, function (args) {
        console.log("Tap state: " + args.action);
    });
    page.content = label;
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map