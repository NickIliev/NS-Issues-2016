var frames = require("ui/frame");
var application = require("application");

onNavigatedTo = function (args) {
    page = args.object;
    page.getViewById("test").items = ["1 ListPickerItem", "2 ListPickerItem", "3 ListPickerItem"];
}
exports.onNavigatedTo = onNavigatedTo;

// Code to run when the page loads
exports.pageLoaded = function (args) {

    if (application.ios) {
        frames.topmost().ios.navBarVisibility = "never";
    }

};