"use strict";
var observable = require("data/observable");
var builder = require("ui/builder");
var viewModel = new observable.Observable();
function onPageLoaded(args) {
    var page = args.object;
    viewModel.set("level", "Test for base level binding!");
    viewModel.set("parentTest", "Test for parent binding!");
    page.bindingContext = viewModel;
    var myComponentInstance = builder.load({
        path: "~/cmps",
        name: "component"
    });
    page.content = myComponentInstance;
}
exports.onPageLoaded = onPageLoaded;
//# sourceMappingURL=main-page.js.map