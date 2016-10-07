var frameModule = require("ui/frame");
var utils = require("utils/utils");
var analytics = require("nativescript-telerik-analytics");
var applicationSettingsModule = require("application-settings");

var utility = require("~/common/utility");
var constants = require("~/common/constants");

// used to prevent from making multiple navigation attempts
function isNavigating() {
    var isNavigating = applicationSettingsModule.getBoolean("isNavigating");
    //console.log("Navigation Attempt: Currently " + (isNavigating ? "" : "NOT ") + "navigating.");
    if(!applicationSettingsModule.getBoolean("isNavigating")) {
        applicationSettingsModule.setBoolean("isNavigating", true);
        
        // TODO: remove this workaround for issue with radSideDrawer that requires explicitly closing before navigating.
        var drawerElement = frameModule.topmost().currentPage.getViewById("drawer");
        console.log(drawerElement);
        if (drawerElement) {
            drawerElement.closeDrawer();
        }
        return false;
    }
    return true;
} 

module.exports = {
    goToDisclaimer: function () {
        if(!isNavigating()) {
            frameModule.topmost().navigate({
                moduleName: 'views/disclaimer/disclaimer',
                backstackVisible: false,
                clearHistory: true,
                animated:false
            });
        }
    },

    goToProviderSearchPage: function () {
        if(!isNavigating()) {
            frameModule.topmost().navigate("views/provider-search/main");
        }
    },
    
    goToLocationSearchPage: function () {
        if(!isNavigating()) {
            applicationSettingsModule.setBoolean("forceLocation", true);
            frameModule.topmost().navigate({
                moduleName: "views/location-search/main",
                context: {
                    erAndUrgentCareOnly: false
                }
            });
        }
    },

    goToFindEROrUrgentCare: function () {
        applicationSettingsModule.setBoolean("isLocationSearchInitialized", false);
        applicationSettingsModule.setBoolean("forceLocation", true);
        if(!isNavigating()) {
            frameModule.topmost().navigate({
                moduleName: "views/location-search/main",
                context: {
                    erAndUrgentCareOnly: true
                }
            });
        }
    },

    goToConditionSearch: function () {
        if(!isNavigating()) {
            frameModule.topmost().navigate("views/condition-search/main");
        }
    },

    goToAccessUH: function () {
        if(!isNavigating()) {
            frameModule.topmost().navigate({
                moduleName: 'views/welcome/main'
            });
        }
    },

    goToExploreHealth: function () {
        if(!isNavigating()) {
            frameModule.topmost().navigate({
                moduleName: 'views/welcome/main',
                context: {
                    explore: true
                }
            });
        }
    },

    goToProviderDetail: function (providerId) {
        if(!isNavigating()) {
            frameModule.topmost().navigate({
                moduleName: 'views/provider/main',
                context: {
                    providerId: providerId
                }
            });
        }
    },

    goToSymptomCheckerPage: function () {
        if(!isNavigating()) {
            frameModule.topmost().navigate({
                moduleName: 'views/symptom-checker/main'
            });
        }
    },
    
    goToFindPHR: function () {
        if(!isNavigating()) {
            frameModule.topmost().navigate({
                moduleName: 'views/find-phr/main'
            });
        }
    },

    goToMapPage: function () {
        if(!isNavigating()) {
            frameModule.topmost().navigate({
                moduleName: 'views/test/maps/maps'
            });
        }
    },
    
    goToReferralEase: function () {
            frameModule.topmost().navigate({
                //moduleName: 'views/referral-ease/referral-ease'
                moduleName: 'views/tutorial/tutorial'
            });
    },

    goToScheduling: function () {
        if (!isNavigating()) {
            frameModule.topmost().navigate({
                moduleName: 'views/schedule-appt/schedule-appt'
                //moduleName: 'views/tutorial/tutorial'
            });
        }
    },

    goToVerifyUser: function (verifyText,refCode) {
        if (!isNavigating()) {
            frameModule.topmost().navigate({
                moduleName: 'views/verify/verify-user',
                context: {
                    verifyText: verifyText,
                    refCode: refCode
                }
            });
        }
    },

    goToReferralOrders: function () {
        if (!isNavigating()) {
            frameModule.topmost().navigate({
                moduleName: 'views/orders/orders'
            });
        }
    },

    goToTermsOfUse: function (args) {
        var page = args.object.page;
        utility.launchPopup("confirm", function(data) {
            analytics.trackEvent('LinkClick.TermsOfUse.Menu');
            utils.openUrl("http://www.uhhospitals.org/terms-and-conditions");
        }, function(data) {
            // analytics.trackEvent('LinkClick.TermsOfUse'); // TODO: track cancellations?
        });
    },

    goToContactUH: function () {
        if(!isNavigating()) {
            frameModule.topmost().navigate({
                moduleName: 'views/contact-uh/main'
            });
        }
    }
};
