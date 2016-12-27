var frames = require("ui/frame");
var platform = require("platform");
var vmModule = require("./main-page-model");
var dialogs = require("ui/dialogs");

function pageLoaded(args) {
    var page = args.object;
    vmModule.mainViewModel.loadData();
    page.bindingContext = vmModule.mainViewModel;
 	
}
exports.pageLoaded = pageLoaded;
function listViewItemTap(args) {
   
        frames.topmost().navigate("details-page");
    
    vmModule.mainViewModel.set("selectedItem", args.view.bindingContext);
}
exports.listViewItemTap = listViewItemTap;
