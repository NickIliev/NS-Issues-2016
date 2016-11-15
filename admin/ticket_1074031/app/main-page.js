"use strict";
var main_view_model_1 = require('./main-view-model');
var application = require("application");
var frame = require("ui/frame");
var list;
var vm = new main_view_model_1.ViewModel();
vm.set("cachedIndex", 0);
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = vm;
}
exports.navigatingTo = navigatingTo;
function onListLoaded(args) {
    list = args.object;
    if (list.items) {
        list.scrollToIndex(vm.get("cachedIndex"));
    }
    list.refresh();
}
exports.onListLoaded = onListLoaded;
function onItemSelected(args) {
    console.log(args.itemIndex);
    console.log(args.groupIndex);
}
exports.onItemSelected = onItemSelected;
function onItemTap(args) {
    var tappedItemIndex = args.itemIndex;
    vm.set("cachedIndex", tappedItemIndex);
    var tappedItem = vm.get("dataItems").getItem(tappedItemIndex);
    var navEntry = {
        moduleName: "details-page",
        context: { "tappedItem": tappedItem },
        animated: true,
        transition: {
            name: application.android ? "explode" : "curl"
        }
    };
    frame.topmost().navigate(navEntry);
}
exports.onItemTap = onItemTap;
//# sourceMappingURL=main-page.js.map