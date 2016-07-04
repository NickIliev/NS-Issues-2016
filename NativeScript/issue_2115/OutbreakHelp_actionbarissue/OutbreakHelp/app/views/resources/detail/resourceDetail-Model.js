'use strict';
var viewModel;
var observable = require('data/observable').Observable;
var observableArray = require("data/observable-array");

viewModel = new observable({
    //labels
    pageTitle: "",
    downloadTitle: "",
    
    isLoading: true,
    isFavorite: false,
    data: {
        Title: "",
        ArbitraryDateString: "",
        ExecutiveSummary: "",
        Content: "",
        Type: {
            Text: ""
        },
        Author: "",
        LevelOfEvidenceString: "",
        Jurisdictions: [],
        RelatedResources: [],
        Categories: []
    },
    segmentedBarIndex: 0,

    RelatedResources: new observableArray.ObservableArray([]),   
    //labels: {
        General: "",
        Details: "",
        Related: "",
        Resource: "",
        ExecutiveSummaries: ""
    //}
});

module.exports = viewModel;