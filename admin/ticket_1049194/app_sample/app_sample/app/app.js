var app = require("application");
var analytics = require("nativescript-telerik-analytics");
var constants = require("~/common/constants");

if (app.ios) {
    var fontModule = require("ui/styling/font");
    if(fontModule.ios) {
        fontModule.ios.registerFont("FontAwesome.otf");
        fontModule.ios.registerFont("KlinicSlabLight.otf");
    }
    
    // Google Maps API
    //GMSServices.provideAPIKey("AIzaSyAtRVvG3Be3xXiZFR7xp-K-9hy4nZ4hMFs");
}

app.on(app.launchEvent, function (context) {
    analytics.init({ appId: constants.appId });
    analytics.start();
});

app.on(app.exitEvent, function (context) {
    analytics.stop();
});

app.mainModule = "views/provider-search/provider-search";

app.start();