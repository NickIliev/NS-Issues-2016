"use strict";
var httpModule = require("http");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.actionBar.title = "Different TITLE";
}
exports.navigatingTo = navigatingTo;
function onTap(args) {
    httpModule.request({
        url: "https://httpbin.org/post",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        content: JSON.stringify({ MyVariableOne: "ValueOne", MyVariableTwo: "ValueTwo" })
    }).then(function (response) {
        // Success
        var result = response.content.toJSON();
        console.log(result);
    }, function (e) {
        // error occur
        console.log("Error occurred " + e);
    });
}
exports.onTap = onTap;
//# sourceMappingURL=main-page.js.map