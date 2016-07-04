'use strict';
var viewModel;
var Observable = require('data/observable').Observable;
var observableArray = require("data/observable-array");
require("nativescript-social-share");
//require( "../../node_modules/nativescript-observable-subscribe/observablesubscribe" );



viewModel = new Observable({
    selectedTypeIndex: 0,
    selectedTypeName: "All",
    
    backButtonHidden: false,
 
    //Labels
    pageTitle: '',
    searchHint: "",
    
    isLoading: false,
    isSearching: false,
    hasResults: true,
    hasFilter: false,
    currentLocale: "",
    searchText: "",

    resourceItems: new observableArray.ObservableArray(),
    topics: new observableArray.ObservableArray(),
    jurisdictions: new observableArray.ObservableArray(),
    totalResources: 0,
    
    hasExecutiveSummaries: false,
    selectedTopics: new observableArray.ObservableArray(),
    selectedJurisdictions: new observableArray.ObservableArray(),
    
    types: [
         { "title" : "All", "type" : "all"},
         { "title" : "Article", "type" : "article"},
         { "title" : "Guidance", "type" : "guidance"},
         { "title" : "Implimentation Tools", "type" : "implementation-tools"},
         { "title" : "Multimedia Tools", "type" : "multimedia-tools"},
         { "title" : "News", "type" : "news" },
         { "title" : "Website", "type" : "website" },
         { "title" : "Book", "type" : "book"}
    ],
    
    refineFilters: "",
    noResults: "",
    resultsAreFiltered: "",
    clear: "",
});

module.exports = viewModel;