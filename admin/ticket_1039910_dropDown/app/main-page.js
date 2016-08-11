var observable = require("data/observable");
var observableArray = require("data/observable-array");
var pages = require("ui/page");
 
var viewModel;
 
exports.pageLoaded = function(args) {
    var page = args.object;
    var items = new observableArray.ObservableArray();
 
    viewModel = new observable.Observable();
 
    for (var loop = 0; loop < 20; loop++) {
        items.push("Item " + loop.toString());
    }
 
    viewModel.set("items", items);
    viewModel.set("selectedIndex", 15);

    page.bindingContext = viewModel;

    var dd = page.getViewById("dd");
        
    dd.on("onSelectedIndexPropertyChanged", onchange);
}

function onchange(propertyChangeData){
    console.log(propertyChangeData.propertyName + " has been changed and the new value is: " + propertyChangeData.value);
}