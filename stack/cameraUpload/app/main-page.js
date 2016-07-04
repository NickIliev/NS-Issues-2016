"use strict";
var Observable = require("data/observable").Observable;
var cameraModule = require("camera");
var fs = require("file-system");
var bghttpModule = require("nativescript-background-http");
var session = bghttpModule.session("image-upload");
var viewModel = new Observable();
function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = viewModel;
    var btn = new android.widget.Button(null);
}
exports.navigatingTo = navigatingTo;
function onTap() {
    cameraModule.takePicture({
        width: 300,
        height: 300,
        keepAspectRatio: true
    }).then(function (imageSource) {
        console.log("Image taken!");
        var folder = fs.knownFolders.documents();
        var path = fs.path.join(folder.path, "Test.png");
        var saved = imageSource.saveToFile(path, "png");
        var request = {
            url: "http://httpbin.org/post",
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                "File-Name": "Test.png"
            },
            description: "{ 'uploading': " + "Test.png" + " }"
        };
        var task = session.uploadFile(path, request);
        task.on("progress", logEvent);
        task.on("error", logEvent);
        task.on("complete", logEvent);
        function logEvent(e) {
            console.log("----------------");
            console.log('Status: ' + e.eventName);
            // console.log(e.object);
            if (e.totalBytes !== undefined) {
                console.log('current bytes transfered: ' + e.currentBytes);
                console.log('Total bytes to transfer: ' + e.totalBytes);
            }
        }
    });
}
exports.onTap = onTap;
//# sourceMappingURL=main-page.js.map