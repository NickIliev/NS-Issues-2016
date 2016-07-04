'use strict';
var frames = require("ui/frame");
var appModule = require("application");
var appSettings = require("application-settings");
var helpers = require('../../scripts/helper');
var http = require("http");
var segmentedBarModule = require("ui/segmented-bar");
var dialogs = require("ui/dialogs");
var viewModel = require('./resources-view-model'); 
var CultureModule = require('../../scripts/culture');
var urlencode = require('urlencode');
var googleAnalytics = require("nativescript-google-analytics");
var snackbar = require("nativescript-snackbar");
var cultureModel = new CultureModule();
var pageSize = 1;
var lastQuery = "";
var page = null;
var filterModel = null;

var observableModule = require("data/observable");

exports.navigatingTo = function (args){
    page = args.object;
    cultureModel = new CultureModule();
}

exports.pageLoaded = function (args) {
    helpers.styleActionBar();
    helpers.logScreenView("Resources");
    createBindingFunctions();
    

    viewModel.set("firstIcon", String.fromCharCode("&#xE80D"));
    viewModel.set("secondIcon", String.fromCharCode("&#xE866"));
    
    page.bindingContext = viewModel;
   
    setLabels();
    
    // Prevent the first textfield from receiving focus on Android
	// See http://stackoverflow.com/questions/5056734/android-force-edittext-to-remove-focus
	if (page.android) {
		var layout = page.getViewById("layout").android;
        var searchbox = page.getViewById("searchResources");
		layout.setFocusableInTouchMode(true);
		layout.setFocusable(true);
		searchbox.android.clearFocus();
    }
    
    loadItems();
    
};

exports.performSearch = function(args){
    resetView();
    loadItems(args.object.text);
    helpers.logEvent("Resources", "Search", args.object.text, "");
    //unfocus element
    clearSearchBarFocus();
}

exports.clearSearch = function(args){
    resetView();
    viewModel.searchText = "";
    loadItems(viewModel.searchText);
    helpers.logEvent("Resources", "Clear Search");
    //unfocus element
    clearSearchBarFocus();
}



exports.onBookmarkClick = function(args){
    helpers.logEvent("Resources", "Open Bookmarks");
    helpers.navigate({
        moduleName: "views/resources/bookmarks/bookmarks",
        transition: {
            name: "fade",
            duration: 380,
            curve: "easeIn"
        }
    });
}

exports.onPickFilters = function(args){
    helpers.logEvent("Resources", "Open Filters");
     var filtersModule = "./views/resources/filter/filter";
    var fullscreen = true;
    //MODAL CALLBACK
    page.showModal(filtersModule, filterModel, function closeCallback(filters) {
        if(filters !== undefined){
            filterModel = filters;
            resetView();
            loadItems();
            
            if(filterModel.closedAction == "Cleared"){
                viewModel.hasFilter = false;
            }
            
            setTimeout(function() {
                //Snackbar popup
                if(filterModel.closedAction !== "Apply"){
                    snackbar.simple("Filters Cleared");    
                }
            }, 500);
        }
    }, fullscreen);
    
}

exports.onClearFilters = function (args) {
    helpers.logEvent("Resources", "Clear Filters");
    resetView();
    filterModel = null;
    viewModel.searchText = "";
    loadItems();
}
 
exports.onListViewItemTap = function (args) {
    var itemData = viewModel.resourceItems.getItem(args.index);
    
    //monitor.trackFeatureValue('Resources.List.Click.Item', itemData.Title);
    
    helpers.navigate({
        moduleName: "views/resources/detail/resourceDetail",
        context: itemData.Id,
        transition: {
            name: "fade",
            duration: 380,
            curve: "easeIn"
        }
    });
}; 

exports.onListViewLoadingFixSelectState = function (args) {
    helpers.setListViewNoSelect(args);
}

exports.loadMoreItems = function (args) {
    //monitor.trackFeature('Resources.List.Scroll.LoadMoreItems');
    if(viewModel.isLoading === false){
        loadItems();
    }
} 

exports.navigatingFrom = function (args) {
    //Reset View
    //resetView();
    //viewModel.isLoading = false;
}

exports.onNavigateBack = function(args){
    //monitor.trackFeature('Resources.List.GoBack');
    frames.topmost().goBack();
}

