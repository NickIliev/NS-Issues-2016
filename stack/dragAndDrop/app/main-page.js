"use strict";
var item;
var prevDeltaX;
var prevDeltaY;
function onLoaded(args) {
    var page = args.object;
    item = page.getViewById("btn");
    item.translateX = 0;
    item.translateY = 0;
    item.scaleX = 1;
    item.scaleY = 1;
}
exports.onLoaded = onLoaded;
function onPan(args) {
    if (args.state === 1) {
        prevDeltaX = 0;
        prevDeltaY = 0;
    }
    else if (args.state === 2) {
        item.translateX += args.deltaX - prevDeltaX;
        item.translateY += args.deltaY - prevDeltaY;
        prevDeltaX = args.deltaX;
        prevDeltaY = args.deltaY;
    }
}
exports.onPan = onPan;
//# sourceMappingURL=main-page.js.map