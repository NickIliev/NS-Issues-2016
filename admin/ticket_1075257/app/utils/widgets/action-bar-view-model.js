'use strict';
var observable = require('data/observable'),
    actionBarViewModel = new observable.Observable();

function setTitle(title) {
    actionBarViewModel.set("title", title);
}

actionBarViewModel.setTitle = setTitle;

module.exports = actionBarViewModel;