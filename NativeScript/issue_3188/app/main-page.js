"use strict";
var main_view_model_1 = require('./main-view-model');
var image_source_1 = require("image-source");
var camera = require("nativescript-camera");
var fs = require("file-system");
var img;
// Event handler for Page "navigatingTo" event attached in main-page.xml
function onLoaded(args) {
    // Get the event sender
    var page = args.object;
    img = page.getViewById("img");
    camera.requestPermissions();
    page.bindingContext = new main_view_model_1.HelloWorldModel();
}
exports.onLoaded = onLoaded;
function onTap() {
    camera.takePicture().
        then(function (imageAsset) {
        console.log("Result is an image asset instance");
        img.src = imageAsset;
        image_source_1.fromAsset(imageAsset).then(function (res) {
            var folder = fs.knownFolders.documents();
            var path = fs.path.join(folder.path, "Test.png");
            var saved = res.saveToFile(path, "png");
        });
    }).catch(function (err) {
        console.log("Error -> " + err.message);
    });
}
exports.onTap = onTap;
//# sourceMappingURL=main-page.js.map