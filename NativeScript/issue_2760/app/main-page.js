"use strict";
var frame_1 = require('ui/frame');
// To get the drawing...
function getMyDrawing() {
    var drawingPad = frame_1.topmost().getViewById('myDrawingPad');
    drawingPad.getDrawing().then(function (res) {
        console.log(res);
    });
}
exports.getMyDrawing = getMyDrawing;
// If you want to clear the signature/drawing...
function clearMyDrawing() {
    var drawingPad = frame_1.topmost().getViewById('myDrawingPad');
    drawingPad.clearDrawing();
}
exports.clearMyDrawing = clearMyDrawing;
//# sourceMappingURL=main-page.js.map