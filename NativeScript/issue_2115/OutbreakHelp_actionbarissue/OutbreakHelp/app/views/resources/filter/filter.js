'use strict';
var isInit = true;
var frames = require("ui/frame");
var http = require("http");
var app = require("application");
var appSettings = require("application-settings");
var helpers = require('../../../scripts/helper');
var viewModel = require('./filter-view-model'); 
var CultureModule = require('../../../scripts/culture');
var snackbar = require("nativescript-snackbar");
var mt = require('nativescript-dom');
var tnsfx = require('nativescript-effects');
var googleAnalytics = require("nativescript-google-analytics");
var cultureModel = new CultureModule();
var closeCallback;
var initalized = false;
var loadedCulture = "";
var page = null;
var taxaData = null;
var unmodifiedModel = null; //So we can cancel
var androidHasLoadedExtended = false;

exports.shownModally = function (args) {
    page = args.object;
    
    setLabels();
    createBindingFunctions();
    
    page.bindingContext = viewModel;
    helpers.logScreenView("Resources Filter");
    unmodifiedModel = viewModel;
    if(!initalized){
        console.log("Not initalized, getting new taxa");
        
        googleAnalytics.startTimer("Taxa Callback", {
                                category: "Http Callback",
                                name: "/RestApi/app/taxa"
                            });
        
        
        helpers.initTaxa().then(function(args) {
            googleAnalytics.stopTimer("Taxa Callback");
            taxaData = args; 
            loadCoreMenu();
            loadExtendedMenu();
            
            initalized = true;
        }, function(e){
            //Do nothing
            googleAnalytics.stopTimer("Taxa Callback");
            googleAnalytics.logException("Problem Loading taxa from site" + e);
        });
    }else{
        console.log("Loading saved Taxa");
    }
    
    closeCallback = args.closeCallback;
}

exports.onDoneClick = function(args){
    viewModel.closedAction = "Apply";
    //Save State
    closeCallback(viewModel);
}

exports.onCancelClick = function (args) {
    unmodifiedModel.closedAction = "Cancel";
    closeCallback(unmodifiedModel);
}

exports.onClearClick = function(args){
    viewModel.types.forEach(function(item) {
        item.IsSelected = false;
    });
    
    viewModel.topics.forEach(function(item) {
        item.IsSelected = false;
    });
    
    viewModel.jurisdictions.forEach(function(item) {
        item.IsSelected = false;
    });
    
    viewModel.needSummary = false;
    page.getViewById("typeRepeater").refresh();
    page.getViewById("categoryRepeater").refresh();
    page.getViewById("jurisdictionRepeater").refresh();
    
    viewModel.closedAction = "Cleared";
    closeCallback(viewModel);
}

exports.onSegmentedBarChange = function(args){
    viewModel.isGeneralSelected = false;
    viewModel.isTopicsSelected = false;
    viewModel.isJurisdictionSelected = false;   
            
    switch (args.newIndex) {
        case 0:
            viewModel.isGeneralSelected = true;        
            helpers.logEvent("Resource Filters", "General");  
            break;
        case 1:
            viewModel.isTopicsSelected = true;
            helpers.logEvent("Resource Filters", "Topics"); 
            break;
        case 2:
            viewModel.isJurisdictionSelected = true;   
            helpers.logEvent("Resource Filters", "Jurisdiction");
            break;
    }
}

exports.onTypeTap = function(args){
    
    selectListItem(args, "typeRepeater");
}

exports.onCategoryTap = function(args){
    selectListItem(args, "categoryRepeater");
}

exports.onJurisdictionTap = function(args){
    selectListItem(args, "jurisdictionRepeater");
}

function selectListItem(args, repeaterId){
    var stack = args.object;
    var item = stack.bindingContext;
    
    item.IsSelected = (item.IsSelected) ? false : true;
    
    if(app.ios){
        stack.cssClass = (item.IsSelected) ? "filter-item-selected" : "filter-item";
    }

    var icon = stack.getElementsByClassName("selection-icon")[0];
    var checkboxText = (item.IsSelected) ? "\uE834" : "\uE835";

    icon.text = checkboxText;
}


function loadCoreMenu() {
    if(appSettings.hasKey("savedFilters")){
        //Use saved filters
        taxaData = JSON.parse(appSettings.getString("savedFilters"));
    }

    viewModel.types.length = 0;
    if(taxaData !== null){
        taxaData.Types.forEach(function(type) {
            viewModel.types.push(type.Type);
        });
    }else{
        console.log("No saved appsettings to load for filterTaxa")
    }
}

function loadExtendedMenu() {
    //Get Categories
    viewModel.topics.length = 0;
    taxaData.Topics.forEach(function(taxon) {
        viewModel.topics.push(taxon);
    });

    //Get Jurisdictions
    viewModel.jurisdictions.length = 0;
    taxaData.Jurisdictions.forEach(function(taxon) {
        viewModel.jurisdictions.push(taxon);
    });
    
    viewModel.isBinding = false;
}

exports.onExecutiveSummaryChanged = function(args){
    if (args.propertyName === "checked") {
        if(viewModel.hasExecutiveSummaries)
            snackbar.simple("Executive Summary Filter Applied");
    }
}

exports.onPickFilters = function(args){
    //TODO
}

function setLabels(){
    viewModel.pageTitle = helpers.getResource("Filter");
    viewModel.apply = helpers.getResource("Apply");
    viewModel.cancel = helpers.getResource("Cancel");
    viewModel.clearFilters = helpers.getResource("ClearFilters");
    
    viewModel.labels.general = helpers.getResource("FilterGeneral");
    viewModel.labels.topics = helpers.getResource("FilterTopics");
    viewModel.labels.jurisdictions =  helpers.getResource("FilterJurisdictions");
    viewModel.labels.executiveSummaries =  helpers.getResource("ExecutiveSummaries");
    viewModel.labels.resourceType =  helpers.getResource("ResourceType");
}

function createBindingFunctions(){
   var toIcon = {
        toView: function (value) {
            return helpers.toIcon(value);
        }
    }
    
    app.resources["toIcon"] = toIcon;
}