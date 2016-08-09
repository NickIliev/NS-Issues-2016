"use strict";
var http = require("http");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    http.request({ url: "https://httpbin.org/get", method: "GET" }).then(function (response) {
        // Argument (response) is HttpResponse!
        for (var key in response) {
            if (response.hasOwnProperty(key)) {
                var element = response[key];
                console.log("key: " + key);
                console.log("value: " + element);
                console.log("------");
            }
        }
        console.log("===========");
        for (var header in response.headers) {
            console.log(header + ":" + response.headers[header]);
        }
        var statusCode = response.statusCode;
        console.log("Status" + statusCode);
    }, function (e) {
        // Argument (e) is Error!
    });
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map