function loadItems(){
    if(!viewModel.isLoading){
        viewModel.hasFilter = false;
        viewModel.isLoading = true;
        
        //Check locale info, might need to kill the items
        var whereWeAtNow = cultureModel.current.locale;
        var whereWereWe = viewModel.get("currentLocale");
        
        if(whereWeAtNow != whereWereWe){
            //Set the locale
            viewModel.set("currentLocale", cultureModel.current.locale);
            
            //Reset the array
            resetView();
        } 
        
        //Build Url
        var url = "https://www.outbreakhelp.ca/RestApi/app/resources?format=json&locale=" + cultureModel.current.locale;
        if(pageSize > 1){
            url += "&page=" + pageSize
        }
        
        if(viewModel.searchText != ""){
            url += "&text=" + encodeURIComponent(viewModel.searchText); 
            viewModel.hasFilter = true;
        }
        
        if(filterModel != null){
            var comma = "%2C";
            
            //TYPE
            var types = "";
            filterModel.types.forEach(function(type){
                if(type.IsSelected){
                    types += encodeURIComponent(type.UrlName) + comma;    
                    viewModel.hasFilter = true;
                }
            });
            if(types !== ""){
                url += "&type=" + types.slice(0, -3); 
            }
            
            //TOPIC
            var topics = "";
            filterModel.topics.forEach(function(topic){
                if(topic.IsSelected){
                    topics += encodeURIComponent(topic.FullUrl) + comma;   
                    viewModel.hasFilter = true;     
                }
            });
            if(topics !== ""){
                url += "&category=" + topics.slice(0, -3); 
            }
            
            var jurisdictions = "";
            //JURISDICTION
            filterModel.jurisdictions.forEach(function(j){
                if(j.IsSelected){
                    jurisdictions += encodeURIComponent(j.FullUrl) + comma;    
                    viewModel.hasFilter = true;    
                }
            });
            if(jurisdictions !== ""){
                url += "&jurisdiction=" + jurisdictions.slice(0, -3); 
            }
            
            //OPTIONS
            if(filterModel.needSummary){
                url += "&summaries=true";
                viewModel.hasFilter = true;
            }
        }
        
        
        console.log(url);
        //monitor.trackFeatureStart("Resources.List.GetData");
        lastQuery = url; //Save for debugging
        
        googleAnalytics.startTimer("Resources Callback", {
                                category: "Http Callback",
                                name: "/RestApi/app/resources",
                                label: url
                            });

        //var encode
        http.getJSON(url).then(function (data) {
            googleAnalytics.stopTimer("Resources Callback");
            
            data.Resources.forEach(function(item){
                viewModel.resourceItems.push(item);
            });
            viewModel.totalResources = data.TotalRecordCount;
            pageSize++;
            viewModel.isLoading = false;
            viewModel.isSearching = false;
            
            viewModel.hasResults = (viewModel.resourceItems.length == 0) ? false : true;
            
            //monitor.trackFeatureStop("Resources.List.GetData");
        }, function (e) {
            //ERROR
            googleAnalytics.stopTimer("Resources Callback");
            googleAnalytics.logException("Error Loading Resources " + e);
            console.log(e);
            //monitor.trackFeatureStop("Resources.List.GetData");
        });
    }
}


function clearSearchBarFocus(){
    var searchBar = page.getViewById("searchResources" );
    
    if(searchBar && searchBar.android){
        searchBar.android.clearFocus();
    }   
}




function createBindingFunctions(){
   var toIcon = {
        toView: function (value) {
            return helpers.toIcon(value);
        }
    }
    
    appModule.resources["toIcon"] = toIcon;
}

function resetView(){
    viewModel.resourceItems.length = 0;
    pageSize = 1;
}

function setLabels(){
    viewModel.pageTitle = helpers.getResource("MenuResources").toUpperCase();
    viewModel.searchHint = helpers.getResource("Search");
    viewModel.refineFilters = helpers.getResource("RefineFilters");
    viewModel.noResults = helpers.getResource("NoResults");
    viewModel.resultsAreFiltered = helpers.getResource("ResultsAreFiltered");
    viewModel.clear = helpers.getResource("Clear");
}

