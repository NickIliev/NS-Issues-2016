var AddMomentViewModel = require("../../shared/models/add-moment-view-model");
var viewModel = new AddMomentViewModel();

exports.onLoaded = function(args) {
    var page = args.object;
    page.bindingContext = viewModel;
};

exports.add = function() {
    viewModel.add();
}