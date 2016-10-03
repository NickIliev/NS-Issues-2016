var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var http = require("http");

var ViewModel = require("~/common/view-model-base")
var constants = require("~/common/constants");

function SymptomCheckerViewModel() {
    var data = {
        pageTitle: "Symptom Checker",
        isLoading: true,
        selectedScreen: 0
    };
    var viewModel = new ViewModel(data);

    viewModel.load = function () {
        var that = this;

    };

    return viewModel;
}

module.exports = SymptomCheckerViewModel;