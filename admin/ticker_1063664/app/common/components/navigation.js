var frameModule = require("ui/frame");
var utils = require("utils/utils");
var analytics = require("nativescript-telerik-analytics");

var utility = require("~/common/utility");
var constants = require("~/common/constants");

module.exports = {
    goToDisclaimer: function () {
        frameModule.topmost().navigate({
            moduleName: 'views/disclaimer/disclaimer',
            backstackVisible: false,
            clearHistory: true
        });
    },

    goToProviderSearchPage: function () {
        frameModule.topmost().navigate("views/provider-search/provider-search");
    },
    
    goToLocationSearchPage: function () {
        frameModule.topmost().navigate("views/location-search/location-search");
    },

    goToConditionSearch: function () {
        frameModule.topmost().navigate("views/condition-search/condition-search");
    },

    goToAccessUH: function () {
        frameModule.topmost().navigate({
            moduleName: 'views/welcome/welcome'
        });
    },

    goToExploreHealth: function () {
        frameModule.topmost().navigate({
            moduleName: 'views/welcome/welcome',
            context: {
                explore: true
            }
        });
    },

    goToProviderDetail: function (providerId) {
        frameModule.topmost().navigate({
            moduleName: 'views/provider/provider',
            context: {
                providerId: providerId
            }
        });
    },

    goToSymptomCheckerPage: function () {
        frameModule.topmost().navigate({
            moduleName: 'views/symptom-checker/symptom-checker'
        });
    },
    
    goToFindPHR: function () {
        frameModule.topmost().navigate({
            moduleName: 'views/find-phr/find-phr'
        });
    },

    goToMapPage: function () {
        frameModule.topmost().navigate({
            moduleName: 'views/test/maps/maps'
        });
    },
    
    goToScannerPage: function () {
        frameModule.topmost().navigate({
            moduleName: 'views/test/scanner/scanner'
        });
    },

    goToTermsOfUse: function () {
        utility.launchPopup("confirm", function(data) {
            analytics.trackEvent('LinkClick.TermsOfUse.Menu');
            utils.openUrl("http://www.uhhospitals.org/terms-and-conditions");
        }, function(data) {
            // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
        });
    },

    goToContactUH: function () {
        frameModule.topmost().navigate({
            moduleName: 'views/contact-uh/contact-uh'
        });
    }
};
