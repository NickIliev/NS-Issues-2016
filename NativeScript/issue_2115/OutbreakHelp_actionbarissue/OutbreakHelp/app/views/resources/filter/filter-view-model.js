'use strict';
var viewModel;
var Observable = require('data/observable').Observable;
var observableArray = require("data/observable-array");

viewModel = new Observable({
    //Labels
    pageTitle: "",
    apply: "",
    cancel: "",
    clearFilters: "",
    isBinding: true,    
    
    needSummary: false,
    topics: new observableArray.ObservableArray(),
    jurisdictions: new observableArray.ObservableArray(),
    types:  new observableArray.ObservableArray(),
    
    //iOS Stuff
    isGeneralSelected: true,
    isTopicsSelected: false,
    isJurisdictionSelected: false,
    
    selectedIndex: 0,
    closedAction: "Apply",
    
    labels: {
        general: "",
        topics: "",
        jurisdictions: "",
        executiveSummaries: "",
        resourceType: ""
    }
});

module.exports = viewModel;