"use strict";
var main_view_model_1 = require("./main-view-model");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
    var progressBar = page.getViewById("myProgress");
    progressBar.android.getLayoutParams().height = 50;
    progressBar.android.invalidate();
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map