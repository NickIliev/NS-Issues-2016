var appSettings = require("application-settings");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var calendarModule = require("nativescript-telerik-ui-pro/calendar");
var http = require("http");
var dialogs = require("ui/dialogs");
var timer = require("timer");

var itemsplan = ["Alle", "Arbeitsplan", "Spielplan", "Trainingsplan",  "Personalplan", "Wetter", "Protokolle"];
var itemsplatz = [];
var itemsplatzid = [];
var itemsmb = [];
var itemsmbid = [];
var itemskabinen = [];
var itemskabinenid = [];
var itemsflaechen = [];
var itemsflaechenid = [];
var selectedItem = {};

exports.mainViewModel = new observable.Observable();
exports.mainViewModel.set("itemsplan", itemsplan);
exports.mainViewModel.set("selectedPlan", itemsplan[parseInt(appSettings.getString("abplan"))]);
exports.mainViewModel.set("showPlanPicker", false);
exports.mainViewModel.set("showPlatzPicker", false);
exports.mainViewModel.set("showVorgabePicker", false);
exports.mainViewModel.set("selectedIndex", parseInt(appSettings.getString("abplan")));
exports.mainViewModel.set("selectedPlatzIndex", parseInt(appSettings.getString("platzindex")));
exports.mainViewModel.set("selectedMbIndex", parseInt(appSettings.getString("platzindex")));
exports.mainViewModel.set("selectedItem", selectedItem);


var item = new observableArray.ObservableArray();
exports.mainViewModel.set("item", item);

var items = [];
exports.mainViewModel.loadData = function () {
     while (items.length) {
            items.pop();
        }
    
    timer.setTimeout(function () {
        
        loadData();
 
    }, 3000);
}

function loadData() {
    //dialogs.alert(appSettings.getString("url") + "/Public/Index?name=" + appSettings.getString("username") + "&passwort=" + appSettings.getString("passwort") + "&kalender=" + appSettings.getString("kalender") + "&abplan=" + appSettings.getString("abplan") + "&platz=" + appSettings.getString("platz") + "&marb=" + appSettings.getString("marb"));
    http.getJSON(appSettings.getString("url") + "/Public/Index?name=" + appSettings.getString("username") + "&passwort=" + appSettings.getString("passwort") + "&kalender=" + appSettings.getString("kalender") + "&abplan=" + appSettings.getString("abplan") + "&platz=" + appSettings.getString("platz") + "&marb=" + appSettings.getString("marb")).then(function (result) {
        //// Argument (r) is JSON!
        //dialogs.alert(JSON.stringify(result));
       
        for (var i = 0; i < result.length; i++) {
            var start = new Date(parseInt(result[i].Start.replace('/Date(', '')));
            //var zeitpsanne = new Date(parseInt(result[i].Start.replace('/Date(', '')) + 5 * 86400000); // 86400000
            var end = new Date(parseInt(result[i].End.replace('/Date(', '')));
            //var datum = start.getDate() + "." + (start.getMonth() + 1) + "." + start.getFullYear();
            //var startTime = start.getHours() + ":" + start.getMinutes();
            //var endTime = end.getHours() + ":" + end.getMinutes();
            //if (start >= new Date() && start < new Date(new Date().getTime() + 5 * 86400000)) {
            //items.push(new ViewModelItem(start, end, result[i].Title));
            //}
            var event = new calendarModule.CalendarEvent(result[i].AnlageNamen + ": " + result[i].Title, start, end);
            items.push(event);
        }
        
        exports.mainViewModel.set("items", items);
    }, function (e) {
        dialogs.alert(e);
        //// Argument (e) is Error!
        //console.log(e);
    });
}
//Platz
var ViewModelItemPlatz = (function () {
    function ViewModelItemPlatz(Id, Name) {
        this.id = Id;
        this.name = Name;
    }
    return ViewModelItemPlatz;
}());

exports.ViewModelItemPlatz = ViewModelItemPlatz;

exports.mainViewModel.loadDataPlatz = function () {
    loadDataPlatz();
}


function loadDataPlatz() {
    http.getJSON(appSettings.getString("url") + "/Public/getPlaetze?name=" + appSettings.getString("username") + "&passwort=" + appSettings.getString("passwort") + "&kalender=" + appSettings.getString("kalender")).then(function (result) {
        //// Argument (r) is JSON!
        //dialogs.alert(JSON.stringify(result));
        while (itemsplatz.length) {
            itemsplatz.pop();
        }
        while (itemsplatzid.length) {
            itemsplatzid.pop();
        }
        for (var i = 0; i < result.length; i++) {
            itemsplatz.push(result[i].Text);
            itemsplatzid.push(new ViewModelItemPlatz(result[i].Id, result[i].Text));
        }
        exports.mainViewModel.set("itemsplatz", itemsplatz);
        exports.mainViewModel.set("itemsplatzid", itemsplatzid);
        exports.mainViewModel.set("selectedPlatz", itemsplatz[parseInt(appSettings.getString("platzindex"))]);

    }, function (e) {
        //// Argument (e) is Error!
        //console.log(e);
        dialogs.alert("error");
    });
}
//MItarbeiter

var ViewModelItemMb = (function () {
    function ViewModelItemMb(Id, Name) {
        this.id = Id;
        this.name = Name;
        this.color = "black";
        if (appSettings.getString("marb") == Id)
            this.color = "red";
    }
    return ViewModelItemMb;
}());

exports.ViewModelItemMb = ViewModelItemMb;
exports.mainViewModel.loadDataMb = function () {
    loadDataMb();
}

function loadDataMb() {

    http.getJSON(appSettings.getString("url") + "/Public/getMitarbeiter?name=" + appSettings.getString("username") + "&passwort=" + appSettings.getString("passwort")).then(function (result) {
        //// Argument (r) is JSON!
        //dialogs.alert(JSON.stringify(result));
        while (itemsmb.length) {
            itemsmb.pop();
        }
        while (itemsmbid.length) {
            itemsmbid.pop();
        }
        for (var i = 0; i < result.length; i++) {
            itemsmb.push(result[i].Name);
            itemsmbid.push(new ViewModelItemMb(result[i].Id, result[i].Name));
        }
        exports.mainViewModel.set("itemsmb", itemsmb);
        exports.mainViewModel.set("itemsmbid", itemsmbid);
        exports.mainViewModel.set("selectedMb", itemsplatz[parseInt(appSettings.getString("marbindex"))]);
    }, function (e) {
        //// Argument (e) is Error!
        //console.log(e);
    });
}