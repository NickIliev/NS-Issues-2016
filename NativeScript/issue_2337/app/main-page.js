"use strict";
var observable_1 = require("data/observable");
var tabViewModule = require("ui/tab-view");
var colorModule = require("color");
var stackLayoutModule = require("ui/layouts/stack-layout");
var textViewModule = require("ui/text-view");
var page;
// Event handler for Page "navigatingTo" event attached in main-page.xml
function onLoaded(args) {
    // Get the event sender
    page = args.object;
    // addTabViewItem();
    var vm = new observable_1.Observable();
    vm.set("isItemVisible", false);
    page.bindingContext = vm;
}
exports.onLoaded = onLoaded;
function addTabViewItem() {
    var stackLayout = new stackLayoutModule.StackLayout();
    var textView1 = new textViewModule.TextView();
    textView1.editable = true;
    textView1.style.fontSize = 16;
    textView1.style.backgroundColor = new colorModule.Color("BlanchedAlmond");
    textView1.height = 150;
    textView1.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus purus quis metus mattis euismod. Mauris ac purus commodo, sollicitudin tellus blandit, gravida turpis.";
    stackLayout.addChild(textView1);
    var tabViewItem = new tabViewModule.TabViewItem();
    tabViewItem.title = "Tab 4",
        tabViewItem.view = stackLayout;
    var tabView = page.getViewById("tabViewContainer");
    tabView.items.push(tabViewItem);
    var stack = page.getViewById("container");
    // stack.removeChildren();
    // stack.addChild(tabView);
    var myStack = tabView.parent;
    myStack.removeChildren();
    myStack.addChild(tabView);
}
exports.addTabViewItem = addTabViewItem;
//# sourceMappingURL=main-page.js.map