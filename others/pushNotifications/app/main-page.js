"use strict";
var main_view_model_1 = require('./main-view-model');
var pushPlugin = require("nativescript-push-notifications");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
    var self = this;
    pushPlugin.register({ senderID: '<ENTER_YOUR_PROJECT_NUMBER>' }, function (data) {
        self.set("message", "" + JSON.stringify(data));
    }, function () { });
    pushPlugin.onMessageReceived(function callback(data) {
        self.set("message", "" + JSON.stringify(data));
    });
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map