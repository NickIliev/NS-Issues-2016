
var drawerModule = require("nativescript-telerik-ui/sidedrawer");
var mySideDrawer;
var page;

import { ActivityIndicator } from "ui/activity-indicator";
import { Color } from "color";
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;

exports.pageMainNavigated = function (args) {
    page = args.object;

    // mySideDrawer= page.getViewById('mySideDrawer');
    // mySideDrawer.setDrawerLocation(drawerModule.SideDrawerLocation.Left);

    var ind1 = <ActivityIndicator>page.getViewById("ind1");
    var ind2 = <ActivityIndicator>page.getViewById("ind2");
};