var appSettings = require("application-settings");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var calendarModule = require("nativescript-telerik-ui-pro/calendar");
var http = require("http");
var dialogs = require("ui/dialogs");

exports.mainViewModel = new observable.Observable();
var items = new observableArray.ObservableArray();
//Vorgabe
var ViewModelItem = (function () {
    function ViewModelItemVorgabe(Id,Titel, Status, IsAllDay, Dauer, Menge, Plantyp) {
        this.Id = 0;
        this.EventTypeId = Id;
        this.RecurrenceID = 0;
        this.Title = Titel;
        this.Status = Status;
        this.IsAllDay = IsAllDay;
        this.Dauer = Dauer;
        this.Menge = Menge;
        this.Plantyp = Plantyp;
        this.Platz = appSettings.getString("platz");
        this.BenutzerId = appSettings.getString("marb");
        this.Kabine = 0;
        this.Flaeche = 0;
        this.KalenderId = appSettings.getString("kalender");
        this.Start =  new Date(appSettings.getString("date"));
        this.End =  new Date(appSettings.getString("date"));
        this.End.setMinutes(this.End.getMinutes() + Dauer);
    }
    return ViewModelItemVorgabe;
}());

exports.ViewModelItem = ViewModelItem;

exports.mainViewModel.loadData = function () {
    loadData();
}

function loadData() {
    
    http.getJSON(appSettings.getString("url") + "/Public/getVorgaben?name=" + appSettings.getString("username") + "&passwort=" + appSettings.getString("passwort") + "&kalender=" + appSettings.getString("kalender") + "&plantyp=" + appSettings.getString("abplan")).then(function (result) {
        //// Argument (r) is JSON!      
        while (items.length) {
            items.pop();
        }
        for (var i = 0; i < result.length; i++) {
            items.push(new ViewModelItem(result[i].Id, result[i].Titel,  result[i].Status,  result[i].IsAllDay,  result[i].Dauer,  result[i].Menge, result[i].Plantyp));
        }
        exports.mainViewModel.set("items", items);
    }, function (e) {
        //// Argument (e) is Error!
        //console.log(e);
        dialogs.alert("Keine Internet Verbindung!");
    });
 
}