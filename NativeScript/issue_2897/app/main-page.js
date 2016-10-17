"use strict";
var tab_view_1 = require("ui/tab-view");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    //tabViewID Change your tabview id.
    var tabView = page.getViewById("tabViewID");
    tabView.on(tab_view_1.TabView.selectedIndexChangedEvent, function (args) {
        var actualOldIndex = args.oldIndex;
        var actualNewIndex = args.newIndex;
        var previousTab = tabView.items[actualOldIndex];
        var selectedTab = tabView.items[actualNewIndex];
        selectedTab.view.android.setAllCaps(false);
    });
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map