var admob = require("nativescript-admob");
var frameModule = require("ui/frame");
var buttonModule = require("ui/button");

var vmModule = require("./main-view-model");

var topmost;
var page;

function onNavigatedTo(args) {
    page = args.object;
    page.bindingContext = vmModule.mainViewModel;

    topmost = frameModule.topmost(); 
    console.log('topmost at onNavigatedTo() : ' + topmost);
}

function buttonClicked(args) {
    
    var navigationEntry = {
        moduleName: "views/home",
        animated: true,
        transition: {
            name: "slideTop"
        }
    };
    
    topmost.navigate(navigationEntry);
}

exports.onNavigatedTo = onNavigatedTo;
exports.buttonClicked = buttonClicked;
