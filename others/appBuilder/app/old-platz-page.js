var frames = require("ui/frame");
var platform = require("platform");
var vmModule = require("./platz-page-model");
var appSettings = require("application-settings");
var dialogs = require("ui/dialogs");

function pageLoaded(args) {
    var page = args.object;   
    //dialogs.alert("pageload");
    vmModule.mainViewModel.loadData();
    page.bindingContext = vmModule.mainViewModel;
}

function listViewItemTap(args) {
    //dialogs.alert(args); 
	appSettings.setString("platz", "" + vmModule.mainViewModel.items.getItem(args.index).id);
    frames.topmost().navigate("kalender-view");
}

exports.pageLoaded = pageLoaded;
exports.listViewItemTap = listViewItemTap;
