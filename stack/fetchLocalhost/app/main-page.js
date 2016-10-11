"use strict";
var main_view_model_1 = require('./main-view-model');
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
    fetch("http://10.0.2.2/api").then(function (response) { return response.text(); })
        .then(function (r) {
        console.log(r);
    }, function (e) {
        console.log(e);
    });
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map