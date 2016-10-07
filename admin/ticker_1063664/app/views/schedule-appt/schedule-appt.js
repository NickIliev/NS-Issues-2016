var Sqlite = require("nativescript-sqlite");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var navigation = require("~/components/navigation");
var View = require("~/common/view-base")
var ScheduleApptViewModel = require("./schedule-appt-view-model");
var tabViewUtil = require("~/components/tabview-util");

var view = new View();
view.viewModel = new ScheduleApptViewModel();

view.loaded = function (args) {
    var that = view;
    var options = {
        pageName: "FindPHR"
    };
    that.initialize(args, options);

    that.mainContentElement = that.page.getViewById("main-content");

    (new Sqlite("my.db")).then(db => {
            //db.execSQL("DROP TABLE IF EXISTS tutorial").then(id => {
            db.execSQL("CREATE TABLE IF NOT EXISTS tutorial (id INTEGER PRIMARY KEY AUTOINCREMENT, viewed INTEGER)").then(id => {
                //page.bindingContext = createViewModel(db);
            console.log("db created");
            db.execSQL("INSERT INTO tutorial (viewed) VALUES (?)", "0").then(id => {
                console.log("SQLite inserted");
            }, error => {
                console.log("SQLite INSERT ERROR", error);
            });
            //db.all('select viewed from tutorial where id > 0', function (err, resultSet) {
            //    console.log("Result set is:", resultSet); // Prints [["Row_1 Field_1" "Row_1 Field_2",...], ["Row 2"...], ...] 
            //}, error => {
            //    console.log("SQLite SELECT ERROR", error);
            //});
        }, error => {
            console.log("SQLite CREATE TABLE ERROR", error);
        });
    }, error => {
        console.log("SQLite OPEN DB ERROR", error);
    });
};


view.launchReferralEase = function (e) {
    (new Sqlite("my.db")).then(db => {
            db.all('select viewed from tutorial where viewed > 0', function (err, resultSet) {
                console.log("Result set is:", resultSet); // Prints [["Row_1 Field_1" "Row_1 Field_2",...], ["Row 2"...], ...] 
            if (resultSet > 0) {
                console.log("go to referral ease");
                topmost.navigate({
                    moduleName: 'views/referral-ease/referral-ease'
                });
            } else {
                db.execSQL("UPDATE tutorial SET viewed = 1").then(id => {
                    console.log("SQLite UPDATED");
                }, error => {
                    console.log("SQLite INSERT ERROR", error);
                });
                console.log("go to tutorial");
                topmost.navigate({
                    moduleName: 'views/tutorial/tutorial'
                });
            }
        }, error => {
            console.log("SQLite SELECT ERROR", error);
        });
    }, error => {
        console.log("SQLite OPEN DB ERROR", error);
    });
}

module.exports = view;