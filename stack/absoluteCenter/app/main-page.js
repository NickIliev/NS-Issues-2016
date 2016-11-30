"use strict";
var main_view_model_1 = require('./main-view-model');
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    var cust = page.getViewById("cust");
    cust.itemTemplate = '<Label text="{{ $value }}" backgroundColor="red" textWrap="true" />';
    page.bindingContext = new main_view_model_1.HelloWorldModel();
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map