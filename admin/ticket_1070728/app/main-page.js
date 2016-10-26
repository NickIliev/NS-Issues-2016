"use strict";
var label_1 = require("ui/label");
var stack;
exports.onPageLoaded = function (args) {
    var page = args.object;
    stack = page.getViewById("container");
    for (var i = 0; i < 4; i++) {
        stack.addChild(new label_1.Label("ITEM #" + i));
        console.log("item added");
    }
};
exports.add = function (args) {
    var lbl = new label_1.Label();
    lbl.text = "new Item";
    stack.addChild(lbl);
    console.log("new item added");
};
//# sourceMappingURL=main-page.js.map