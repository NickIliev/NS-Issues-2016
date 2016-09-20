"use strict";
var main_view_model_1 = require("./main-view-model");
var http = require("http");
var platformModule = require("platform");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
    // http.getJSON("https://httpbin.org/user-agent").then(function (res) {
    //     //// Argument (r) is JSON!
    //     console.log(res["user-agent"]);
    // }, function (e) {
    //     //// Argument (e) is Error!
    //     //console.log(e);
    // });
    console.log("Device model: " + platformModule.device.model);
    console.log("Device type: " + platformModule.device.deviceType);
    console.log("OS: " + platformModule.device.os);
    console.log("OS version: " + platformModule.device.osVersion);
    console.log("SDK Version: " + platformModule.device.sdkVersion);
    console.log("Screen width: " + platformModule.screen.mainScreen.widthPixels);
    console.log("Screen height: " + platformModule.screen.mainScreen.heightPixels);
    console.log("Screen scale: " + platformModule.screen.mainScreen.scale);
    http.request({
        url: "https://httpbin.org/user-agent",
        method: "GET",
        headers: { "Content-Type": "application/json", "User-Agent": "My-Custom-User-Agent" },
        content: JSON.stringify({ MyVariableOne: "ValueOne", MyVariableTwo: "ValueTwo" })
    }).then(function (response) {
        var result = response.content.toJSON();
        console.log(result["user-agent"]);
    }, function (e) {
        // console.log("Error occurred " + e);
    });
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map