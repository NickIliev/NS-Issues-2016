"use strict";
var stackModule = require("ui/layouts/stack-layout");
var gestures = require("ui/gestures");
var frameModule = require("ui/frame");
function onLoaded(args) {
    // Get the event sender
    var page = args.object;
    
    var myStack = page.getViewById("swipable");
    myStack.on(gestures.GestureTypes.swipe, function (args) {
        frameModule.topmost().navigate({
            moduleName: "sub-page"
        });
    });
}
exports.onLoaded = onLoaded;
//# sourceMappingURL=main-page.js.map