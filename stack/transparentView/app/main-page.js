"use strict";
var main_view_model_1 = require("./main-view-model");
var color_1 = require("color");
var myGridView;
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
    myGridView = page.getViewById("myGrid");
}
exports.navigatingTo = navigatingTo;
function onTap(args) {
    var color = new color_1.Color("#FF0000");
    // myGridView.backgroundColor = color;
    myGridView.visibility = "collapsed";
}
exports.onTap = onTap;
function onAnotherTap(args) {
    myGridView.animate({
        backgroundColor: new color_1.Color("#3D5AFE"),
        duration: 3000
    });
}
exports.onAnotherTap = onAnotherTap;
//# sourceMappingURL=main-page.js.map