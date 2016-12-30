var frames = require("ui/frame");
//var platform = require("platform");
var vmModule = require("./kalender-page-model");
var appSettings = require("application-settings");
var dialogs = require("ui/dialogs");

function pageLoaded(args) {
    var page = args.object;   
    //dialogs.alert("pageload");
    vmModule.mainViewModel.loadData();
    vmModule.mainViewModel.set("isVisibleGemeindenActivity", true);
    vmModule.mainViewModel.set("isVisibleGemeinden", false); 
    page.bindingContext = vmModule.mainViewModel;
    
}

function listViewItemTap(args) {
    
    if(appSettings.getString("kalender") == vmModule.mainViewModel.items.getItem(args.index).id.toString())
        appSettings.setString("change", "false");
    else
        appSettings.setString("change", "true");
    
	appSettings.setString("kalender", "" + vmModule.mainViewModel.items.getItem(args.index).id);
    appSettings.setString("kalendername", "" + vmModule.mainViewModel.items.getItem(args.index).name);
    appSettings.setString("platz", "0");
    appSettings.setString("platzindex", "0");  
    appSettings.setString("marb", "0");
    appSettings.setString("marbindex", "0");
    appSettings.setString("abplan", "1");
    //dialogs.alert(vmModule.mainViewModel.items.getItem(args.index).id.toString());
    
   
    frames.topmost().navigate("kalender-view");
}
function logoutNav() {
    frames.topmost().navigate("settings-page");
}
exports.pageLoaded = pageLoaded;
exports.listViewItemTap = listViewItemTap;
exports.logoutNav = logoutNav;
