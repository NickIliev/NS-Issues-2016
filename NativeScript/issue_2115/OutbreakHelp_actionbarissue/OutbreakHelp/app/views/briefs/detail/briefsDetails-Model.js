'use strict';
var viewModel;
var observable = require('data/observable').Observable;

viewModel = new observable({
    pageTitle: "",
    selectedIndex: 0,
    brief: {},
    viewButton: "",
    //labels: {
        General: "",
        Related: ""
    //}
}); 

module.exports = viewModel;