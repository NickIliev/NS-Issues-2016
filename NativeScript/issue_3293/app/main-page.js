"use strict";
var dialogs = require("ui/dialogs");
function navigatingTo(args) {
    var page = args.object;
}
exports.navigatingTo = navigatingTo;
function onTap() {
    var options = {
        title: "Race Selection",
        message: "Race Chosen: Elf",
        okButtonText: "OK"
    };
    dialogs.alert(options).then(function () {
        console.log("Race Chosen!");
    });
}
exports.onTap = onTap;
//# sourceMappingURL=main-page.js.map