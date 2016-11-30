"use strict";
var image_source_1 = require("image-source");
var camera = require("nativescript-camera");
var fs = require("file-system");
var imageModule = require("ui/image");
var img;
var myImageSource;
// Event handler for Page "navigatingTo" event attached in main-page.xml
function onLoaded(args) {
    // Get the event sender
    var page = args.object;
    img = page.getViewById("img");
    camera.requestPermissions();
}
exports.onLoaded = onLoaded;
function takePhoto() {
    camera.takePicture()
        .then(function (imageAsset) {
        console.log("Result is an image asset instance");
        img.src = imageAsset;
        image_source_1.fromAsset(imageAsset).then(function (res) {
            myImageSource = res;
            console.log(myImageSource);
        });
    }).catch(function (err) {
        console.log("Error -> " + err.message);
    });
}
exports.takePhoto = takePhoto;
function saveToFile() {
    var knownPath = fs.knownFolders.documents();
    var folderPath = fs.path.join(knownPath.path, "CosmosDataBank");
    var folder = fs.Folder.fromPath(folderPath);
    var path = fs.path.join(folderPath, "Test.png");
    var saved = myImageSource.saveToFile(path, "png");
    console.log(saved);
}
exports.saveToFile = saveToFile;
//# sourceMappingURL=main-page.js.map