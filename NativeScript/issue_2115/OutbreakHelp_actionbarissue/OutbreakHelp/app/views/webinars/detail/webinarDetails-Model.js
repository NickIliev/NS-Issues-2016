'use strict';
var viewModel;
var observable = require('data/observable').Observable;

viewModel = new observable({
    pageTitle: "",
    webinar: {},
    viewButton: ""
}); 

module.exports = viewModel;