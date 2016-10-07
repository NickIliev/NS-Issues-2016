var app = require("application");
var applicationSettingsModule = require("application-settings");
var navigation = require("~/components/navigation");
var analytics = require('nativescript-telerik-analytics');

exports.checkDisclaimer = function () {
    if (!applicationSettingsModule.getBoolean("isAccepted")) {
        navigation.goToDisclaimer();
    };
};

exports.setDisclaimer = function (accepted) {
    applicationSettingsModule.setBoolean("isAccepted", accepted);
    analytics.trackEvent('Disclaimer.Accepted');
};