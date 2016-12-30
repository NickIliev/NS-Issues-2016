var frames = require("ui/frame");
var platform = require("platform");
var vmModule = require("./kalender-view-model");
//var vmModule1 = require("./mitarbeiter-page-model");  
var appSettings = require("application-settings");
var dialogs = require("ui/dialogs");
var view = require("ui/core/view");
//var calendarModule = require("nativescript-telerik-ui-pro/calendar");
//var twoPaneLayout = Math.min(platform.screen.mainScreen.widthDIPs, platform.screen.mainScreen.heightDIPs) > 600;
var page;

function pageLoaded(args) {
    page = args.object;
    
    
    vmModule.mainViewModel.set("isVisibleKalenderActivity", true);
    vmModule.mainViewModel.set("isVisibleKalender", false);
    
    vmModule.mainViewModel.loadData();
    var kalender = view.getViewById(page, "calendar");
    kalender.set("eventSource", []);
    vmModule.mainViewModel.set("kalenderName", appSettings.getString("kalendername"));
    vmModule.mainViewModel.loadDataDate();
    page.bindingContext = vmModule.mainViewModel;
    
}
function showFilter(args) {
    frames.topmost().navigate("filter-view");
}
function showSideDrawer(args) {
    
        vmModule.mainViewModel.set("showPlatzPicker", false);
        vmModule.mainViewModel.set("showPlanPicker", false);
        vmModule.mainViewModel.set("showMbPicker", false);
        sideDrawer = view.getViewById(page, "sideDrawer");
        sideDrawer.toggleDrawerState();
}
function homeNav() {
    frames.topmost().navigate("kalender-page");
}
function logoutNav() {
    frames.topmost().navigate("settings-page");
}
function onDrawerClosing(args) {
    var kalender = view.getViewById(page, "calendar");
    //kalender.viewMode = "MonthNames";
    appSettings.setString("change", "false");
    if(appSettings.getString("abplan") != vmModule.mainViewModel.selectedIndex.toString())
        appSettings.setString("change", "true");
    if(appSettings.getString("platzindex") != vmModule.mainViewModel.selectedPlatzIndex.toString())
        appSettings.setString("change", "true");
    if(appSettings.getString("marbindex") != vmModule.mainViewModel.selectedMbIndex.toString())
        appSettings.setString("change", "true");
    
    appSettings.setString("abplan", "" + vmModule.mainViewModel.selectedIndex);
    appSettings.setString("platzindex", "" + vmModule.mainViewModel.selectedPlatzIndex);
    appSettings.setString("platz", "" + vmModule.mainViewModel.itemsplatzid[parseInt(vmModule.mainViewModel.selectedPlatzIndex)].id);
    appSettings.setString("marbindex", "" + vmModule.mainViewModel.selectedMbIndex);
    appSettings.setString("marb", "" + vmModule.mainViewModel.itemsplatzid[parseInt(vmModule.mainViewModel.selectedMbIndex)].id);
    
    //var kalender = view.getViewById(page, "calendar");
    //kalender.unbind("eventSource");
    //dialogs.alert("test"); 
    //kalender.unbind("eventSource");
    //kalender.bind("eventSource", vmModule.mainViewModel.items);
    
    
    if(appSettings.getString("change") == "true")
    {
        kalender.set("eventSource", []);
        vmModule.mainViewModel.set("isVisibleKalenderActivity", true);
        vmModule.mainViewModel.set("isVisibleKalender", false);
        vmModule.mainViewModel.loadData();
    }
    
    //kalender.goToDate(new Date("2016", "4", "4"));
    
    //kalender.viewMode = "Month";
}
function onDateSelected(args) {
    
        //dialogs.alert(args.date); 
        //appSettings.setString("kalender", "" + vmModule.mainViewModel.items.getItem(args.index).id);
        appSettings.setString("date", "" + args.date);
        vmModule.mainViewModel.set("isVisibleDate", false);
        vmModule.mainViewModel.set("isVisibleDateActivity", true); 
        vmModule.mainViewModel.loadDataDate();
        //frames.topmost().navigate("main-page");
   
    
}
function selectedIndexChanged(picker) {
    dialogs.alert("change"); 
    //appSettings.setString("kalender", "" + vmModule.mainViewModel.items.getItem(args.index).id);
}
function togglePlanPickerListe(picker) {
    vmModule.mainViewModel.set("showPlatzPicker", false);
    vmModule.mainViewModel.set("showMbPicker", false);
    if (vmModule.mainViewModel.showPlanPicker == true) {
        vmModule.mainViewModel.set("selectedPlan", vmModule.mainViewModel.itemsplan[parseInt(vmModule.mainViewModel.selectedIndex)]);
        vmModule.mainViewModel.set("showPlanPicker", false);
    } else
        vmModule.mainViewModel.set("showPlanPicker", true);
}
function togglePlatzPickerListe(picker) {
    vmModule.mainViewModel.set("showMbPicker", false);
    vmModule.mainViewModel.set("showPlanPicker", false);
    if (vmModule.mainViewModel.showPlatzPicker == true) {
        vmModule.mainViewModel.set("selectedPlatz", vmModule.mainViewModel.itemsplatz[parseInt(vmModule.mainViewModel.selectedPlatzIndex)]);
        vmModule.mainViewModel.set("showPlatzPicker", false);
        //appSettings.setString("platzindex", "" + vmModule.mainViewModel.selectedPlatzIndex);
        //appSettings.setString("platz", "" + vmModule.mainViewModel.itemsplatzid[parseInt(vmModule.mainViewModel.selectedPlatzIndex)].id);
    } else
        vmModule.mainViewModel.set("showPlatzPicker", true);
}
function toggleMbPickerListe(picker) {
    vmModule.mainViewModel.set("showPlatzPicker", false);
    vmModule.mainViewModel.set("showPlanPicker", false);
    if (vmModule.mainViewModel.showMbPicker == true) {
        vmModule.mainViewModel.set("selectedMb", vmModule.mainViewModel.itemsmb[parseInt(vmModule.mainViewModel.selectedMbIndex)]);
        vmModule.mainViewModel.set("showMbPicker", false);
        //appSettings.setString("marbindex", "" + vmModule.mainViewModel.selectedMbIndex);
        //appSettings.setString("marb", "" + vmModule.mainViewModel.itemsmbid[parseInt(vmModule.mainViewModel.selectedMbIndex)].id);
    } else
        vmModule.mainViewModel.set("showMbPicker", true);
}

