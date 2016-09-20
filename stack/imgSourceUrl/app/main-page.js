"use strict";
var observable_1 = require('data/observable');
var imageSource = require("image-source");

function navigatingTo(args) {

    var page = args.object;
    var viewModel = new observable_1.Observable();
    imageSource.fromUrl("https://www.google.com/images/errors/logo_sm_2.png")
        .then(function (res) {

        viewModel.set("url", res);
    }, function (error) {
        //console.log("Error loading image: " + error);
    });
    page.bindingContext = viewModel;
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map