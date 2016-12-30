//var fetchModule = require("fetch");
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
exports.mainViewModel.set("selectedMbIndex", parseInt(appSettings.getString("marbindex")));
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
       
    exports.mainViewModel.set("itemsdate", itemsdate);
    http.getJSON(appSettings.getString("url") + "/Public/Index?name=" + appSettings.getString("username") + "&passwort=" + appSettings.getString("passwort") + "&kalender=" + appSettings.getString("kalender") + "&abplan=" + appSettings.getString("abplan") + "&platz=" + appSettings.getString("platz") + "&marb=" + appSettings.getString("marb")).then(function (result) {
        for (var i = 0; i < result.length; i++) {
            var start = new Date(parseInt(result[i].Start.replace('/Date(', '')));
            var end = new Date(parseInt(result[i].End.replace('/Date(', '')));
            var event = new calendarModule.CalendarEvent(result[i].Title, start, end);
            items.push(event);
        }
        exports.mainViewModel.set("items", items);
        exports.mainViewModel.set("isVisibleKalenderActivity", false);
        exports.mainViewModel.set("isVisibleKalender", true);
        loadDataPlatz();
    }, function (e) {
        exports.mainViewModel.set("isVisibleKalenderActivity", false);
        exports.mainViewModel.set("isVisibleKalender", true);
        dialogs.alert("Keine Internet Verbindung!");
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
        loadDataMb();
    }, function (e) {
        exports.mainViewModel.set("isVisibleKalenderActivity", false);
        exports.mainViewModel.set("isVisibleKalender", true);
        dialogs.alert("Keine Internet Verbindung!");
    });
}

//Mitarbeiter

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
        exports.mainViewModel.set("selectedMb", itemsmb[parseInt(appSettings.getString("marbindex"))]);
        loadDataKabinen();
    }, function (e) {
        exports.mainViewModel.set("isVisibleKalenderActivity", false);
        exports.mainViewModel.set("isVisibleKalender", true);
        dialogs.alert("Keine Internet Verbindung!");
    });
}

//Kabinen
var ViewModelItemKabine = (function () {
    function ViewModelItemKabine(Id, Text) {
        this.id = Id;
        this.text = Text;
    }
    return ViewModelItemKabine;
}());

exports.ViewModelItemKabine = ViewModelItemKabine;

exports.mainViewModel.loadDataKabinen = function () {
    loadDataKabinen();
}

function loadDataKabinen() {
    http.getJSON(appSettings.getString("url") + "/Public/getKabinen?name=" + appSettings.getString("username") + "&passwort=" + appSettings.getString("passwort") + "&kalender=" + appSettings.getString("kalender")).then(function (result) {
        while (itemskabinen.length) {
            itemskabinen.pop();
        }
        while (itemskabinenid.length) {
            itemskabinenid.pop();
        }
        for (var i = 0; i < result.length; i++) {
            itemskabinen.push(result[i].Text);
            itemskabinenid.push(new ViewModelItemKabine(result[i].Id, result[i].Text));
        }
        exports.mainViewModel.set("itemskabinen", itemskabinen);
        exports.mainViewModel.set("itemskabinenid", itemskabinenid);
        loadDataFlaechen();
    }, function (e) {
        exports.mainViewModel.set("isVisibleKalenderActivity", false);
        exports.mainViewModel.set("isVisibleKalender", true);
        dialogs.alert("Keine Internet Verbindung!");
    });
}

//Flächen
var ViewModelItemFlaeche = (function () {
    function ViewModelItemFlaeche(Id, Text) {
        this.id = Id;
        this.text = Text;
    }
    return ViewModelItemFlaeche;
}());

exports.ViewModelItemFlaeche = ViewModelItemFlaeche;

exports.mainViewModel.loadDataFlaechen = function () {
    loadDataFlaechen();
}

function loadDataFlaechen() {
    http.getJSON(appSettings.getString("url") + "/Public/getFlaechen?name=" + appSettings.getString("username") + "&passwort=" + appSettings.getString("passwort")).then(function (result) {
        while (itemsflaechen.length) {
            itemsflaechen.pop();
        }
        while (itemsflaechenid.length) {
            itemsflaechenid.pop();
        }
        for (var i = 0; i < result.length; i++) {
            itemsflaechen.push(result[i].Text);
            itemsflaechenid.push(new ViewModelItemFlaeche(result[i].Id, result[i].Text));
        }
        exports.mainViewModel.set("itemsflaechen", itemsflaechen);
        exports.mainViewModel.set("itemsflaechenid", itemsflaechenid);
    }, function (e) {
        exports.mainViewModel.set("isVisibleKalenderActivity", false);
        exports.mainViewModel.set("isVisibleKalender", true);
        dialogs.alert("Keine Internet Verbindung!");
    });
}

