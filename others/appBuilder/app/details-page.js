var frames = require("ui/frame");
var platform = require("platform");
var vmModule1 = require("./kalender-view-model");
var vmModule = require("./details-page-model");
var appSettings = require("application-settings");
var dialogs = require("ui/dialogs");
var view = require("ui/core/view");

var page;

function pageNavigatedTo(args) {
    page = args.object;
    vmModule.mainViewModel.set("TextViewTitleEditable", false);
    vmModule.mainViewModel.set("TextViewTextEditable", false);
    vmModule.mainViewModel.set("selectedItem", vmModule1.mainViewModel.selectedItem);
    vmModule.mainViewModel.set("itemsplan", vmModule1.mainViewModel.itemsplan);
    
    vmModule.mainViewModel.set("itemsplatz", vmModule1.mainViewModel.itemsplatz);
    vmModule.mainViewModel.set("itemsplatzid", vmModule1.mainViewModel.itemsplatzid);
    vmModule.mainViewModel.set("itemsmb", vmModule1.mainViewModel.itemsmb);
    vmModule.mainViewModel.set("itemsmbid", vmModule1.mainViewModel.itemsmbid);
    vmModule.mainViewModel.set("itemskabinen", vmModule1.mainViewModel.itemskabinen);
    vmModule.mainViewModel.set("itemskabinenid", vmModule1.mainViewModel.itemskabinenid);
    vmModule.mainViewModel.set("itemsflaechen", vmModule1.mainViewModel.itemsflaechen);
    vmModule.mainViewModel.set("itemsflaechenid", vmModule1.mainViewModel.itemsflaechenid);

    vmModule.mainViewModel.set("selectedPlan", vmModule.mainViewModel.itemsplan[vmModule.mainViewModel.selectedItem.Plantyp]);
    vmModule.mainViewModel.set("selectedIndex", parseInt(vmModule.mainViewModel.selectedItem.Plantyp));

    vmModule.mainViewModel.set("selectedStatus", vmModule.mainViewModel.itemsstatus[vmModule.mainViewModel.selectedItem.Status]);
    vmModule.mainViewModel.set("selectedStatusIndex", parseInt(vmModule.mainViewModel.selectedItem.Status));

    vmModule.mainViewModel.set("showTimePickerVon", false);
    vmModule.mainViewModel.set("showTimePickerBis", false);
    
    vmModule.mainViewModel.set("vonh", vmModule.mainViewModel.selectedItem.Start.getHours());   
    vmModule.mainViewModel.set("vonm", vmModule.mainViewModel.selectedItem.Start.getMinutes());
    vmModule.mainViewModel.set("von", tohhmm(vmModule.mainViewModel.selectedItem.Start));
    vmModule.mainViewModel.set("bish", vmModule.mainViewModel.selectedItem.End.getHours());
    vmModule.mainViewModel.set("bism", vmModule.mainViewModel.selectedItem.End.getMinutes());
    vmModule.mainViewModel.set("bis", tohhmm(vmModule.mainViewModel.selectedItem.End));

    vmModule.mainViewModel.set("vonyear", vmModule.mainViewModel.selectedItem.Start.getFullYear());
    vmModule.mainViewModel.set("vonmonth", vmModule.mainViewModel.selectedItem.Start.getMonth() + 1);
    vmModule.mainViewModel.set("vonday", vmModule.mainViewModel.selectedItem.Start.getDate());
    vmModule.mainViewModel.set("vondate", toDDMMYYYY(vmModule.mainViewModel.selectedItem.Start));

    for (var i = 0; i < vmModule.mainViewModel.itemsplatzid.length; i++) {
        if (vmModule.mainViewModel.itemsplatzid[i].id == vmModule.mainViewModel.selectedItem.Platz) {
            vmModule.mainViewModel.set("selectedPlatz", vmModule.mainViewModel.itemsplatz[i]);
            vmModule.mainViewModel.set("selectedPlatzIndex", i);
        }
    }
    if( vmModule.mainViewModel.selectedPlatzIndex == 0)
    {
        vmModule.mainViewModel.set("showSpeichern", false); // 
        vmModule.mainViewModel.set("showPlatzAlert", true);
    }
    else
    {
        vmModule.mainViewModel.set("showSpeichern", true);
        vmModule.mainViewModel.set("showPlatzAlert", false);
    }
    
    for (var i = 0; i < vmModule.mainViewModel.itemsmbid.length; i++) {
        if (vmModule.mainViewModel.itemsmbid[i].id == vmModule.mainViewModel.selectedItem.BenutzerId) {
            vmModule.mainViewModel.set("selectedMb", vmModule.mainViewModel.itemsmb[i]);
            vmModule.mainViewModel.set("selectedMbIndex", i);
        }
    }
    for (var i = 0; i < vmModule.mainViewModel.itemskabinenid.length; i++) {
        if (vmModule.mainViewModel.itemskabinenid[i].id == vmModule.mainViewModel.selectedItem.Kabine) {
            vmModule.mainViewModel.set("selectedKabine", vmModule.mainViewModel.itemskabinen[i]);
            vmModule.mainViewModel.set("selectedKabineIndex", i);
        }
    }
    for (var i = 0; i < vmModule.mainViewModel.itemsflaechenid.length; i++) {
        if (vmModule.mainViewModel.itemsflaechenid[i].id == vmModule.mainViewModel.selectedItem.Flaeche) {
            vmModule.mainViewModel.set("selectedFlaeche", vmModule.mainViewModel.itemsflaechen[i]);
            vmModule.mainViewModel.set("selectedFlaecheIndex", i);
        }
    }
    page.bindingContext = vmModule.mainViewModel;
    vmModule.mainViewModel.set("kalenderName", appSettings.getString("kalendername"));
    //page.bindingContext =  vmModule.mainViewModel;
}

