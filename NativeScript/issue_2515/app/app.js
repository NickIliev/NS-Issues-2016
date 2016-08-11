"use strict";
var application = require("application");
application.on(application.launchEvent, function (args) {
    if (args.android) {
        // For Android applications, args.android is an android.content.Intent class.
        console.log("Launched Android application with the following intent: " + args.android + ".");
        receiveData();
    }
    else if (args.ios !== undefined) {
        // For iOS applications, args.ios is NSDictionary (launchOptions).
        console.log("Launched iOS application with options: " + args.ios);
        receiveData();
    }
});
application.start({ moduleName: "main-page" });
function receiveData() {
    fetch("https://httpbin.org/get").then(function (r) {
        // Argument (r) is Response!
        console.log("Received");
    }, function (e) {
        // Argument (e) is Error!
        console.log("Error!");
    });
}
//# sourceMappingURL=app.js.map