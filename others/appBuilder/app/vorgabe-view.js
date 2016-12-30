var frames = require("ui/frame");
var platform = require("platform");
var vmModule = require("./vorgabe-view-model");
var vmModule1 = require("./kalender-view-model");
var appSettings = require("application-settings");
var dialogs = require("ui/dialogs");
var view = require("ui/core/view");

function pageLoaded(args) {
    var page = args.object;   
    //dialogs.alert("pageload");
    vmModule.mainViewModel.loadData();
    page.bindingContext = vmModule.mainViewModel;
    vmModule.mainViewModel.set("kalenderName", appSettings.getString("kalendername"));
}

function listViewItemTap(args) {
    //dialogs.alert(args); 
	//appSettings.setString("vorgabe", "" + vmModule.mainViewModel.items.getItem(args.index).Id);
    vmModule1.mainViewModel.set("selectedItem", args.view.bindingContext);
    frames.topmost().navigate("details-page");
}

exports.pageLoaded = pageLoaded;
exports.listViewItemTap = listViewItemTap;
