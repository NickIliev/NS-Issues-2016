"use strict";
var button_1 = require("ui/button");
function navigatingTo(args) {
    var page = args.object;
    var button = page.getViewById("btn");
    button.on(button_1.Button.tapEvent, function () {
        console.log("Button TAP triggered!");
    });
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map