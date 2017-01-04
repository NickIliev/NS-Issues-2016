"use strict";
var drawerModule = require("nativescript-telerik-ui/sidedrawer");
var mySideDrawer;
var page;
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
exports.pageMainNavigated = function (args) {
    page = args.object;
    // mySideDrawer= page.getViewById('mySideDrawer');
    // mySideDrawer.setDrawerLocation(drawerModule.SideDrawerLocation.Left);
    var ind1 = page.getViewById("ind1");
    var ind2 = page.getViewById("ind2");
};
//# sourceMappingURL=main-page.js.map