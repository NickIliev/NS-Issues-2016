"use strict";
var application = require("application");
// check the current platform (we are interested in android only)
// alternatively, you may have app.android.js and app.ios.js
var platform = require("platform");
if (platform.device.os === platform.platformNames.android) {
    application.onLaunch = function (intent) {
        // hook the onActivityCreated callback upon application launching
        application.android.onActivityCreated = function (activity) {
            // apply the default theme once the Activity is created
            // Changing the SplashTheme for AppTheme
            var id = activity.getResources().getIdentifier("AppTheme", "style", activity.getPackageName());
            activity.setTheme(id);
        };
    };
}
application.start({ moduleName: "main-page" });
//# sourceMappingURL=app.js.map