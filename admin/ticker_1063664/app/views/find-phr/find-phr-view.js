var Observable = require("data/observable").Observable;
var imageSource = require("image-source");
var utils = require("utils/utils");
var analytics = require('nativescript-telerik-analytics');

var utility = require("~/common/utility");
var View = require("~/common/view-base")
var disclaimerUtil = require("~/components/disclaimer-util");
var tabViewUtil = require("~/components/tabview-util");

var FindPHRViewModel = require("./find-phr-view-model");

var view = new View();
view.viewModel = new FindPHRViewModel();

view.loaded = function (args) {
    var that = view;
    var options = {
        pageName: "FindPHR"
    };
    that.initialize(args, options);

    that.mainContentElement = that.page.getViewById("main-content");

    tabViewUtil.selectTab(that.viewModel, that.page, 0);

};

view.showAccessUH = function (args) {
    view.viewModel.set("selectedScreen", 0);
};

view.showEHI = function (args) {
    view.viewModel.set("selectedScreen", 1);

};

view.tilePHRTap = function (args) {
    var that = view;
    utility.launchPopup("confirm", function (data) {
        analytics.trackEvent('LinkClick.UHPHR');
        utils.openUrl("https://uhhospitals.followmyhealth.com/Login/Home/Index?authproviders=0&returnArea=PatientAccess#/Options");
    }, function (data) {
        // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
    });

};

view.tileAthenaPHR = function (args) {
    utility.launchPopup("confirm", function (data) {
        analytics.trackEvent('LinkClick.AthenaPHR');
        utils.openUrl("https://1926-1.portal.athenahealth.com/");
    }, function (data) {
        // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
    });

};


view.tileElyriaPHR = function (args) {
    utility.launchPopup("confirm", function (data) {
        analytics.trackEvent('LinkClick.ElyriaPHR');
        utils.openUrl("https://emh-healthcare.followmyhealth.com/Login/Home/Index?authproviders=0&returnArea=PatientAccess#/Index");
    }, function (data) {
        // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
    });
};

view.tilePortagePHR = function (args) {
    utility.launchPopup("confirm", function (data) {
        analytics.trackEvent('LinkClick.PortagePHR');
        utils.openUrl("https://portal.robinsonmemorial.org/SPP/Anonymous/Login.aspx");
    }, function (data) {
        // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
    });
};

view.tileStJohnPHR = function (args) {
    utility.launchPopup("confirm", function (data) {
        analytics.trackEvent('LinkClick.StJohnPHR');
        utils.openUrl("http://www.uhhospitals.org/myuhcare/my-personal-health-record/uh-st-john-personal-health-record");
    }, function (data) {
        // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
    });
};

view.tileParmaPHR = function (args) {
    utility.launchPopup("confirm", function (data) {
        analytics.trackEvent('LinkClick.ParmaPHR');
        utils.openUrl("https://myuhcareparma.org/Phm-PhmPage.HomePage.WR.mthr?application=phm&hcis=PCG.LIVEF");
    }, function (data) {
        // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
    });
};

module.exports = view;
