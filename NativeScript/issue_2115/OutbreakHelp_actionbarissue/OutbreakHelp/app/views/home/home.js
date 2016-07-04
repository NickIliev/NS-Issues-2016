'use strict';
var isInit = true;
var app = require("application");
var helpers = require('../../scripts/helper');
var frame = require("ui/frame");
var gestures = require("ui/gestures");
var connectivity = require("connectivity");
var animation = require("ui/animation");
var viewModel = require('./home-view-model');
var appSettings = require("application-settings");
var http = require("http");
var dialogs = require("ui/dialogs");
var dom = require("nativescript-dom");
var zendesk = require("nativescript-zendesk");
var colorModule = require("color");
var util = require("utils/utils");
var googleAnalytics = require("nativescript-google-analytics");
var CultureModule = require('../../scripts/culture');
var cultureModel = new CultureModule();
var page = null;


exports.navigatingTo = function (args) {
    page = args.object;
    page.bindingContext = viewModel;

    if(appSettings.hasKey("SavedCulture")){
        cultureModel.setLanguage(appSettings.getString("SavedCulture"));
    }

    //if(isInit){
        initApp();
    //    isInit = false;
    //}

    
} 

exports.pageLoaded = function(args){
    helpers.styleActionBar();
    helpers.primeSiteData();
    helpers.logScreenView("Home");
    googleAnalytics.stopTimer("App Start");
}


exports.onLoadResources = function(args){
    var grid = args.object.parent;
    animateClick(grid).then(function () {
        //monitor.trackFeature('Home.Click.Resources');
        helpers.navigate({
            animated: true,
            moduleName: "views/resources/resources",
            transition: {
                name: "fade",
                duration: 380,
                curve: "easeIn"
            }
        });
    });
}

exports.onLoadBriefs = function (args) {
    var grid = args.object.parent;
    animateClick(grid).then(function () {
        helpers.navigate({
            animated: true,
            moduleName: "views/briefs/briefs",
            transition: {
                name: "fade",
                duration: 380,
                curve: "easeIn"
            }
        });
    });
}

exports.onOpenZendeskContact = function(args){
    helpers.logScreenView("Contact Us");
    setTimeout(function(){
        initZendesk();

        if(app.ios){
            zendesk.openContactList();
        }
        else{
            var options = {
                title: "",
                message: "",
                cancelButtonText: helpers.getResource("Cancel"),
                actions: [helpers.getResource("LoadMyTickets"), helpers.getResource("CreateNewTicket")]
            };
            
            dialogs.action(options).then(function (result) {
                if(result === helpers.getResource("CreateNewTicket")){
                    zendesk.createContactRequest();
                }else{
                    //"Load My Tickets"
                    zendesk.openContactList();
                }
            });
        }
            
    }, 50);
}


exports.onLoadZendeskBriefs = function(args){
    var grid = args.object.parent;
    animateClick(grid).then(function () {
        initZendesk();
    
        var briefs = helpers.getResource("MenuKB");
        try{
            zendesk.openHelpCenter({
                type: "Category",
                id: 200282057,
                name: briefs
            }); 
        }catch(ex){
            alert("Problem Starting Zendesk");
        } 
    });
}


/*
exports.onLoadGettingStarted = function(args){
    var grid = args.object.parent;
    animateClick(grid).then(function () {
        initZendesk();
    
        var gettingStarted = helpers.getResource("GettingStarted");
        try{
            zendesk.openHelpCenter({
                type: "Category",
                id: 200175908,
                name: gettingStarted
            }); 
        }catch(ex){
            alert("Problem Starting Zendesk");
        } 
    });
}
*/
exports.onLoadWebinars = function(args){
    var grid = args.object.parent;
    animateClick(grid).then(function () {
        helpers.navigate({
            animated: true,
            moduleName: "views/webinars/webinars",
            transition: {
                name: "fade",
                duration: 380,
                curve: "easeIn"
            }
        });    
    });
} 

exports.onLoadNewsletters = function(args){
    helpers.logScreenView("Newsletter");
    var grid = args.object.parent;
    animateClick(grid).then(function () {
        if(appSettings.hasKey("NewsletterLinks")){
            var data = JSON.parse(appSettings.getString("NewsletterLinks"));
            cultureModel = new CultureModule();
            if(cultureModel.current.language == "English"){
                util.openUrl(data.EnglishLink);
            }else{
                util.openUrl(data.FrenchLink);
            }
        }else{
            alert("Unable to get newsletter links, please restart app");
        }
    });
} 


exports.onOpenTwitter = function(args){
    var url = helpers.getResource("SocialTwitter");
    helpers.logEvent("Social", "Twitter",url, "");
    util.openUrl(url);
}

exports.onOpenFacebook = function(args){
    var url = helpers.getResource("SocialFacebook");
    helpers.logEvent("Social", "Facebook",url, "");
    util.openUrl(url);
}
 
exports.onOpenNCCMT = function(args){
    util.openUrl(helpers.getResource("NCCMTLink"));
}


