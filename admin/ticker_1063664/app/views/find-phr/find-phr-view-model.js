var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var http = require("http");

var ViewModel = require("~/common/view-model-base")
var constants = require("~/common/constants");

function FindPHRViewModel() {
    var data = {
        pageTitle: "Find PHR",
        isLoading: false,
        selectedScreen: 0
    };
    var viewModel = new ViewModel(data);

    viewModel.load = function () {
        var that = this;

    };

    return viewModel;
}

module.exports = FindPHRViewModel;