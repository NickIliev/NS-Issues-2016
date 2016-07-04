'use strict';
var viewModel;
var observable = require('data/observable').Observable;

viewModel = new observable({
    BrandPrefix: "",
    BrandPostfix: "",
    isEnglish: true
});
 
module.exports = viewModel; 