function togglePlanPickerListe(picker) {
    vmModule.mainViewModel.set("showMbPicker", false);
    //vmModule.mainViewModel.set("showPlanPicker", false);
    vmModule.mainViewModel.set("showPlatzPicker", false);
    vmModule.mainViewModel.set("showStatusPicker", false);
    vmModule.mainViewModel.set("showKabinePicker", false);
    vmModule.mainViewModel.set("showFlaechePicker", false);
    vmModule.mainViewModel.set("showTimePickerVon", false);
    vmModule.mainViewModel.set("showTimePickerBis", false);
    vmModule.mainViewModel.set("showDatePickerVon", false);

    if (vmModule.mainViewModel.showPlanPicker == true) {
        vmModule.mainViewModel.set("selectedPlan", vmModule.mainViewModel.itemsplan[parseInt(vmModule.mainViewModel.selectedIndex)]);
        vmModule.mainViewModel.selectedItem.Plantyp = vmModule.mainViewModel.selectedIndex;
        vmModule.mainViewModel.set("showPlanPicker", false);
    } else
        vmModule.mainViewModel.set("showPlanPicker", true);
    
}

function toggleStatusPickerListe(picker) {
    vmModule.mainViewModel.set("showMbPicker", false);
    vmModule.mainViewModel.set("showPlanPicker", false);
    vmModule.mainViewModel.set("showPlatzPicker", false);
    //vmModule.mainViewModel.set("showStatusPicker", false);
    vmModule.mainViewModel.set("showKabinePicker", false);
    vmModule.mainViewModel.set("showFlaechePicker", false);
    vmModule.mainViewModel.set("showTimePickerVon", false);
    vmModule.mainViewModel.set("showTimePickerBis", false);
    vmModule.mainViewModel.set("showDatePickerVon", false);

    if (vmModule.mainViewModel.showStatusPicker == true) {
        vmModule.mainViewModel.set("selectedStatus", vmModule.mainViewModel.itemsstatus[parseInt(vmModule.mainViewModel.selectedStatusIndex)]);
        //vmModule.mainViewModel.selectedItem.Status = vmModule.mainViewModel.selectedStatusIndex;
        vmModule.mainViewModel.set("showStatusPicker", false);
    } else
        vmModule.mainViewModel.set("showStatusPicker", true);
}

