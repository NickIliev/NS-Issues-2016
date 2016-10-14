"use strict";
var main_view_model_1 = require('./main-view-model');
var imageSource = require("image-source");
var vm = new main_view_model_1.HelloWorldModel();
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    imageSource.fromUrl("https://www.google.com/images/errors/logo_sm_2.png")
        .then(function (res) {
        vm.set("img", res);
    }, function (error) {
        //console.log("Error loading image: " + error);
    });
    page.bindingContext = vm;
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map