"use strict";
var observable_1 = require("data/observable");
var imageCacheModule = require("ui/image-cache");
var imageSourceModule = require("image-source");
var imageModule = require("ui/image");
var cache = new imageCacheModule.Cache();
cache.maxRequests = 5;
var viewModel = new observable_1.Observable();
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    var someImageUrl = "https://github.com/NativeScript.png";
    var resultImage = getImage(someImageUrl);
    // console.log(resultImage);
    setTimeout(function () {
        var imgSrc = cache.get("some-image-key");
        viewModel.set("mySource", imgSrc);
    }, 1000);
    page.bindingContext = viewModel;
}
exports.navigatingTo = navigatingTo;
function getImage(source) {
    var image = cache.get(source);
    if (image) {
        return image;
    }
    else {
        var newImage = new imageModule.Image();
        cache.push({
            key: "some-image-key",
            url: source,
            completed: function (resultNativeImage, key) {
                // console.log(resultImage); // result is native image (android or ios)
                var imgSouce = imageSourceModule.fromNativeSource(resultNativeImage);
                newImage.src = imgSouce;
                // console.log(newImage); // now we have NativeScript image
                // console.log(key);
            }
        });
        return newImage;
    }
}
function onTap(args) {
    var newImage = new imageModule.Image();
    newImage.src = imageSourceModule.fromResource("icon");
    cache.set("mew-key", newImage); // error thown here
    // viewModel.set("mySource", cache.get("new-key"));
    var temp = cache.get("new-key");
    console.log(temp);
}
exports.onTap = onTap;
//# sourceMappingURL=main-page.js.map