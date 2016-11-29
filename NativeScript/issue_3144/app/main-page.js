"use strict";
var main_view_model_1 = require('./main-view-model');
var image_asset_1 = require("image-asset");
var vm = new main_view_model_1.HelloWorldModel();
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    var img = page.getViewById("res");
    var imageAs = new image_asset_1.ImageAsset(img);
    console.log(imageAs.options);
    vm.set("src", imageAs);
    //   imageAsset.getImageAsync(resImage => {
    //     vm.set("src", resImage);
    //   })
    page.bindingContext = vm;
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map