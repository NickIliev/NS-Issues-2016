var MainView = require("~/common/main-view-base").MainView;
var MainViewModel = require("~/common/main-view-model-base").MainViewModel;

var options = {
    pageTitle: "Symptom Checker",
    pageName: "SymptomChecker",
    contentPath: "~/views/symptom-checker",
    contentModuleName: "symptom-checker",
    showBackButton: false
};

var view = new MainView(options);
view.viewModel = new MainViewModel(options);

module.exports = view;