function togglePlatzPickerListe(picker) {
    vmModule.mainViewModel.set("showMbPicker", false);
    vmModule.mainViewModel.set("showPlanPicker", false);
    //vmModule.mainViewModel.set("showPlatzPicker", false);
    vmModule.mainViewModel.set("showStatusPicker", false);
    vmModule.mainViewModel.set("showKabinePicker", false);
    vmModule.mainViewModel.set("showFlaechePicker", false);
    vmModule.mainViewModel.set("showTimePickerVon", false);
    vmModule.mainViewModel.set("showTimePickerBis", false);
    vmModule.mainViewModel.set("showDatePickerVon", false);
    if (vmModule.mainViewModel.showPlatzPicker == true) {
        vmModule.mainViewModel.set("selectedPlatz", vmModule.mainViewModel.itemsplatz[parseInt(vmModule.mainViewModel.selectedPlatzIndex)]);
        //vmModule.mainViewModel.selectedItem.Platz = vmModule.mainViewModel.itemsplatzid[parseInt(vmModule.mainViewModel.selectedPlatzIndex)].id;
        vmModule.mainViewModel.set("showPlatzPicker", false);
        //appSettings.setString("platzindex", "" + vmModule.mainViewModel.selectedPlatzIndex);
        //appSettings.setString("platz", "" + vmModule.mainViewModel.itemsplatzid[parseInt(vmModule.mainViewModel.selectedPlatzIndex)].id);
    } else
        vmModule.mainViewModel.set("showPlatzPicker", true);
    if( vmModule.mainViewModel.selectedPlatzIndex == 0)
    {
        vmModule.mainViewModel.set("showSpeichern", false); // 
        vmModule.mainViewModel.set("showPlatzAlert", true);
    }
    else
    {
        vmModule.mainViewModel.set("showSpeichern", true);
        vmModule.mainViewModel.set("showPlatzAlert", false);
    }
}

function toggleMbPickerListe(picker) {
    //vmModule.mainViewModel.set("showMbPicker", false);
    vmModule.mainViewModel.set("showPlanPicker", false);
    vmModule.mainViewModel.set("showPlatzPicker", false);
    vmModule.mainViewModel.set("showStatusPicker", false);
    vmModule.mainViewModel.set("showKabinePicker", false);
    vmModule.mainViewModel.set("showFlaechePicker", false);
    vmModule.mainViewModel.set("showTimePickerVon", false);
    vmModule.mainViewModel.set("showTimePickerBis", false);
    vmModule.mainViewModel.set("showDatePickerVon", false);
    if (vmModule.mainViewModel.showMbPicker == true) {
        vmModule.mainViewModel.set("selectedMb", vmModule.mainViewModel.itemsmb[parseInt(vmModule.mainViewModel.selectedMbIndex)]);
        //vmModule.mainViewModel.selectedItem.Platz = vmModule.mainViewModel.itemsmbid[parseInt(vmModule.mainViewModel.selectedMbIndex)].id
        vmModule.mainViewModel.set("showMbPicker", false);
        //appSettings.setString("marbindex", "" + vmModule.mainViewModel.selectedMbIndex);
        //appSettings.setString("marb", "" + vmModule.mainViewModel.itemsmbid[parseInt(vmModule.mainViewModel.selectedMbIndex)].id);
    } else
        vmModule.mainViewModel.set("showMbPicker", true);
    
}

