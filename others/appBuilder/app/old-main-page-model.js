var appSettings = require("application-settings");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var http = require("http");
var dialogs = require("ui/dialogs");
var ViewModelItem = (function () {
    function ViewModelItem(date, zeit, title, info, anlage) {
        this.date = date;
        this.zeit = zeit;
        this.title = title;
        this.info = info;
        this.anlage = anlage;
    }
    return ViewModelItem;
}());

exports.ViewModelItem = ViewModelItem;
var items = new observableArray.ObservableArray();

exports.mainViewModel = new observable.Observable();
exports.mainViewModel.loadData = function () {

    loadData();
}
exports.mainViewModel.set("items", items);

function loadData() {
    while (items.length) {
        items.pop();
    }
	 
    var datum = new Date(appSettings.getString("date"));
    exports.mainViewModel.set("mainTitle", toDDMMYYYY(datum));
    //dialogs.alert(datum.getTime());
     http.getJSON(appSettings.getString("url") + "/Public/Index?name=" + appSettings.getString("username") + "&passwort=" + appSettings.getString("passwort") + "&kal=" + appSettings.getString("kalender") + "&abplan=" + appSettings.getString("abplan")  + "&platz=" +  appSettings.getString("platz") + "&marb=" +  appSettings.getString("marb")+ "&date=" + datum.getTime()).then(function (result) {
        //// Argument (r) is JSON!
        for (var i = 0; i < result.length; i++) {
            var start = new Date(parseInt(result[i].Start.replace('/Date(', '')));
            //var zeitpsanne = new Date(parseInt(result[i].Start.replace('/Date(', '')) + 5 * 86400000); // 86400000
            var end = new Date(parseInt(result[i].End.replace('/Date(', '')));
            var datum = toDDMMYYYY(start);
            var startTime = tohhmm(start);
            var endTime = tohhmm(end);;
            //if (start >= new Date() && start < new Date(new Date().getTime() + 5 * 86400000)) {
                items.push(new ViewModelItem(datum, startTime + " - " + endTime, result[i].Title, result[i].Description, result[i].AnlageNamen));
            //}
        }
		//dialogs.alert("test");
    }, function (e) {
        //// Argument (e) is Error!
        //console.log(e);
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