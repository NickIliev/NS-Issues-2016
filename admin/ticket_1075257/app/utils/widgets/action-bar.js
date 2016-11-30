'use strict';
var actionBarViewModel = require('./action-bar-view-model');

function viewLoaded(args) {
    var view = args.object;
    actionBarViewModel.setTitle(view.title);
    view.bindingContext = actionBarViewModel;
}

exports.viewLoaded = viewLoaded;