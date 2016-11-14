"use strict";
var main_view_model_1 = require('./main-view-model');
var tab_view_1 = require("ui/tab-view");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
    var tabView = page.getViewById('tabs');
    tabView.on(tab_view_1.TabView.selectedIndexChangedEvent, function (args) {
        switch (args.newIndex) {
            case 0:
                page.bindingContext = {};
                console.log("tapped 1");
                break;
            case 1:
                page.bindingContext = {};
                console.log("tapped 2");
                break;
        }
    });
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map