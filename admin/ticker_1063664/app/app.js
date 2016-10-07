var app = require("application");
var analytics = require("nativescript-telerik-analytics");
var constants = require("~/common/constants");
var utility = require("~/common/utility");
var frameModule = require("ui/frame");

// set defaultTransition between pages
frameModule.Frame.defaultTransition = { name: "slide" };

    if (app.ios) {
    var fontModule = require("ui/styling/font");
    if(fontModule.ios) {
        fontModule.ios.registerFont("FontAwesome.otf");
        fontModule.ios.registerFont("KlinicSlabLight.otf");
    }

    // Google Maps API
    GMSServices.provideAPIKey(constants.googleMapsAPIKey);
}

app.on(app.launchEvent, function (context) {
    analytics.init({ appId: constants.analyticsId });
    analytics.start();
});

app.on(app.exitEvent, function (context) {
    analytics.stop();
});

// TODO: implement handling of uncaught errors with analytics 
app.on(app.uncaughtErrorEvent, function (args) {
    if (args.android) {
    // For Android applications, args.android is an NativeScriptError.
    analytics.trackException(args.android, 'Unhandled Exception (Android)');
    console.log("NativeScriptError: " + args.android);
    } else if (args.ios) {
        // For iOS applications, args.ios is NativeScriptError.
        analytics.trackException(args.ios, 'Unhandled Exception (iOS)');
        console.log("NativeScriptError: " + args.ios);
        }
    utility.resetAppSettings();
});


//app.mainModule = "views/location-search/location-search";
//app.mainModule = "views/symptom-checker/symptom-checker";
//app.mainModule = "views/contact-uh/contact-uh";
//app.mainModule = {
//    moduleName: 'views/provider/provider',
//    context: {
//        providerId: 4
//    }
//};
//app.mainModule = "views/welcome/welcome";
//app.mainModule = "views/disclaimer/disclaimer";
//app.mainModule = "views/test/video/video";
//app.mainModule = "views/test/maps/maps";
//app.mainModule = "views/test/scanner/scanner";
//app.mainModule = "views/test/list/list";
//app.mainModule = "views/find-phr/find-phr";
app.mainModule = "views/request-an-appointment/main";
app.start();
