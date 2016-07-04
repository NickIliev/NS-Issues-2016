var frameModule = require("ui/frame");

var createViewModel = require("./main-view-model").createViewModel;

function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = new createViewModel();
}
exports.onNavigatingTo = onNavigatingTo;

exports.otherpage = function(){
     frameModule.topmost().navigate({
        moduleName: "other-page",
        // clearHistory: true,
        animated: true,
        transition: {
            name: "fade",
            duration: 200,
            curve: "easeIn"
        }      
    });    
}