"use strict";
var observable_1 = require("data/observable");
var tab_view_1 = require('ui/tab-view');
var viewModel = new observable_1.Observable();
viewModel.set("selIndex", 0);
var THIS_TAB_IDX = 0;
var isThisTabSelected = false;
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    var tab = page.getViewById("tabViewContainer");
    isThisTabSelected = tab.selectedIndex === THIS_TAB_IDX;
    tab.on(tab_view_1.TabView.selectedIndexChangedEvent, function (args) {
        isThisTabSelected = args.newIndex === THIS_TAB_IDX;
    });
    page.bindingContext = viewModel;
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map