function toggleKabinePickerListe(picker) {
    vmModule.mainViewModel.set("showMbPicker", false);
    vmModule.mainViewModel.set("showPlanPicker", false);
    vmModule.mainViewModel.set("showPlatzPicker", false);
    vmModule.mainViewModel.set("showStatusPicker", false);
    //vmModule.mainViewModel.set("showKabinePicker", false);
    vmModule.mainViewModel.set("showFlaechePicker", false);
    vmModule.mainViewModel.set("showTimePickerVon", false);
    vmModule.mainViewModel.set("showTimePickerBis", false);
    vmModule.mainViewModel.set("showDatePickerVon", false);
    if (vmModule.mainViewModel.showKabinePicker == true) {
        vmModule.mainViewModel.set("selectedKabine", vmModule.mainViewModel.itemskabinen[parseInt(vmModule.mainViewModel.selectedKabineIndex)]);
        //vmModule.mainViewModel.selectedItem.Kabine = vmModule.mainViewModel.itemskabinenid[parseInt(vmModule.mainViewModel.selectedKabineIndex)].id;
        vmModule.mainViewModel.set("showKabinePicker", false);
        //appSettings.setString("marbindex", "" + vmModule.mainViewModel.selectedMbIndex);
        //appSettings.setString("marb", "" + vmModule.mainViewModel.itemsmbid[parseInt(vmModule.mainViewModel.selectedMbIndex)].id);
    } else
        vmModule.mainViewModel.set("showKabinePicker", true);
}

function toggleFlaechePickerListe(picker) {
    vmModule.mainViewModel.set("showMbPicker", false);
    vmModule.mainViewModel.set("showPlanPicker", false);
    vmModule.mainViewModel.set("showPlatzPicker", false);
    vmModule.mainViewModel.set("showStatusPicker", false);
    vmModule.mainViewModel.set("showKabinePicker", false);
    //vmModule.mainViewModel.set("showFlaechePicker", false);
    vmModule.mainViewModel.set("showTimePickerVon", false);
    vmModule.mainViewModel.set("showTimePickerBis", false);
    vmModule.mainViewModel.set("showDatePickerVon", false);
    if (vmModule.mainViewModel.showFlaechePicker == true) {
        vmModule.mainViewModel.set("selectedFlaeche", vmModule.mainViewModel.itemsflaechen[parseInt(vmModule.mainViewModel.selectedFlaecheIndex)]);
        //vmModule.mainViewModel.selectedItem.Flaeche = vmModule.mainViewModel.itemsflaechenid[parseInt(vmModule.mainViewModel.selectedFlaecheIndex)].id
        vmModule.mainViewModel.set("showFlaechePicker", false);
        //appSettings.setString("marbindex", "" + vmModule.mainViewModel.selectedMbIndex);
        //appSettings.setString("marb", "" + vmModule.mainViewModel.itemsmbid[parseInt(vmModule.mainViewModel.selectedMbIndex)].id);
    } else
        vmModule.mainViewModel.set("showFlaechePicker", true);
}

function toggleTextViewText() {
    if (vmModule.mainViewModel.TextViewTextEditable == true)
        vmModule.mainViewModel.set("TextViewTextEditable", false);
    else {
        vmModule.mainViewModel.set("TextViewTextEditable", true);
        var textviewtext = view.getViewById(page, "textviewtext");
        textviewtext.focus();
    }
}

function toggleTextViewTitle() {
    if (vmModule.mainViewModel.TextViewTitleEditable == true)
        vmModule.mainViewModel.set("TextViewTitleEditable", false);
    else {
        vmModule.mainViewModel.set("TextViewTitleEditable", true);
        var textviewtitle = view.getViewById(page, "textviewtitle");
        textviewtitle.focus();
    }
}
function toggleTextViewMenge() {
    if (vmModule.mainViewModel.TextViewMengeEditable == true)
        vmModule.mainViewModel.set("TextViewMengeEditable", false);
    else {
        vmModule.mainViewModel.set("TextViewMengeEditable", true);
        var textviewmenge = view.getViewById(page, "textviewmenge");
        textviewmenge.focus();
    }
}
function toggleTimePickerVon() {
    vmModule.mainViewModel.set("showMbPicker", false);
    vmModule.mainViewModel.set("showPlanPicker", false);
    vmModule.mainViewModel.set("showPlatzPicker", false);
    vmModule.mainViewModel.set("showStatusPicker", false);
    vmModule.mainViewModel.set("showKabinePicker", false);
    vmModule.mainViewModel.set("showFlaechePicker", false);
    //vmModule.mainViewModel.set("showTimePickerVon", false);
    vmModule.mainViewModel.set("showTimePickerBis", false);
    vmModule.mainViewModel.set("showDatePickerVon", false);
    if (vmModule.mainViewModel.showTimePickerVon == true) {
        vmModule.mainViewModel.set("von", (vmModule.mainViewModel.vonh + 100).toString().slice(-2) + ":" + (vmModule.mainViewModel.vonm + 100).toString().slice(-2));
        vmModule.mainViewModel.set("showTimePickerVon", false);
    } else {
        vmModule.mainViewModel.set("showTimePickerVon", true);
    }
}

