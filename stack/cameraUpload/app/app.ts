import application = require("application");

// application.on(application.uncaughtErrorEvent, function (args) {
//     if (args.android) {
//         // For Android applications, args.android is an NativeScriptError.
//         console.log(" *** NativeScriptError *** : " + args.android);
//         console.log(" *** StackTrace *** : " + args.android.stackTrace);
//         console.log(" *** nativeException *** : " + args.android.nativeException);
//     }
//     else if (args.ios) {
//         // For iOS applications, args.ios is NativeScriptError.
//         console.log("NativeScriptError: " + args.ios);
//     }
// });
application.start({ moduleName: "main-page" });