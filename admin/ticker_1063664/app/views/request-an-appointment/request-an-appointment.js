var Observable = require("data/observable").Observable;
var gesturesModule = require("ui/gestures");

var View = require("~/common/view-base")
var navigation = require("~/components/navigation");
var tabViewUtil = require("~/components/tabview-util");
var dialogsModule = require("ui/dialogs");
var RequestAppointmentViewModel = require("./request-an-appointment-view-model");

var view = new View();
view.viewModel = new RequestAppointmentViewModel();

view.loaded = function (page) {
    var that = view;
    that.page = page;

    that.mainContentElement = that.page.getViewById("main-content");

    //if (that.viewModel.get("categories") == null) {
    //    view.viewModel.getCategory();
};

view.showAccessUH = function (args) {
    view.viewModel.set("selectedScreen", 0);
};
view.showEHI = function (args) {
    view.viewModel.set("selectedScreen", 1);
};

module.exports = view;