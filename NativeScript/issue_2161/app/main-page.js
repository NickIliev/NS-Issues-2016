"use strict";
var rootpage;
var moveable;
function pageloaded(args) {
    rootpage = args.object;
    moveable = rootpage.getViewById('moveable');
    console.log("on load X: " + moveable.originX);
    console.log("on load Y: " + moveable.originY);
}
exports.pageloaded = pageloaded;
function click(args) {
    console.log("on click X: " + moveable.originX);
    console.log("on click Y: " + moveable.originY);
    moveable.translateX = -50;
    moveable.translateY = -50;
    moveable.animate({
        translate: { x: 0, y: 0 },
        duration: 200,
        delay: 1000
    });
}
exports.click = click;
//# sourceMappingURL=main-page.js.map