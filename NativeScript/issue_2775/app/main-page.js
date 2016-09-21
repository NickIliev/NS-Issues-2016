"use strict";
var button_1 = require("ui/button");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    var btn = page.getViewById("btn");
    btn.on(button_1.Button.tapEvent, function (args) {
        // Do something
        for (var key in args) {
            if (args.hasOwnProperty(key)) {
                var element = args[key];
                console.log("key: " + key + " ------  element:" + element);
            }
        }
    });
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map