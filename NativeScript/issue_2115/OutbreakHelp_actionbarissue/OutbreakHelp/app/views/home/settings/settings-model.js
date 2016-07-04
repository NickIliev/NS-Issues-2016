'use strict';
var viewModel;
var Observable = require('data/observable').Observable;
var observableArray = require("data/observable-array");

viewModel = new Observable({
    pageTitle: "",
    version: "x.x",
    currentCulture: "English",
    //labels
    language: "",
    clearCache: "",
    developedBy: "",
    GettingStarted: "",
    Tutorial: "",
    TermsOfUse: ""
});

module.exports = viewModel;