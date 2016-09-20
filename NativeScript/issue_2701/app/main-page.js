"use strict";
var http = require("http");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    http.request({
        url: "https://httpbin.org/headers",
        method: "GET",
        headers: { "Content-Type": "application/json", "headerA": "value-111, value222" },
    }).then(function (response) {
        var result = response.content.toJSON();
        console.log(result["headers"].Headera);
    }, function (e) {
        console.log("Error occurred " + e);
    });
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map