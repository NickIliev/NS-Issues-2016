var application = require("application");

var platform = require("platform");
if(platform.device.os === platform.platformNames.android) {
    application.onLaunch = function(intent) {
        // hook the onActivityCreated callback upon application launching
        application.android.onActivityCreated = function(activity) {
            // apply the default theme once the Activity is created
            var id = activity.getResources().getIdentifier("AppTheme", "style", activity.getPackageName());
            activity.setTheme(id);
        }
    }
}

application.start({ moduleName: "main-page" });
