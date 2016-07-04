"use strict";
var observable_1 = require("data/observable");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.actionBarHidden = true;
    page.addCss("Page {background-color: black;}");
    // console.log(page.backgroundSpanUnderStatusBar);
    // console.log(page.actionBarHidden);
    // console.log(page.css);
    // console.log(page.navigationContext);
    // console.log(page.frame);
    // console.log(page.actionBar);
    // console.log(page.modal);
    var data = new observable_1.Observable();
    var object = { id: 1, title: "Test" };
    data.set('myObject', object);
    console.log(data.get("myObject"));
    var object2 = { id: 100, title: "NEWW" };
    data = new observable_1.Observable(object2);
    console.log(data.get("myObject"));
    console.log(data.get("id"));
    console.log(data.get("title"));
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map