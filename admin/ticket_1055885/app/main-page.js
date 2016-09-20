"use strict";
var observable_1 = require("data/observable");
var viewModel = new observable_1.Observable();
;
var tab;
function navigatingTo(args) {
    var page = args.object;
    tab = page.getViewById("tabViewContainer");
    viewModel.set("isShown", false);
    page.bindingContext = viewModel;
}
exports.navigatingTo = navigatingTo;
function toggleVisibility() {
    if (viewModel.get("isShown")) {
        viewModel.set("isShown", false);
    }
    else {
        viewModel.set("isShown", true);
    }
}
exports.toggleVisibility = toggleVisibility;
//# sourceMappingURL=main-page.js.map