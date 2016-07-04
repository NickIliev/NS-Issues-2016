"use strict";
var main_view_model_1 = require("./main-view-model");
var frameModule = require("ui/frame");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
}
exports.navigatingTo = navigatingTo;
function onShareUrl(args) {
    console.log("onSHareUrl");
    frameModule.topmost().navigate("sub-page");
}
exports.onShareUrl = onShareUrl;
function toggleFavorite(args) {
    console.log("toggleFavorite");
    frameModule.topmost().navigate("sub-page");
}
exports.toggleFavorite = toggleFavorite;
//# sourceMappingURL=main-page.js.map