var appSettings = require("application-settings");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var calendarModule = require("nativescript-telerik-ui-pro/calendar");
var http = require("http");
var dialogs = require("ui/dialogs");

var itemsstatus = ["offen", "erledigt", "orange", "gelb", "blau", "weiss", "grau"];
var itemsplan = ["Allgemein", "Arbeitsplan", "Spielplan", "Trainingsplan", "Wetter", "Personalplan", "Protokolle"];
var itemsplatz = [];
var itemsplatzid = [];
var itemsmb = [];
var itemsmbid = [];
var selectedItem = {};
var itemskabinen = [];
var itemskabinenid = [];
var itemsflaechen = [];
var itemsflaechenid = [];
var vonh = 0;
var vonm = 0;


exports.mainViewModel = new observable.Observable();
exports.mainViewModel.set("itemsplan", itemsplan);

exports.mainViewModel = new observable.Observable();
exports.mainViewModel.set("itemsplan", itemsplan);
exports.mainViewModel.set("itemsstatus", itemsstatus);
exports.mainViewModel.set("vonh", vonh);
exports.mainViewModel.set("vonm", vonm);

//Platz
var ViewModelItemPlatz = (function () {
    function ViewModelItemPlatz(Id, Name) {
        this.id = Id;
        this.name = Name;
    }
    return ViewModelItemPlatz;
}());

//MItarbeiter

var ViewModelItemMb = (function () {
    function ViewModelItemMb(Id, Name) {
        this.id = Id;
        this.name = Name;
    }
    return ViewModelItemMb;
}());

//Kabinen
var ViewModelItemKabine = (function () {
    function ViewModelItemKabine(Id, Text) {
        this.id = Id;
        this.text = Text;
    }
    return ViewModelItemKabine;
}());

//Flächen
var ViewModelItemFlaeche = (function () {
    function ViewModelItemFlaeche(Id, Text) {
        this.id = Id;
        this.text = Text;
    }
    return ViewModelItemFlaeche;
}());
exports.mainViewModel.saveData = function () {
    //dialogs.alert(JSON.stringify(itemsstatus));
    //dialogs.alert(JSON.stringify(exports.mainViewModel.get("selectedItem")));
    
    http.request({
        url: appSettings.getString("url") + "/Public/UpdateEvent?name=" + appSettings.getString("username") + "&passwort=" + appSettings.getString("passwort") + "&kalender=" + appSettings.getString("kalender"), // appSettings.getString("url") + "/Public/Tag"
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        content: JSON.stringify(exports.mainViewModel.get("selectedItem"))  
    }).then(function (response) {
        result = response.content.toJSON();
        // console.log(result);
        dialogs.alert(JSON.stringify(result[0]));
    }, function (e) {
        dialogs.alert("Keine Internet Verbindung!");
        // console.log("Error occurred " + e);xvdfg
    });
   
}
exports.mainViewModel.deleteData = function () {
    //dialogs.alert(JSON.stringify(itemsstatus));
    //dialogs.alert(JSON.stringify(exports.mainViewModel.get("selectedItem")));
    
    http.request({
        url: appSettings.getString("url") + "/Public/deleteEvent?name=" + appSettings.getString("username") + "&passwort=" + appSettings.getString("passwort") + "&kalender=" + appSettings.getString("kalender"), // appSettings.getString("url") + "/Public/Tag"
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        content: JSON.stringify(exports.mainViewModel.get("selectedItem"))  
    }).then(function (response) {
        result = response.content.toJSON();
        // console.log(result);
        dialogs.alert(JSON.stringify(result[0]));
    }, function (e) {
         dialogs.alert("Keine Internet Verbindung!");
        // console.log("Error occurred " + e);xvdfg
    });
}
exports.ViewModelItemPlatz = ViewModelItemPlatz;
exports.ViewModelItemMb = ViewModelItemMb;
exports.ViewModelItemKabine = ViewModelItemKabine;
exports.ViewModelItemFlaeche = ViewModelItemFlaeche;
exports.ViewModelItemMb = ViewModelItemMb;