"use strict";
var observable_array_1 = require('data/observable-array');
var tabViewModule = require("ui/tab-view");
var stackLayoutModule = require("ui/layouts/stack-layout");
var labelModule = require("ui/label");
var colors = new observable_array_1.ObservableArray(["red", "green", "blue"]);
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = colors;
    var tabView = new tabViewModule.TabView();
    var items = [];
    for (var index = 0; index < colors.length; index++) {
        var element = colors.getItem(index);
        console.log(element);
        var stackLayout = new stackLayoutModule.StackLayout();
        var label = new labelModule.Label();
        label.text = element;
        stackLayout.addChild(label);
        var tabEntry = {
            title: "Tab #" + index,
            view: stackLayout
        };
        items.push(tabEntry);
    }
    tabView.items = items;
    page.content = tabView;
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map