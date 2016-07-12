"use strict";
var cameraModule = require("camera");
var http = require("http");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
}
exports.navigatingTo = navigatingTo;
function takePicture(args) {
    cameraModule.takePicture().then(function (imageSource) {
        var imageAsBase64String = imageSource.toBase64String("JPG");
        return imageAsBase64String;
    }).then(function (imageAsBase64String) {
        http.request({
            url: "https://httpbin.org/post",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ name: "myName", imageAsString: imageAsBase64String })
        }).then(function (response) {
            var result = response.content.toJSON();
            console.log("args: " + result.args);
            console.log("origin: " + result.origin);
            console.log("headers: " + result.headers);
            console.log("json: " + result.json);
            console.log("url: " + result.url);
            console.log("data: " + result.data);
            var myObj = JSON.parse(result.data);
            console.log("my Image Name: " + myObj.name);
            console.log("my Image Base64String: " + myObj.imageAsString);
        }, function (e) {
            console.log("Error occurred " + e);
        });
    });
}
exports.takePicture = takePicture;
//# sourceMappingURL=main-page.js.map