import frameModule = require("ui/frame");

let page;

exports.navigatingTo = function(args) {
  page = args.object;
  page.bindingContext = {};
};

exports.topNav = function(args) {
  frameModule.topmost().navigate({
    moduleName: "sub-page",
    clearHistory: true
  });
};