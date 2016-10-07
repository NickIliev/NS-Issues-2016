var Observable = require("data/observable").Observable;
var gesturesModule = require("ui/gestures");

var View = require("~/common/view-base")
var navigation = require("~/components/navigation");
var tabViewUtil = require("~/components/tabview-util");
var dialogsModule = require("ui/dialogs");
var ContactUHViewModel = require("./contact-uh-view-model");

var view = new View();
view.viewModel = new ContactUHViewModel();

view.loaded = function (page) {
    var that = view;
    that.page = page;

    that.mainContentElement = that.page.getViewById("main-content");

    if(that.viewModel.get("categories") == null) {
        view.viewModel.getCategory();
    }

};


view.SubmitForm = function () {
    var that = view
    var primaryphoneView = that.page.getViewById("primaryphone");

    //console.log("submit button clicked");

    if (that.viewModel.email != "" && that.viewModel.firstname != "" && that.viewModel.lastname != "") {

        if (that.viewModel.isValidEmail()) {  // email Validation

            var nameExp = /^[a-zA-Z ]*$/;

            if (that.viewModel.firstname.match(nameExp) && that.viewModel.lastname.match(nameExp)) {   // Name Validation


                var primaryphone = "";
                primaryphone = primaryphoneView.text.replace(/-/g, "");

                if (primaryphone != "" && primaryphone.length == 10) {

                    if (that.viewModel.comments != "") {
                        that.viewModel.set("primaryphone", primaryphone);
                        console.log(primaryphone + " is valid phone!");
                        that.viewModel.submitForm();
                    }
                    else {
                        that.viewModel.showError("Comments can not be blank.");
                    }
                }
                else {
                    that.viewModel.showError("Enter a valid phone number.");
                }
            }
            else {
                that.viewModel.showError("Enter a valid name.");
            }
        }
        else {
            if (that.viewModel.email == "") {
                that.viewModel.showError("Email address can not be blank");
            }
            else {
                that.viewModel.showError("Enter correct email address");
            }

        }
    }
    else {
        that.viewModel.showError("All fields are required.");
    }
}

view.showAccessUH = function (args) {
    view.viewModel.set("selectedScreen", 0);
};
view.showEHI = function (args) {
    view.viewModel.set("selectedScreen", 1);
};

module.exports = view;