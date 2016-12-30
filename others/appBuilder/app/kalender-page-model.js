var appSettings = require("application-settings");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var http = require("http");
var dialogs = require("ui/dialogs");
var timer = require("timer");

var ViewModelItem = (function () {
    function ViewModelItem(Id, Name1, Name2, Email, Telefon) {
        this.id = Id;
        if(Name2 != null)
            this.name = Name1 + " " + Name2;
        else
            this.name = Name1;
        this.email = Email;
        this.telefon = Telefon;
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
        //dialogs.alert("pageload");
        http.getJSON(appSettings.getString("url") + "/Public/getKalender?name=" + appSettings.getString("username") + "&passwort=" + appSettings.getString("passwort") + "&kal=" + appSettings.getString("kalender") + "&abplan=2").then(function (result) {
            //// Argument (r) is JSON!
            //dialogs.alert(JSON.stringify(result));
            if(result.length > 1) {
    			items.push(new ViewModelItem("0", "Alle", "", "", ""));
            }
            
            for (var i = 0; i < result.length; i++) {
                items.push(new ViewModelItem(result[i].Id, result[i].Name1, result[i].Name2, result[i].Email, result[i].Telefon));
            }
            exports.mainViewModel.set("items", items);
            exports.mainViewModel.set("isVisibleGemeindenActivity", false);
            exports.mainViewModel.set("isVisibleGemeinden", true); 
            
        }, function (e) {
            exports.mainViewModel.set("isVisibleGemeindenActivity", false);
            exports.mainViewModel.set("isVisibleGemeinden", true);
            dialogs.alert("Keine Internet Verbindung!");
        });
    
}