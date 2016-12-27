var appSettings = require("application-settings");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var http = require("http");
var dialogs = require("ui/dialogs");
var timer = require("timer");
var ViewModelItem = (function () {
    function ViewModelItem(Id, Name) {
        this.id = Id;
        this.name = Name;
        this.color = "black";
        if (appSettings.getString("platz") == Id)
            this.color = "red";
    }
    return ViewModelItem;
}());

exports.ViewModelItem = ViewModelItem;
var items = new observableArray.ObservableArray();
exports.mainViewModel = new observable.Observable();
exports.mainViewModel.loadData = function () {
    loadData();
}

exports.mainViewModel.onPullToRefreshInitiated = function (args) {
    timer.setTimeout(function () {
        var listView = args.object;
        loadData();
        listView.notifyPullToRefreshFinished();
    }, 1000);
}


//http.getJSON("http://spmanager.skip5.com/Public/Index?name=Demo&passwort=1298&kal=0").then(function (result) {
//http.getJSON("http://spmanager.skip5.com/Public/Index?name=Keller_AG&passwort=Christoph&kal=0").then(function (result) {

function loadData() {
    while (items.length) {
        items.pop();
    }
    
    http.getJSON(appSettings.getString("url") + "/Public/getPlaetze?name=" + appSettings.getString("username") + "&passwort=" + appSettings.getString("passwort") + "&kalender=" + appSettings.getString("kalender")).then(function (result) {
        //// Argument (r) is JSON!
        //dialogs.alert(JSON.stringify(result));
        for (var i = 0; i < result.length; i++) {
            items.push(new ViewModelItem(result[i].Id, result[i].Text));
        }
        exports.mainViewModel.set("items", items);
    }, function (e) {
        //// Argument (e) is Error!
        //console.log(e);
    });
}