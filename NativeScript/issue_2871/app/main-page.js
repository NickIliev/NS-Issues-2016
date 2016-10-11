"use strict";
var cameraModule = require("nativescript-camera");
var fs = require('file-system');
var imageSource = require("image-source");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
}
exports.navigatingTo = navigatingTo;
function onTap() {
    cameraModule.takePicture({
        width: 300,
        height: 300,
        keepAspectRatio: true
    }).then(function (imageAsset) {
        console.log("Image taken!");
        var img = imageAsset;
        var folder = fs.knownFolders.documents();
        console.log('folder - ', folder); // => object
        var path = fs.path.join(folder.path, "Test.png");
        console.log('path - ', path); // => correct path
        var saved = img.saveToFile(path, "png"); // ### Execution stops here.
        console.log('saved - ', saved);
        var imgLocal = imageSource.fromFile(path);
    });
}
exports.onTap = onTap;
//# sourceMappingURL=main-page.js.map