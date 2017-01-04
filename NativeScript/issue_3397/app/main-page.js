"use strict";
var http = require("http");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    var page = args.object;
}
exports.navigatingTo = navigatingTo;
function onTap() {
    http.getFile("https://httpbin.org/image/png")
        .then(function (res) {
        for (var key in res) {
            if (res.hasOwnProperty(key)) {
                var element = res[key];
                console.log("[ key : " + key + " ]");
                console.log("[ element : " + element + " ]");
            }
        }
    }).catch(function (err) {
        console.log(err);
    });
}
exports.onTap = onTap;
function onHttpRequest() {
    http.request({ url: "https://httpbin.org/image/png", method: "GET" })
        .then(function (response) {
        //// Argument (response) is HttpResponse!
        var statusCode = response.statusCode;
        console.log("statusCode: " + statusCode);
        if (statusCode >= 200 && statusCode <= 400) {
            response.content.toImage().then(function (res) {
                console.log(res);
            });
        }
    }).catch(function (err) {
        console.log(err);
    });
}
exports.onHttpRequest = onHttpRequest;
//# sourceMappingURL=main-page.js.map