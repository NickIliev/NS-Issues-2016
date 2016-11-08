"use strict";
var image_1 = require("ui/image");
var camera = require("nativescript-camera");
var page;
function navigatingTo(args) {
    page = args.object;
    console.log("Is camera available: " + camera.isAvailable());
}
exports.navigatingTo = navigatingTo;
function takePhoto(args) {
    camera.takePicture({ width: 180, height: 180, keepAspectRatio: false, saveToGallery: true }).
        then(function (imageAsset) {
        // result is imageAsset
        var image = new image_1.Image();
        image.src = imageAsset;
    }).catch(function (err) {
        console.log("Error -> " + err.message);
    });
}
exports.takePhoto = takePhoto;
function requestPermission() {
    camera.requestPermissions();
}
exports.requestPermission = requestPermission;
//# sourceMappingURL=main-page.js.map