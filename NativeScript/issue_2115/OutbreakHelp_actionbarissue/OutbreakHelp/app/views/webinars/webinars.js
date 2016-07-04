'use strict';
var isInit = true;
var helpers = require('../../scripts/helper');
var moment = require('../../scripts/moment');
var http = require("http");
var viewModel = require('./webinars-view-model');
var frames = require("ui/frame");
var CultureModule = require('../../scripts/culture');

exports.pageLoaded = function (args) {
    helpers.styleActionBar();
    helpers.logScreenView("Webinars");
}

exports.navigatingTo = function (args) {
    var page = args.object;

    page.bindingContext = viewModel;
    //helpers.styleActionBar();
    var cultureModel = new CultureModule();
    
    http.getJSON("https://www.outbreakhelp.ca/RestApi/app/webinars?format=json&locale=" + cultureModel.current.locale).then(function (items) {
        //Fix the dates
        items.forEach(function(item){
           item.Day = moment(item.EventDate).format("DD").toUpperCase();
           item.Month = moment(item.EventDate).format("MMM").toUpperCase();
           item.Year = moment(item.EventDate).format("YYYY");
           item.FormattedDate = moment(item.EventDate).format("dddd MMMM DD, YYYY").toUpperCase();
           item.FormattedTime = moment(item.EventDate).format("hh:mma"); 
           item.Link = (item.RegistrationLink === "") ? item.ArchiveLink.trim() : item.RegistrationLink.trim();
           
        });
        
        viewModel.set("listItems", items);

        viewModel.set("isLoading", false);
        //monitor.trackFeatureStop('Webinars.List.GetData');
    }, function (e) {
        //ERROR
        console.log(e);
        //monitor.trackFeatureStop('Webinars.List.GetData');
    });
    
    viewModel.set("pageTitle", helpers.getResource("MenuWebinars").toUpperCase());
    
    if (isInit) {
        isInit = false;
        //monitor.trackFeature('Webinars.List.Initalized');
    }
};

exports.onWebinarItemTap = function(args) {
    var item = viewModel.listItems[args.index];

    helpers.navigate({
        moduleName: "views/webinars/detail/webinarDetails",
        context: item,
        transition: {
                name: "fade",
                duration: 380,
                curve: "easeIn"
            }
    });
}

exports.loadMoreItems = function (){
    
}

exports.onListViewLoadingFixSelectState = function (args) {
    helpers.setListViewNoSelect(args);
}


exports.onNavigateBack = function(args){
    //monitor.trackFeature('Webinars.List.GoBack');
    frames.topmost().goBack();
}