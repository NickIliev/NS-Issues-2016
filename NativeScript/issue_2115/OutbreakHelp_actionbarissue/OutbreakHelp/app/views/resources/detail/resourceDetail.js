var http = require("http");
var viewModel = require('./resourceDetail-Model');
var helpers = require('../../../scripts/helper');
var frames = require("ui/frame");
var util = require("utils/utils");
var socialShare = require("nativescript-social-share");
var snackbar = require("nativescript-snackbar");
var appModule = require("application");
var appSettings = require("application-settings");
var app = require("application");
var dialogs = require("ui/dialogs");
var CultureModule = require('../../../scripts/culture');
var cultureModel = new CultureModule();
var page = null;

var favsSetting = "favoriteResources";

exports.navigatingTo = function (args) {
    page = args.object;
    page.bindingContext = viewModel;
    helpers.styleActionBar();

    createBindingFunctions();
    
    viewModel.set("isLoading", true);
    var resourceId = page.navigationContext;
    
    setLabels();
    
     //Create the object to save the searches   
     if(!appSettings.hasKey(favsSetting)){
         appSettings.setString(favsSetting, JSON.stringify([]));
     }
    
    loadDetailItem(resourceId); 
}

exports.pageLoaded = function (args) {
    //viewModel.pageTitle = "TEST";
}

exports.navigatedFrom = function (args) {
    //viewModel.data = {};
    viewModel.segmentedBarIndex = 0;
}

exports.onOpenUrl = function(args){
    var link = viewModel.data.Url;
    helpers.logEvent("Resource Detail", "Open Url", link);
    util.openUrl(link);
}

exports.onShareUrl = function(args){
    
    console.log("onShareUrl");
    
    var urlName = viewModel.data.UrlName;
    var url ="https://www.outbreakhelp.ca/resources/detail/" + urlName;
    helpers.logEvent("Resource Detail", "Share Url", url);
    socialShare.shareText(url);
}

exports.onRelatedResourceItemTap = function (args) {
    helpers.logEvent("Resource Detail", "Open Related Resource");
    var itemData = viewModel.data.RelatedResources[args.index];
    loadDetailItem(itemData.Id);
    
    var tabView = page.getViewById("tabViewContainer");
    tabView.selectedIndex = 0;
    
    viewModel.segmentedBarIndex = 0;
}; 

exports.onNavigateBack = function(args){
    frames.topmost().goBack();
}

function loadDetailItem(resourceId){
    var url = "https://www.outbreakhelp.ca/RestApi/app/resources/" + resourceId +"?format=json&locale=" + cultureModel.current.locale;
    console.log(url);    
    http.getJSON(url).then(function (dataItem) {
        viewModel.data = dataItem;

        if(appModule.ios){
            //Doesn't seem to bind instantly on android...
            viewModel.set("pageTitle", dataItem.Title); 
        }
        viewModel.set("isFavorite", isFavorite());
        helpers.logScreenView("Resource Detail - " + dataItem.Title);
        helpers.fixhtmlViewFonts(page, "contentHtmlView");
        helpers.fixhtmlViewFonts(page, "summaryHtmlView");
        viewModel.set("isLoading", false);
    }, function (e) {
        //ERROR
        console.log(e);
    });
}

exports.onListViewLoadingFixSelectState = function (args) {
    helpers.setListViewNoSelect(args);
}

exports.toggleFavorite = function(args){
    
    console.log("toggleFavorite");
    
    var newFav = {
        Id: viewModel.data.Id,
        Title: viewModel.data.Title,
        Type: viewModel.data.Type,
        DateAdded: new Date()
    };

    //save result to app settings
    var favorites = JSON.parse(appSettings.getString(favsSetting)); //get saved terms
    var exists = isFavorite(favorites);

     if(exists){
         //Remove from favorite
         helpers.logEvent("Resource Detail", "Remove Bookmark");
        favorites.forEach(function(item, index, object) {
            if(item.Id.toLowerCase() == newFav.Id.toLowerCase()){
                //MATCH
                object.splice(index, 1); //Remove from array
            }
        }, this);
        snackbar.simple(helpers.getResource("RemovedFromBookmarks"));
        exists = false;     
     }else{
         //Add to favs
         helpers.logEvent("Resource Detail", "Add Bookmark");
         favorites.unshift(newFav);
        snackbar.simple(helpers.getResource("AddedToBookmarks"));
         exists = true;
     }

    viewModel.set("isFavorite", exists);
    
    //Add new search term to top
     appSettings.setString(favsSetting, JSON.stringify(favorites));
}

function isFavorite(){
    var exists = null;
    var favorites = JSON.parse(appSettings.getString(favsSetting)); //get saved terms
    
     //See if this term already exists
    favorites.forEach(function(item) {
        if(item.Id.toLowerCase() == viewModel.data.Id.toLowerCase()){
            exists = true;
        }
    }, this);     
 
    return exists;
}

function createBindingFunctions(){
   var toIcon = {
        toView: function (value) {
            return helpers.toIcon(value);
        }
    }
    
    appModule.resources["toIcon"] = toIcon;
}

function setLabels(){
    viewModel.downloadTitle = helpers.getResource("ResourceDetailLink");
    viewModel.set("isLoading", true);
    viewModel.General = helpers.getResource("FilterGeneral");
    viewModel.Details = helpers.getResource("Details");
    viewModel.Related = helpers.getResource("Related");
    viewModel.Resource = helpers.getResource("Resource");
    viewModel.ExecutiveSummaries = helpers.getResource("ExecutiveSummaries");
}
