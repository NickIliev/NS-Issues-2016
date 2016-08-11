"use strict";
var observable_1 = require("data/observable");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    var textField = page.getViewById("tf");
    var label = page.getViewById("lb");
    var observable = new observable_1.Observable();
    observable.set("text", "");
    observable.set("labeltext", "Sample label text");
    textField.on(observable_1.Observable.propertyChangeEvent, function (event) {
        observable.set("labeltext", event.value);
        setTimeout(function () {
            observable.set("text", "0");
        }, 200);
    });
    page.bindingContext = observable;
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map