function toggleTimePickerBis() {
    vmModule.mainViewModel.set("showMbPicker", false);
    vmModule.mainViewModel.set("showPlanPicker", false);
    vmModule.mainViewModel.set("showPlatzPicker", false);
    vmModule.mainViewModel.set("showStatusPicker", false);
    vmModule.mainViewModel.set("showKabinePicker", false);
    vmModule.mainViewModel.set("showFlaechePicker", false);
    vmModule.mainViewModel.set("showTimePickerVon", false);
    //vmModule.mainViewModel.set("showTimePickerBis", false);
    vmModule.mainViewModel.set("showDatePickerVon", false);
    if (vmModule.mainViewModel.showTimePickerBis == true) {
        vmModule.mainViewModel.set("bis", (vmModule.mainViewModel.bish + 100).toString().slice(-2) + ":" + (vmModule.mainViewModel.bism + 100).toString().slice(-2));
        vmModule.mainViewModel.set("showTimePickerBis", false);
    } else {
        vmModule.mainViewModel.set("showTimePickerBis", true);
    }
}

function toggleDatePickerVon() {
    vmModule.mainViewModel.set("showMbPicker", false);
    vmModule.mainViewModel.set("showPlanPicker", false);
    vmModule.mainViewModel.set("showPlatzPicker", false);
    vmModule.mainViewModel.set("showStatusPicker", false);
    vmModule.mainViewModel.set("showKabinePicker", false);
    vmModule.mainViewModel.set("showFlaechePicker", false);
    vmModule.mainViewModel.set("showTimePickerVon", false);
    vmModule.mainViewModel.set("showTimePickerBis", false);
    //vmModule.mainViewModel.set("showDatePickerVon", false);
    if (vmModule.mainViewModel.showDatePickerVon == true) {
        vmModule.mainViewModel.set("vondate", (vmModule.mainViewModel.vonday + 100).toString().slice(-2) + "." + (vmModule.mainViewModel.vonmonth + 100).toString().slice(-2) + "." + vmModule.mainViewModel.vonyear);
        vmModule.mainViewModel.set("showDatePickerVon", false);
    } else {
        vmModule.mainViewModel.set("showDatePickerVon", true);
    }
}
function speichern() {   
    vmModule.mainViewModel.selectedItem.Plan = vmModule.mainViewModel.selectedIndex;
    vmModule.mainViewModel.selectedItem.Platz = vmModule.mainViewModel.itemsplatzid[parseInt(vmModule.mainViewModel.selectedPlatzIndex)].id;
    vmModule.mainViewModel.selectedItem.BenutzerId = vmModule.mainViewModel.itemsmbid[parseInt(vmModule.mainViewModel.selectedMbIndex)].id;
    vmModule.mainViewModel.selectedItem.Status = vmModule.mainViewModel.selectedStatusIndex;
    vmModule.mainViewModel.selectedItem.Kabine = vmModule.mainViewModel.itemskabinenid[parseInt(vmModule.mainViewModel.selectedKabineIndex)].id;
    //dialogs.alert(vmModule.mainViewModel.selectedFlaecheIndex);
    vmModule.mainViewModel.selectedItem.Flaeche = vmModule.mainViewModel.itemsflaechenid[parseInt(vmModule.mainViewModel.selectedFlaecheIndex)].id;
    //vmModule.mainViewModel.selectedItem.Flaeche = "0";
    vmModule.mainViewModel.selectedItem.Start = new Date(vmModule.mainViewModel.vonyear, vmModule.mainViewModel.vonmonth - 1 , vmModule.mainViewModel.vonday, vmModule.mainViewModel.vonh, vmModule.mainViewModel.vonm, 0, 0);
    vmModule.mainViewModel.selectedItem.End = new Date(vmModule.mainViewModel.vonyear, vmModule.mainViewModel.vonmonth - 1, vmModule.mainViewModel.vonday, vmModule.mainViewModel.bish, vmModule.mainViewModel.bism, 0, 0);
    vmModule.mainViewModel.saveData();
    frames.topmost().navigate("kalender-view");
}
function loeschen() { 
    dialogs.confirm("Event löschen?").then(function (result) {
        //dialogs.alert("Dialog result: " + result);
        if (result) {
            loeschenBestaetigt();
        }
    });
}
function loeschenBestaetigt() {
    vmModule.mainViewModel.selectedItem.Plan = vmModule.mainViewModel.selectedIndex;
    vmModule.mainViewModel.selectedItem.Platz = vmModule.mainViewModel.itemsplatzid[parseInt(vmModule.mainViewModel.selectedPlatzIndex)].id;
    vmModule.mainViewModel.selectedItem.BenutzerId = vmModule.mainViewModel.itemsmbid[parseInt(vmModule.mainViewModel.selectedMbIndex)].id;
    vmModule.mainViewModel.selectedItem.Status = vmModule.mainViewModel.selectedStatusIndex;
    vmModule.mainViewModel.selectedItem.Kabine = vmModule.mainViewModel.itemskabinenid[parseInt(vmModule.mainViewModel.selectedKabineIndex)].id;
    //dialogs.alert(vmModule.mainViewModel.selectedFlaecheIndex);
    vmModule.mainViewModel.selectedItem.Flaeche = vmModule.mainViewModel.itemsflaechenid[parseInt(vmModule.mainViewModel.selectedFlaecheIndex)].id;
    //vmModule.mainViewModel.selectedItem.Flaeche = "0";
    vmModule.mainViewModel.selectedItem.Start = new Date(vmModule.mainViewModel.vonyear, vmModule.mainViewModel.vonmonth - 1 , vmModule.mainViewModel.vonday, vmModule.mainViewModel.vonh, vmModule.mainViewModel.vonm, 0, 0);
    vmModule.mainViewModel.selectedItem.End = new Date(vmModule.mainViewModel.vonyear, vmModule.mainViewModel.vonmonth - 1, vmModule.mainViewModel.vonday, vmModule.mainViewModel.bish, vmModule.mainViewModel.bism, 0, 0);
    vmModule.mainViewModel.deleteData();
    frames.topmost().navigate("kalender-view");
}
function toDDMMYYYY(d) {
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth() + 101).toString().slice(-2);
    var dd = (d.getDate() + 100).toString().slice(-2);
    return dd + "." + mm + "." + yyyy;
}

