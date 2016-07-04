'use strict';
var isInit = true;
var dialogs = require("ui/dialogs");
var frames = require("ui/frame");
var http = require("http");
var appModule = require("application");
var appSettings = require("application-settings");
var helpers = require('../../../scripts/helper');
var CultureModule = require('../../../scripts/culture');
var snackbar = require("nativescript-snackbar");
var mt = require('nativescript-dom');
var tnsfx = require('nativescript-effects');
var dialogs = require("ui/dialogs");
var viewModel = require('./settings-model'); 
var appversion = require("nativescript-appversion");
var util = require("utils/utils");
var cultureModel = new CultureModule();
var initalized = false;
var page = null;

exports.pageLoaded = function (args) {
    page = args.object;
    page.bindingContext = viewModel;
    helpers.styleActionBar();
    helpers.logScreenView("Settings");
    
    setLabels();
    
    viewModel.currentCulture = cultureModel.current.language;
    
    appversion.getVersionName().then(function(v) {
      viewModel.version = v;
  })
};

exports.onChangeLanguage = function (args) {
    var options = {
        title: helpers.getResource("Language"),
        message: "",
        cancelButtonText: helpers.getResource("Cancel"),
        actions: ["English", "Français"]
    };
    
    dialogs.action(options).then(function (result) {
        if(result === "English" || result === "Français"){
            appSettings.setString("SavedCulture", result);
            cultureModel.setLanguage(result);
            viewModel.currentCulture = cultureModel.current.language;
            setLabels();
            helpers.logEvent("Settings", "Change Language",result, "");
        }
    });
}

exports.onTakeALeap = function (args) {
    var url = "http://www.leaplearning.ca";
    helpers.logEvent("Settings", "Visit Leap", url);
    util.openUrl(url);
}

exports.onClearCache = function (args) {
    var labels = JSON.parse(appSettings.getString("globalLabels"));
    labels.forEach(function(label){
        appSettings.remove(label);
    });
    helpers.initLabels();
    
    appSettings.remove("NewsletterLinks");
    helpers.initNewsletters();
    
    appSettings.remove("filterTaxa");
    helpers.initTaxa();

    snackbar.simple("Done");
}

exports.onNavigateBack = function(args){
    frames.topmost().goBack();
}


exports.onGettingStarted = function(args){
    helpers.logEvent("Settings", "Getting Started", "Open");
    util.openUrl(helpers.getResource("GettingStartedUrl"));
}

exports.onTermsOfUse= function(args){
    helpers.logEvent("Settings", "Terms of Use", "Open");
    var options = {
        title: helpers.getResource("FooterTermsOfUse"),
        message: helpers.getResource("TermsOfUseContent"),
        okButtonText: "OK"
    };
    dialogs.alert(options).then(function () {
        
    });
}


function setLabels(){
    viewModel.pageTitle = helpers.getResource("Settings");
    viewModel.language = helpers.getResource("Language");
    viewModel.clearCache = helpers.getResource("ClearCache");
    viewModel.developedBy = helpers.getResource("DevelopedBy");
    viewModel.GettingStarted = helpers.getResource("FooterGettingStarted");
    viewModel.Tutorial = helpers.getResource("Tutorial");
    viewModel.TermsOfUse = helpers.getResource("FooterTermsOfUse");
    
}