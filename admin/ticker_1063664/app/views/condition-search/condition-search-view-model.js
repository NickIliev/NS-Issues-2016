var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var http = require("http");
var imageSource = require("image-source");

var ViewModel = require("~/common/view-model-base")
var constants = require("~/common/constants");


function ConditionSearchViewModel(items) {
    var data = {
        pageTitle: "Search Providers",
        searchResults: new ObservableArray(items),
        searchTerm: "",
        isLoading: true,
        selectedScreen: 1,
        url: "http://uhqa72.paragon-dev.com/health-and-wellness/health-and-wellness-library?device=staywellapp"
    };
    var viewModel = new ViewModel(data);
    
    return viewModel;
}

module.exports = ConditionSearchViewModel;