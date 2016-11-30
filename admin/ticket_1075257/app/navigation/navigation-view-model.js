'use strict';
var menuItems,
    observable = require('data/observable'),
    navigationViewModel = new observable.Observable();

menuItems = [{
    "title": "Dashboard",
    "moduleName": "components/dashboard/dashboard",
    "icon": "res://dashboard_24dp"
},
{
    "title": "App Design",
    "moduleName": "components/app-design/app-design",
    "icon": "res://app_design_12dp",
},
{
    "separator": true
},
{
    "title": "Settings",
    "moduleName": "components/dashboard/dashboard",
    "icon": "res://settings_24dp",
}];

navigationViewModel.set('menuItems', menuItems);
navigationViewModel.set('username', 'Jeremy Orme');
navigationViewModel.set('email', 'jeremy.orme@gmail.com');

module.exports = navigationViewModel;