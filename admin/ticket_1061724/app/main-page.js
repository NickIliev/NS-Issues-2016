"use strict";
var main_view_model_1 = require("./main-view-model");
var frame = require("ui/frame");
var dialogs = require("ui/dialogs");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
}
exports.navigatingTo = navigatingTo;
function onTap(args) {
    dialogs.alert({ title: 'Success', message: 'Success message...', okButtonText: 'Ok' }).then(function () {
        navigate("subpage", true);
    });
}
exports.onTap = onTap;
function navigate(page, clearHistory) {
    var location = 'components/' + page;
    var top = frame.topmost();
    var trans = 'slide';
    var clear = clearHistory == null || clearHistory == 'undefined' ? true : clearHistory;
    var options = {
        moduleName: location,
        animated: true,
        clearHistory: clear,
        transition: {
            name: trans
        }
    };
    top.navigate(options);
}
//# sourceMappingURL=main-page.js.map