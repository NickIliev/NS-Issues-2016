'use strict';
var isInit = true;
var helpers = require('../../scripts/helper');
var moment = require('../../scripts/moment');
var http = require("http");
var viewModel = require('./briefs-view-model');
var frames = require("ui/frame");
var CultureModule = require('../../scripts/culture');

exports.pageLoaded = function (args) {
    
}

exports.navigatingTo = function (args) {
    var page = args.object;
    page.bindingContext = viewModel;
    helpers.styleActionBar();
    helpers.logScreenView("Evidence Briefs");
    viewModel.set("pageTitle", helpers.getResource("MenuKB"));
    
    var cultureModel = new CultureModule();
    
    http.getJSON("https://www.outbreakhelp.ca/RestApi/app/briefs?format=json&locale=" + cultureModel.current.locale).then(function (items) {
        viewModel.set("listItems", items);

        viewModel.set("isLoading", false);
        //monitor.trackFeatureStop('briefss.List.GetData');
    }, function (e) {
        //ERROR
        console.log(e);
        //monitor.trackFeatureStop('briefss.List.GetData');
    });
    
    if (isInit) {
        isInit = false;
        //monitor.trackFeature('briefss.List.Initalized');
    }
};

exports.onBriefsItemTap = function(args) {
    var itemData = viewModel.listItems[args.index];

    helpers.navigate({
        moduleName: "views/briefs/detail/briefsDetails",
        context: itemData,
        transition: {
            name: "fade",
            duration: 380,
            curve: "easeIn"
        }
    });
}

exports.onListViewLoadingFixSelectState = function (args) {
    helpers.setListViewNoSelect(args);
}

exports.loadMoreItems = function (){
    
}

exports.onNavigateBack = function(args){
    //monitor.trackFeature('briefss.List.GoBack');
    frames.topmost().goBack();
}