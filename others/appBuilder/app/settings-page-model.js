var appSettings = require("application-settings");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var http = require("http");
var dialogs = require("ui/dialogs");
var frames = require("ui/frame");



var items = new observableArray.ObservableArray();
exports.mainViewModel = new observable.Observable();
exports.mainViewModel.loadData = function () {
    loadData();
}


function loadData() {
    
        while (items.length) {
            items.pop();
        }
        //dialogs.alert("pageload");
        http.getJSON(appSettings.getString("url") + "/Public/checkUser?name=" + appSettings.getString("username") + "&passwort=" + appSettings.getString("passwort")).then(function (result) {
            //// Argument (r) is JSON!
            //dialogs.alert(JSON.stringify(result));
            
            if( result[0] == "ok") {    
                  var navigationEntry = {
                        moduleName: "kalender-page",
                        clearHistory: true
                    };
                    var topmost = frames.topmost();
                    topmost.navigate(navigationEntry); 
                }
                else {
                    dialogs.alert("Username oder Passwort falsch");
                }
        }, function (e) {
            dialogs.alert("Keine Internet Verbindung!");
            
        });
}