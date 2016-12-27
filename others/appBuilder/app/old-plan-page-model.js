var appSettings = require("application-settings");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var calendarModule = require("nativescript-telerik-ui-pro/calendar");
var http = require("http");
var dialogs = require("ui/dialogs");

var ViewModelItem = (function () {
    function ViewModelItem(Id, Name) {
        this.id = Id;
        this.name = Name;
        this.color = "black";
        if (appSettings.getString("abplan") == Id)
            this.color = "red";
    }
    return ViewModelItem;
}());
exports.ViewModelItem = ViewModelItem;
exports.mainViewModel = new observable.Observable();
exports.mainViewModel.loadData = function () {
    loadData();
}

var item = new observableArray.ObservableArray();


function loadData() {
    while (item.length) {
        item.pop();
    }

    item.push(new ViewModelItem("0", "Alle"));
    item.push(new ViewModelItem("1", "Arbeitsplan"));
    item.push(new ViewModelItem("2", "Spielplan"));
    item.push(new ViewModelItem("3", "Trainingsplan"));
    item.push(new ViewModelItem("4", "Wetter"));
    item.push(new ViewModelItem("5", "Personalplan"));
    item.push(new ViewModelItem("6", "Protokolle"));

    exports.mainViewModel.set("items", item);
}