function listViewItemTap(args) {
    
        //dialogs.alert(args.view.bindingContext.title); 
        frames.topmost().navigate("details-page");
        vmModule.mainViewModel.set("selectedItem", args.view.bindingContext);
    
}
function neuerEvent(args) {
    appSettings.setString("abplan", "" + vmModule.mainViewModel.selectedIndex);
    appSettings.setString("platzindex", "" + vmModule.mainViewModel.selectedPlatzIndex);
    appSettings.setString("platz", "" + vmModule.mainViewModel.itemsplatzid[parseInt(vmModule.mainViewModel.selectedPlatzIndex)].id);
    appSettings.setString("marbindex", "" + vmModule.mainViewModel.selectedMbIndex);
    appSettings.setString("marb", "" + vmModule.mainViewModel.itemsmbid[parseInt(vmModule.mainViewModel.selectedMbIndex)].id);  
    frames.topmost().navigate("vorgabe-view");
}
function switchTap(args) {
    
        vmModule.mainViewModel.set("selectedItem", args.view.bindingContext);
        //frames.topmost().navigate("details-page");
        if(vmModule.mainViewModel.selectedItem.Status == "1")
            vmModule.mainViewModel.selectedItem.Status = "0";
        else
            vmModule.mainViewModel.selectedItem.Status = "1";
        vmModule.mainViewModel.saveStatus();   
    
}
function onNavigatedToDate(args) {
    //dialogs.alert(args.date);
    
}
exports.pageLoaded = pageLoaded;
exports.listViewItemTap = listViewItemTap;
exports.showSideDrawer = showSideDrawer;
exports.homeNav = homeNav;
exports.logoutNav = logoutNav;
exports.onDateSelected = onDateSelected;
exports.onNavigatedToDate = onNavigatedToDate;
exports.selectedIndexChanged = selectedIndexChanged;
exports.onDrawerClosing = onDrawerClosing;
exports.togglePlanPickerListe = togglePlanPickerListe;
exports.togglePlatzPickerListe = togglePlatzPickerListe;
exports.toggleMbPickerListe = toggleMbPickerListe;
exports.neuerEvent = neuerEvent;
exports.showFilter = showFilter; switchTap
exports.switchTap = switchTap;