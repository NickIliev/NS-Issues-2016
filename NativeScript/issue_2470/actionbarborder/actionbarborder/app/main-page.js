var createViewModel = require("./main-view-model").createViewModel;
var frame = require('ui/frame');

function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = createViewModel();

    if (page.ios) {
        var navigationBar = frame.topmost().ios.controller.navigationBar;        
        navigationBar.translucent = false;
        navigationBar.barStyle = 0; 
        page.backgroundSpanUnderStatusBar = true;
        page.actionBarHidden = false; 
    }  

}
exports.onNavigatingTo = onNavigatingTo;