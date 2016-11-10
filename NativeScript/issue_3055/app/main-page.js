var createViewModel = require("./main-view-model").createViewModel;

function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = createViewModel();
}
exports.onNavigatingTo = onNavigatingTo;

exports.customTap = function(args) {
  console.log("TAP Custom");
};

exports.tapTest = function(args) {
  console.log("TAP 2");
};