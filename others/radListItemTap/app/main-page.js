"use strict";
var main_view_model_1 = require("./main-view-model");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = new main_view_model_1.ViewModel();
}
exports.navigatingTo = navigatingTo;
function onItemTap() {
    console.log("onItemTap");
}
exports.onItemTap = onItemTap;
function onTap() {
    console.log("onTap");
}
exports.onTap = onTap;
//# sourceMappingURL=main-page.js.map