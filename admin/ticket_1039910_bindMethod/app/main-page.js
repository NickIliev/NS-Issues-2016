"use strict";
var observable_1 = require("data/observable");
var viewModel = new observable_1.Observable();
viewModel.set("sliderFooter", "week2");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = viewModel;
}
exports.navigatingTo = navigatingTo;
function next(args) {
    viewModel.set("sliderFooter", "week300");
}
exports.next = next;
//# sourceMappingURL=main-page.js.map