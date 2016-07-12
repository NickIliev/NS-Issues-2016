var app = require("application");
var platform = require("platform");
var frameModule = require("ui/frame");
var actionBar = require("ui/action-bar").ActionBar;
var utils = require("utils/utils");
var analytics = require("nativescript-telerik-analytics");
var navigation = require("~/components/navigation");

// TODO: Correct iPhone ActionBar color
function styleActionBar() {
	var topmost = frameModule.topmost();
	if (topmost.ios) {
		var navigationBar = topmost.ios.controller.navigationBar;
		navigationBar.barTintColor = UIColor.colorWithRedGreenBlueAlpha(0.741, 0.220, 0.224, 1);
		navigationBar.titleTextAttributes = new NSDictionary([UIColor.whiteColor()], [NSForegroundColorAttributeName]);
		navigationBar.barStyle = 1;
		navigationBar.tintColor = UIColor.whiteColor();
	}
};

function hideiOSBackButton() {
	var topmost = frameModule.topmost();
	if (topmost.ios) {
		// Hide the Back arrow
		var controller = topmost.ios.controller;
		controller.visibleViewController.navigationItem.setHidesBackButtonAnimated(true, false);
	}
};

exports.initialize = function (page, options) {
    var btnCallUH = page.getViewById("contactUH");
    if (btnCallUH) {
        btnCallUH.off("tap");
        btnCallUH.on("tap", function (args) {
            analytics.trackEvent('LinkClick.CallUH');
            utils.openUrl("tel://18668442273");
        });
    }

	var tappableLogo = page.getViewById("tappableLogo");
    if (tappableLogo) {
        tappableLogo.off("tap");
        tappableLogo.on("tap", function (args) {
            navigation.goToAccessUH();
        });
    }

	if(options != null && !options.showBackButton) {
    	hideiOSBackButton();
	}
    styleActionBar();
};