var Observable = require("data/observable").Observable;
var utils = require("utils/utils");
var analytics = require('nativescript-telerik-analytics');

var utility = require("~/common/utility");
var View = require("~/common/view-base")
var navigation = require("~/components/navigation");
var disclaimerUtil = require("~/components/disclaimer-util");

var DisclaimerViewModel = require("./disclaimer-view-model");

var view = new View();
view.viewModel = new DisclaimerViewModel();

view.loaded = function(args) {
    var that = view;
    var options = {
        pageName: "Disclaimer"
    };
    that.initialize(args, options);

	that.mainContentElement = that.page.getViewById("main-content");
	
};

view.onTapTermsLink = function (args) {
	var that = view;
	utility.launchPopup("confirm", function(data) {
		analytics.trackEvent('LinkClick.TermsOfUse.Disclaimer');
		utils.openUrl("http://www.uhhospitals.org/terms-and-conditions");
	}, function(data) {
		// analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
	});
};

view.onTapUnderstandItem = function (args) {
	var that = view;
	if (!that.viewModel.get("understand")) {
		that.page.getViewById("understandCheck").src = "~/images/common/checked.png";
		that.viewModel.set("understand", true);
		that.continueIfAccepted();
	}
	else {
		that.page.getViewById("understandCheck").src = "~/images/common/unchecked.png";
		that.viewModel.set("understand", false);
	}
};

view.onTapAcceptItem = function (args) {
	var that = view;
	if (!that.viewModel.get("accept")) {
		that.page.getViewById("acceptCheck").src = "~/images/common/checked.png";
		that.viewModel.set("accept", true);
		that.continueIfAccepted();
	}
	else {
		that.page.getViewById("acceptCheck").src = "~/images/common/unchecked.png";
		that.viewModel.set("accept", false);
	}
};

view.continueIfAccepted = function (args) {
    var that = view;

    if (that.viewModel.isAccepted()) {
        disclaimerUtil.setDisclaimer(true);
        navigation.goToAccessUH();
    }
};

module.exports = view;
