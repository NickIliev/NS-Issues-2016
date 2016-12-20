"use strict";
var imageSource = require("image-source");
require("files/non-existing.txt");
function onLoaded(args) {
    var page = args.object;
    var img = page.getViewById("img");
    imageSource.fromUrl("https://www.google.com/images/errors/logo_sm_2.png")
        .then(function (res) {
        // console.log("Successfully loaded");
        img.imageSource = res;
    }).catch(function (err) {
        // console.log("Somthing went wrong!");
    });
}
exports.onLoaded = onLoaded;
function onImageLoaded(args) {
    console.log(args.eventName);
    console.log(args.object);
    var img = args.object;
    console.log("img.isLoading: " + img.isLoading);
    console.log("img.isLoaded: " + img.isLoaded);
}
exports.onImageLoaded = onImageLoaded;
//# sourceMappingURL=main-page.js.map