exports.onOpenSettings = function (args) {
    var icon = page.getViewById("settingsIcon");
    
    icon.animate({
        rotate: 360,
        duration: 300
    }).then(function (args) {
        var settingsView = "./views/home/settings/settings";
        helpers.navigate({
            animated: true,
            moduleName: settingsView,
            transition: {
                name: "slideRight",
                duration: 200,
                curve: "easeIn"
            }
        });    
    })
    

}


function initApp(){
    //var prefix = (viewModel.isEnglish) ? "Outbreak" : "Info";
    //var postfix = (viewModel.isEnglish) ? "Help" : "ÉPIDÉMIE";

    //viewModel.BrandPrefix = prefix.toUpperCase();
    //viewModel.BrandPostfix = postfix.toUpperCase();
    
    var hasConnection = true;
    var connectionType = connectivity.getConnectionType();
    switch (connectionType) {
        case connectivity.connectionType.none:
            alert("No Internet Access Detected")
            hasConnection = false;
            break;
        case connectivity.connectionType.wifi:
            //console.log("WiFi connection");
            break;
        case connectivity.connectionType.mobile:
            //console.log("Mobile connection");
            break;
    }
    
    if(hasConnection){
        helpers.initLabels().then(function() {
          helpers.initNewsletters();
          setLabels();
          viewModel.loading = false;  
        });
    }
}


function initZendesk(){
    zendesk.init({
        appId: "bdc5ff099c74bf547e8f4275a0fe0acaa3d053056a873edc", //required
        url: "https://outbreakhelp.zendesk.com", //required
        clientId: "mobile_sdk_client_64587379e8e42c60d41e", //required
        enableLogging: false, //optional, bool
        locale: cultureModel.current.locale //optional, string
    });
}

function getZendeskIosTheme(){
    var purple = "#BD5680";
    var grey = "#e0e0e0";
    var white = "#FFFFFF";
    var text = "#333333";
                
    return {
        ZDKSupportView: {
            viewBackgroundColor: white,
            tableBackgroundColor: white,
            separatorColor: grey,
            searchBarStyle: 0,
            /*
            noResults: {
                foundLabelColor: "#E0E0E0",
                foundLabelBackground: "#E0E0E0",
                contactButtonBackground: "#E0E0E0",
                contactButtonTitleColorNormal: "#E0E0E0",
                contactButtonTitleColorHighlighted: "#E0E0E0",
                contactButtonTitleColorDisabled: "#E0E0E0",
                contactButtonBorderColor: "#E0E0E0",	
                foundLabelFont: UIFont.fontWithNameSize("Lato", 16),
                contactButtonBorderWidth: 1.0,
                contactButtonCornerRadius: 4.0
            } 
            */
        },
        ZDKSupportTableViewCell: {
            viewBackgroundColor: white,
            titleLabelBackground: white,
            titleLabelColor: purple,
            //titleLabelFont: lato
        },
        ZDKSupportArticleTableViewCell: {
            /*
            viewBackgroundColor: "#E0E0E0",
            parentsLabelColor: "#E0E0E0",
            parnetsLabelBackground: "#E0E0E0",
            titleLabelColor: "#E0E0E0",
            labelBackground: "#E0E0E0",
            titleLabelFont: lato,
            articleParentsLabelFont: lato
            */
        },
        ZDKSupportAttachmentCell: {
            /*
            backgroundColor: "#E0E0E0",
            titleLabelBackground: "#E0E0E0",
            titleLabelColor: "#E0E0E0",
            fileSizeLabelBackground: "#E0E0E0",
            fileSizeLabelColor: "#E0E0E0",
            titleLabelFont: lato,
            fileSizeLabelFont: lato
            */
            
        }
    };
}

function animateClick(view){
    return new Promise(function (resolve, reject) {
        view.animate({
            backgroundColor: new colorModule.Color("#e0e0e0"), 
            duration: 100,
            curve: "linear"
        }).then(function(args){
            view.animate({
                backgroundColor: new colorModule.Color("#ffffff"), 
                duration: 100,
                curve: "linear"
            }).then(function(args){
                return resolve();
            });
        });
    })
}

function setLabels(){  
    viewModel.MenuKB = helpers.getResource("MenuKB");
    viewModel.MenuResources = helpers.getResource("MenuResources");
    viewModel.MenuWebinars = helpers.getResource("MenuWebinars");
    viewModel.LatestNewsletter = helpers.getResource("LatestNewsletter");
    viewModel.ChangeLanguage = helpers.getResource("ChangeLanguage");
    viewModel.GettingStarted = helpers.getResource("FooterGettingStarted");
    viewModel.ContactUs = helpers.getResource("ContactUs");
    viewModel.language = cultureModel.current.language;
    viewModel.otherLanguage = cultureModel.other.language;
    viewModel.BrandPrefix = helpers.getResource("BrandPrefix").toUpperCase();
    viewModel.BrandPostfix = helpers.getResource("BrandPostfix").toUpperCase();
    viewModel.NCCMTLabel = helpers.getResource("NCCMTLabel");
}
