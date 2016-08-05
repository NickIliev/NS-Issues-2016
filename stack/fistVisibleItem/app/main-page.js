"use strict";
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var viewModel = new observable_1.Observable();
var myItems = new observable_array_1.ObservableArray({ title: "Core Concepts" }, { title: "User Interface" }, { title: "Plugins" }, { title: "Cookbook" }, { title: "Tutorials" });
function onLoaded(args) {
    var page = args.object;
    viewModel.set("myItems", myItems);
    // ListView will be updated automatically when new item is pushed.
    myItems.push({ title: "Publishing" });
    page.bindingContext = viewModel;
    var list = page.getViewById("list");
    console.log(list.android.getFirstVisiblePosition());
    // var firstItem = list.android.getItemAtPosition(1);
    // console.log(firstItem);
}
exports.onLoaded = onLoaded;
function listViewItemTap(args) {
    var itemIndex = args.index;
    // example how to navigate details-page & pass the tapped item context
    // frameModule.topmost().navigate({
    //     moduleName: "./details-page",
    //     context: myItems.getItem(itemIndex);
    // });
}
exports.listViewItemTap = listViewItemTap;
//# sourceMappingURL=main-page.js.map