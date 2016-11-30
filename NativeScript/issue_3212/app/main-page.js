"use strict";
var appSettings = require("application-settings");
var dialogs_1 = require("ui/dialogs");
function navigatingTo(args) {
    var page = args.object;
}
exports.navigatingTo = navigatingTo;
function save() {
    appSettings.setBoolean("switched", true);
}
exports.save = save;
function getValue() {
    var options = {
        title: "",
        message: appSettings.getBoolean("switched").toString(),
        okButtonText: "OK"
    };
    dialogs_1.alert(options).then(function () { });
}
exports.getValue = getValue;
//# sourceMappingURL=main-page.js.map