function tohhmm(d) {
    var hh = (d.getHours() + 100).toString().slice(-2);
    var mm = (d.getMinutes() + 100).toString().slice(-2);
    return hh + ":" + mm;
}

function tohh(d) {
    var hh = (d.getHours() + 100).toString().slice(-2);

    return hh;
}

function tomm(d) {
    var mm = (d.getMinutes() + 100).toString().slice(-2);
    return mm;
}
exports.pageNavigatedTo = pageNavigatedTo;
exports.togglePlanPickerListe = togglePlanPickerListe;
exports.togglePlatzPickerListe = togglePlatzPickerListe;
exports.toggleMbPickerListe = toggleMbPickerListe;
exports.toggleStatusPickerListe = toggleStatusPickerListe;
exports.toggleKabinePickerListe = toggleKabinePickerListe;
exports.toggleFlaechePickerListe = toggleFlaechePickerListe;
exports.toggleTextViewText = toggleTextViewText;
exports.toggleTextViewTitle = toggleTextViewTitle;
exports.toggleTextViewMenge = toggleTextViewMenge;
exports.toggleTimePickerVon = toggleTimePickerVon;
exports.toggleTimePickerBis = toggleTimePickerBis;
exports.toggleDatePickerVon = toggleDatePickerVon;
exports.speichern = speichern;
exports.loeschen = loeschen;