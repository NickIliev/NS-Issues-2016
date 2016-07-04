'use strict';
var frames = require("ui/frame");
var helpers = require('../../../scripts/helper');
var http = require("http");
var viewModel = require('./bookmarks-view-model'); 
var appSettings = require("application-settings");
var dom = require("nativescript-dom");
//var monitor = global.monitor;


exports.navigatingTo = function(args){
    var page = args.object;

    page.bindingContext = viewModel;
    helpers.styleActionBar();
   
    viewModel.set("pageTitle", helpers.getResource("Bookmarks").toUpperCase());
    helpers.logScreenView("Resource Bookmarks");
    viewModel.favorites.length  = 0;
    helpers.getResourceFavorites().forEach(function(fav){
        viewModel.favorites.push(fav);
    });
    
    viewModel.hasBookMarks = (viewModel.favorites.length == 0) ? false : true;
    viewModel.isLoadComplete = true;
}

exports.pageLoaded = function (args) {
    
};

exports.onFavoriteItemTap = function(args){
    var stack = args.object;
    var item = stack.bindingContext;
    
    helpers.logEvent("Bookmarks", "Open Bookmark");
    
    helpers.navigate({
        moduleName: "views/resources/detail/resourceDetail",
        context: item.Id
    });   
}

exports.onClearFavorite = function(args){
    var closeButton = args.object;
    var parentStackLayout = closeButton.parent.parent;
    var favorite = closeButton.bindingContext;
    var favsSetting = "favoriteResources";
    var favorites = helpers.getResourceFavorites(); //get saved terms
    
    helpers.logEvent("Bookmarks", "Remove Bookmark");
    
    //Remove from favorite
    favorites.forEach(function(item, index, object) {
        if(item.Id.toLowerCase() == favorite.Id.toLowerCase()){
             //MATCH
            favorites.splice(index, 1); //Remove from array
            viewModel.favorites.splice(index, 1);
            viewModel.hasBookMarks = (viewModel.favorites.length == 0) ? false : true;
            
            //Re-save
            appSettings.setString(favsSetting, JSON.stringify(favorites));
        }
    }, this);
}

exports.onListViewLoadingFixSelectState = function (args) {
    helpers.setListViewNoSelect(args);
}

exports.navigatingFrom = function (args) {
    //Reset View
    //resetView();
}

exports.onNavigateBack = function(args){
    //monitor.trackFeature('Resources.List.GoBack');
    frames.topmost().goBack();
}
