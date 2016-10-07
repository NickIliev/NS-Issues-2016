var Observable = require("data/observable").Observable;
var dialogs = require("ui/dialogs");
var constants = require("~/common/constants");
var utility = require("~/common/utility");
var navigation = require("~/components/navigation");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var timer = require("timer");
var View = require("~/common/view-base")

var ScannerViewModel = require("./scanner-view-model");

var page;
var refInput
var view = new View();
view.viewModel = new ScannerViewModel();

view.loaded = function (args) {
    page = args.object;

    var that = view;
    var options = {
        pageName: "ScannerTest"
    };
    that.initialize(args, options);

    that.mainContentElement = that.page.getViewById("main-content");
    
    that.viewModel.load();
    
    that.viewModel.set("isVisible",false);
};

view.scan = function (args) {
    var that = view;

    that.viewModel.scan();
};
view.verify = function (args) {
    var that = view;

    view.viewModel.set("isLoading", true);
    refInput = page.getViewById("referralInput");
    //console.log("refInput",refInput.text);
    var requestOptions = {
        url: constants.referralEaseUrl + "Authenticate/ValidateRequisition?RequisitionId=" + refInput.text,
        method: "POST",
        headers: { "Content-Type": "application/json" }
    };
    console.log("url",requestOptions.url);
    return utility.httpRequest(that, requestOptions,
        function (response) { // success callback
            console.log("response", JSON.stringify(response));
            var refResponse = response.content.toJSON().Data;
            console.log(refResponse);
            view.viewModel.set("isLoading", false);
            if (refResponse == true) {
                navigation.goToVerifyUser("Found: Referral code " + refInput.text,refInput.text);
                view.viewModel.set("isVisible",true);
            } else {
                var context = {
                    title: "Referral code not found",
                    message: "We were unable to find referral code " + refInput.text + ". Please try again.",
                    okButtonText: "Try Again",
                    cancelButtonText: "Contact UH"
                }
                utility.launchPopup("acknowledge", function (data) {
                    // callback
                }, null, context);
            }
        },
        function () { // error callback
        }
    );
    //timer.setTimeout(() => {
    //    console.log("timer started");
    //    view.viewModel.set("isLoading", false);
    //    var context = {
    //        title: "Trouble contacting referral system",
    //        message: "We are having trouble contacting referral system. Please try again in a few minutes or contact UH at 866-UH4-CARE.",
    //        okButtonText: "Try Again",
    //        cancelButtonText: "Contact UH"
    //    }
    //    utility.launchPopup("acknowledge", function (data) {
    //        // callback
    //    }, null, context);
    //}, 3000);
};
view.viewTutorial = function (args) {
    var that = view;
    console.log("relaunch tutorial");
    topmost.navigate({
        moduleName: 'views/tutorial/tutorial'
    });
}

module.exports = view;