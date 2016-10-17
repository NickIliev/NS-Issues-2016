"use strict";
var main_view_model_1 = require('./main-view-model');
var imageSource = require("image-source");
var vm = new main_view_model_1.HelloWorldModel();
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    imageSource.fromUrl("https://res.cloudinary.com/demo/image/upload/Sample.jpg")
        .then(function (res) {
        vm.set("img", res);
    }).catch(function (err) {
        console.log(err.stack);
    });
    page.bindingContext = vm;
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map