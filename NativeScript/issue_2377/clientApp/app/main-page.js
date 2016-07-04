var frame = require("ui/frame"); 


function navigatingTo(args) {
    var page = args.object;
}
exports.navigatingTo = navigatingTo;

exports.onTap = function(args){
    var navigationEntry = {
        moduleName: "sub-page", 
        animated: true, 
        backstackVisible: false
    };
    frame.topmost().navigate(navigationEntry);
}