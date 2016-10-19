"use strict";
var observable_1 = require("data/observable");
var context = new observable_1.Observable();
var values = ["--i--", "-i---", "-i-"];
var count = 0;
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = context;
    change();
}
exports.navigatingTo = navigatingTo;
// Event handler for Page "navigatingTo" event attached in main-page.xml
function change() {
    context.set("text", values[count++ % 3]);
}
exports.change = change;
//# sourceMappingURL=main-page.js.map