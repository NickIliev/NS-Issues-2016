"use strict";
var main_view_model_1 = require("./main-view-model");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
    var stack = page.getViewById("my-stack");
    stack.isEnabled = true;
    var btn = page.getViewById("my-btn");
    btn.isEnabled = false;
    var textFiled = page.getViewById("my-textfield");
    textFiled.isEnabled = false;
    var label = page.getViewById("my-label");
    label.isEnabled = false;
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map