'use strict';
var viewModel;
var Observable = require('data/observable').Observable;
var observableArray = require("data/observable-array");

viewModel = new Observable({
    selectedTypeIndex: 0,
    
    backButtonHidden: false,
 
    pageTitle: '',

    currentLocale: "",

    favorites: new observableArray.ObservableArray(),
    hasBookMarks: false,
    isLoadComplete: false,
});

module.exports = viewModel;