// Liste
var ViewModelItem = (function () {
    function ViewModelItem(date, zeit, Id, RecurrenceID, KalenderId, EventTypeId, Title, Start, End, Description, IsAllDay, Platz, Status, Dauer, Menge, Plantyp, AnlageNamen, BenutzerId, Kabine, Flaeche, KabineName, FlaecheName) {
        this.Id = Id;
        this.RecurrenceID = RecurrenceID;
        this.date = date;
        this.zeit = zeit;
        this.KalenderId = KalenderId;
        this.EventTypeId = EventTypeId;
        this.Title = Title;
        this.Start = Start;
        this.End = End;
        this.Description = Description;
        this.IsAllDay = IsAllDay;
        this.Platz = Platz;
        this.Status = Status;
        this.Dauer = Dauer;
        this.Menge = Menge;
        this.Plantyp = Plantyp;
        this.AnlageNamen = "Platz: " + AnlageNamen;
        this.BenutzerId = BenutzerId;
        this.Kabine = Kabine;
        this.Flaeche = Flaeche;
        this.KabineName = KabineName;
        this.FlaecheName = FlaecheName;
        this.showDescription = false;
        this.checkedStatus = false;
        this.showKabineName = false;
        this.showFlaecheName = false;
        this.showMenge = false;
        
        if (Description != null && Description != "")
            this.showDescription = true;
        switch (Plantyp) {
            case "1":
                if (Status == 0)
                    this.checkedStatus = false;
                else
                    this.checkedStatus = true;
                if (Menge > 1)
                    this.showMenge = true;
                this.showStatus = true;
                break;
            case "2":
                this.showKabineName = true;
                break;
            case "3":
                this.showKabineName = true;
                this.showFlaecheName = true;
                break;
        }
    }
    return ViewModelItem;
}());

exports.ViewModelItem = ViewModelItem;

var itemsdate = new observableArray.ObservableArray();

exports.mainViewModel.loadDataDate = function () {
    loadDataDate();
}

function loadDataDate() {
    
    var datum;
    if (appSettings.getString("date") != "")
        datum = new Date(appSettings.getString("date"));
    else
        datum = new Date();
    
    exports.mainViewModel.set("mainTitle", toDDMMYYYY(datum));
    http.getJSON(appSettings.getString("url") + "/Public/Tag?name=" + appSettings.getString("username") + "&passwort=" + appSettings.getString("passwort") + "&kalender=" + appSettings.getString("kalender") + "&abplan=" + appSettings.getString("abplan") + "&platz=" + appSettings.getString("platz") + "&marb=" + appSettings.getString("marb") + "&date=" + datum.getTime()).then(function (result) {
        while (itemsdate.length) {
            itemsdate.pop();
        }
        for (var i = 0; i < result.length; i++) {
            var start = new Date(parseInt(result[i].Start.replace('/Date(', '')));
            var end = new Date(parseInt(result[i].End.replace('/Date(', '')));
            var datum = toDDMMYYYY(start);
            var startTime = tohhmm(start);
            var endTime = tohhmm(end);
            itemsdate.push(new ViewModelItem(datum, startTime + " - " + endTime, result[i].Id, result[i].RecurrenceID, result[i].KalenderId, result[i].EventTypeId, result[i].Title, start, end, result[i].Description, result[i].IsAllDay, result[i].Platz, result[i].Status, result[i].Dauer, result[i].Menge, result[i].Plantyp, result[i].AnlageNamen, result[i].BenutzerId, result[i].Kabine, result[i].Flaeche, result[i].KabineName, result[i].FlaecheName));
        }
        exports.mainViewModel.set("itemsdate", itemsdate);
        exports.mainViewModel.set("isVisibleDate", true);
        exports.mainViewModel.set("isVisibleDateActivity", false); 
    }, function (e) {
        exports.mainViewModel.set("isVisibleDate", true);
        exports.mainViewModel.set("isVisibleDateActivity", false); 
        dialogs.alert("Keine Internet Verbindung!");
    });
}

exports.mainViewModel.saveStatus = function () {
    http.request({
                     url: appSettings.getString("url") + "/Public/UpdateEvent?name=" + appSettings.getString("username") + "&passwort=" + appSettings.getString("passwort") + "&kalender=" + appSettings.getString("kalender"), // appSettings.getString("url") + "/Public/Tag"
                     method: "POST",
                     headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
                     content: JSON.stringify(exports.mainViewModel.get("selectedItem"))  
                 }).then(function (response) {
                     result = response.content.toJSON();
                     dialogs.alert(JSON.stringify(result[0]));
                 }, function (e) {
   });
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