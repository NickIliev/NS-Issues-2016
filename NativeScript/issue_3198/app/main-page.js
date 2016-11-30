"use strict";
var dialogs = require("ui/dialogs");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
}
exports.navigatingTo = navigatingTo;
function showDialog() {
    var options = {
        title: "Race Selection",
        message: "Race Chosen: Elf",
        okButtonText: "OK"
    };
    dialogs.alert(options).then(function () {
        console.log("Race Chosen!");
    });
}
exports.showDialog = showDialog;
//# sourceMappingURL=main-page.js.map