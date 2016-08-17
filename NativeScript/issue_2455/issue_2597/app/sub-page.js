"use strict";
var frame_1 = require("ui/frame");
function navigatingTo(args) {
    var page = args.object;
}
exports.navigatingTo = navigatingTo;
function onTap(args) {
    frame_1.topmost().navigate({
        moduleName: "main-page",
        animated: false
    });
}
exports.onTap = onTap;
//# sourceMappingURL=sub-page.js.map