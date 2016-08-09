"use strict";
var cameraModule = require("camera");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
}
exports.navigatingTo = navigatingTo;
function takePhoto() {
    cameraModule.takePicture({
        width: 200,
        height: 400,
        keepAspectRatio: true,
        saveToGallery: true
    });
}
exports.takePhoto = takePhoto;
//# sourceMappingURL=main-page.js.map