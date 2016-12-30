var frames = require("ui/frame");
var platform = require("platform");
var vmModule = require("./filter-view-model");
var appSettings = require("application-settings");
var dialogs = require("ui/dialogs");
var view = require("ui/core/view");

var page;

function pageLoaded(args) {
    page = args.object;
    vmModule.mainViewModel.loadDataPlatz();
    vmModule.mainViewModel.loadDataMb();
    vmModule.mainViewModel.set("showPlatzPicker", false);
    vmModule.mainViewModel.set("showPlanPicker", false);
    vmModule.mainViewModel.set("showMbPicker", false);
    page.bindingContext = vmModule.mainViewModel;
    //dialogs.alert("test"); 
}

function togglePlanPickerListe(picker) {
    vmModule.mainViewModel.set("showPlatzPicker", false);
    vmModule.mainViewModel.set("showMbPicker", false);
    if(vmModule.mainViewModel.showPlanPicker == true)
        {
            vmModule.mainViewModel.set("selectedPlan", vmModule.mainViewModel.itemsplan[parseInt(vmModule.mainViewModel.selectedIndex)]);
    		vmModule.mainViewModel.set("showPlanPicker", false);
		}
    else
        vmModule.mainViewModel.set("showPlanPicker", true);
}
function togglePlatzPickerListe(picker) {
    vmModule.mainViewModel.set("showMbPicker", false);
    vmModule.mainViewModel.set("showPlanPicker", false);
    if(vmModule.mainViewModel.showPlatzPicker == true)
        {
            vmModule.mainViewModel.set("selectedPlatz", vmModule.mainViewModel.itemsplatz[parseInt(vmModule.mainViewModel.selectedPlatzIndex)]);
    		vmModule.mainViewModel.set("showPlatzPicker", false);
            //appSettings.setString("platzindex", "" + vmModule.mainViewModel.selectedPlatzIndex);
            //appSettings.setString("platz", "" + vmModule.mainViewModel.itemsplatzid[parseInt(vmModule.mainViewModel.selectedPlatzIndex)].id);
		}
    else
        vmModule.mainViewModel.set("showPlatzPicker", true);
}
function toggleMbPickerListe(picker) {
    vmModule.mainViewModel.set("showPlatzPicker", false);
    vmModule.mainViewModel.set("showPlanPicker", false);
    if(vmModule.mainViewModel.showMbPicker == true)
        {
            vmModule.mainViewModel.set("selectedMb", vmModule.mainViewModel.itemsmb[parseInt(vmModule.mainViewModel.selectedMbIndex)]);
    		vmModule.mainViewModel.set("showMbPicker", false);
            //appSettings.setString("marbindex", "" + vmModule.mainViewModel.selectedMbIndex);
            //appSettings.setString("marb", "" + vmModule.mainViewModel.itemsmbid[parseInt(vmModule.mainViewModel.selectedMbIndex)].id);
		}
    else
        vmModule.mainViewModel.set("showMbPicker", true);
}

function neuerEvent(args) {
    appSettings.setString("abplan", "" + vmModule.mainViewModel.selectedIndex);
    appSettings.setString("platzindex", "" + vmModule.mainViewModel.selectedPlatzIndex);
    appSettings.setString("platz", "" + vmModule.mainViewModel.itemsplatzid[parseInt(vmModule.mainViewModel.selectedPlatzIndex)].id);
    appSettings.setString("marbindex", "" + vmModule.mainViewModel.selectedMbIndex);
    appSettings.setString("marb", "" + vmModule.mainViewModel.itemsplatzid[parseInt(vmModule.mainViewModel.selectedMbIndex)].Id);  
    frames.topmost().navigate("vorgabe-view");
}
function filterAnwenden(args) {
    appSettings.setString("abplan", "" + vmModule.mainViewModel.selectedIndex);
    appSettings.setString("platzindex", "" + vmModule.mainViewModel.selectedPlatzIndex);
    appSettings.setString("platz", "" + vmModule.mainViewModel.itemsplatzid[parseInt(vmModule.mainViewModel.selectedPlatzIndex)].id);
    appSettings.setString("marbindex", "" + vmModule.mainViewModel.selectedMbIndex);
    appSettings.setString("marb", "" + vmModule.mainViewModel.itemsplatzid[parseInt(vmModule.mainViewModel.selectedMbIndex)].id);
    frames.topmost().navigate("kalender-view");
}

exports.pageLoaded = pageLoaded;
exports.togglePlanPickerListe = togglePlanPickerListe;
exports.togglePlatzPickerListe = togglePlatzPickerListe;
exports.toggleMbPickerListe = toggleMbPickerListe;
exports.neuerEvent = neuerEvent;
exports.filterAnwenden = filterAnwenden;
