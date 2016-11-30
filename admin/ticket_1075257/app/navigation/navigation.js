'use strict';
var navigationViewModel = require('./navigation-view-model'),
    helpers = require('../utils/widgets/helper');

function viewLoaded(args) {
    var view = args.object;
    view.bindingContext = navigationViewModel;
}

function menuItemTap(args) {
    helpers.navigate(navigationViewModel.menuItems[args.index]);
}

exports.viewLoaded = viewLoaded;
exports.menuItemTap = menuItemTap;