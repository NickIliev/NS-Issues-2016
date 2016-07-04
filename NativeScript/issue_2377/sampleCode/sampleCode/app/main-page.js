var frame = require("ui/frame"); 

exports.onTap = function(args){
    var navigationEntry = {
        moduleName: "subpage", 
        animated: true, 
        backstackVisible: false
    };
    frame.topmost().navigate(navigationEntry);
}