var analytics = require('nativescript-telerik-analytics');
var Sqlite = require("nativescript-sqlite");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var navigation = require("~/components/navigation");
var View = require("~/common/view-base")
var TutorialViewModel = require("./tutorial-view-model");

var view = new View();
view.viewModel = new TutorialViewModel();

view.loaded = function (args) {
    var that = view;
    var options = {
        pageName: "FindPHR"
    };
    that.initialize(args, options);

    that.mainContentElement = that.page.getViewById("main-content");

    //(new Sqlite("my.db")).then(db => {
    //    db.all('select viewed from tutorial where id > 0', function (err, resultSet) {
    //        console.log("Result set is:", resultSet); // Prints [["Row_1 Field_1" "Row_1 Field_2",...], ["Row 2"...], ...] 
    //        if(resultSet > 0)
    //    }, error => {
    //        console.log("SQLite SELECT ERROR", error);
    //    });
    //    db.execSQL("UPDATE tutorial SET (viewed) VALUES 1").then(id => {
    //        console.log("SQLite UPDATED");
    //    }, error => {
    //        console.log("SQLite UPDATE ERROR", error);
    //    });
    //}, error => {
    //    console.log("OPEN DB ERROR", error);
    //});
};


view.skipTutorial = function () {
    //(new Sqlite("my.db")).then(db => {
    //    db.execSQL("UPDATE tutorial SET (skipped) VALUES (?)", "1").then(id => {
    //        console.log("SQLite inserted");
    //    }, error => {
    //        console.log("INSERT ERROR", error);
    //    });
    //}, error => {
    //    console.log("OPEN DB ERROR", error);
    //});
    topmost.navigate({
        moduleName: 'views/referral-ease/referral-ease'
    });
};

module.exports = view;

