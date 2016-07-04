"use strict";
var main_view_model_1 = require("./main-view-model");
var viewModel = new main_view_model_1.MagnitudeModel();
// Event handler for Page "navigatingTo" event attached in main-page.xml
function onLoaded(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = viewModel;
    setInterval(function () {
        var oldMagnityude = viewModel.get("magnitude");
        var newMagnitude = parseFloat(oldMagnityude) + 20;
        viewModel.changeMagnitude(newMagnitude.toString());
    }, 2000);
}
exports.onLoaded = onLoaded;
//# sourceMappingURL=main-page.js.map