"use strict";
var enums_1 = require("ui/enums");
var imageSource = require("image-source");
var fs = require("file-system");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
}
exports.navigatingTo = navigatingTo;
function saveImage() {
    var img = imageSource.fromResource("icon");
    var folder = fs.knownFolders.temp();
    var path = fs.path.join(folder.path, "TestIcon.jpg");
    var saved = img.saveToFile(path, enums_1.ImageFormat.jpg);
    console.log(saved);
}
exports.saveImage = saveImage;
function loadFile() {
    var folder = fs.knownFolders.temp();
    var path = fs.path.join(folder.path, "TestIcon.jpg");
    var img = imageSource.fromFile(path);
    console.log(img);
    console.log(img.width);
}
exports.loadFile = loadFile;
//# sourceMappingURL=main-page.js.map