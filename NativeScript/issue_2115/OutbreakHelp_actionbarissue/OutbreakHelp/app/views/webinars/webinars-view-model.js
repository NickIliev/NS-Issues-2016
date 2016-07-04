'use strict';
var viewModel;
var Observable = require('data/observable').Observable;
var observableArray = require("data/observable-array");

viewModel = new Observable({

    backButtonHidden: false,

    pageTitle: '',
    
    isLoading: false,

    listItems: [],
    // additional properties

});

// START_CUSTOM_CODE_home
// END_CUSTOM_CODE_home
module.exports = viewModel;