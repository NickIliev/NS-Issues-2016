'use strict';
var frame = require('ui/frame');
var http = require("http");
var appSettings = require("application-settings");
var googleAnalytics = require("nativescript-google-analytics");
var app = require("application");
var CultureModule = require('./culture');
var globalLabels = [];

exports.back = function() {
    frame.topmost().goBack();
}

exports.navigate = function(location) {
    frame.topmost().navigate(location);
}

exports.styleActionBar = function(){
    if (app.ios) {
        var navigationBar = frame.topmost().ios.controller.navigationBar;;
        navigationBar.barStyle = 1;
        navigationBar.translucent = false;
        navigationBar.tintColor = UIColor.whiteColor();
    }else{
        frame.topmost().android.cachePagesOnNavigate = true;
    }
}

exports.styleModalActionBar = function(){
    if (app.ios) {
        var navigationBar = frame.topmost().ios.controller.navigationBar;
        navigationBar.barStyle = 1;
        navigationBar.translucent = false;
        navigationBar.tintColor = UIColor.whiteColor();
    }
}


exports.getResource = function(key){
    try{
        var cultureModel = new CultureModule();
        var locale = cultureModel.current.locale; 
        var label = appSettings.getString("label-" + key);
        var data = JSON.parse(label);
        
        if(data != null){
            if(locale == "en-us"){
                return data.EN;
            }else{
                return data.FR;
            }
        }else{
            return "Not found";
        }
    } catch (err){
        return "undefined";
    }
} 

exports.getResourceFavorites = function(){
    var favsSetting = "favoriteResources";
    
    if(!appSettings.hasKey(favsSetting)){
         appSettings.setString(favsSetting, JSON.stringify([]));
    }
    
    return JSON.parse(appSettings.getString(favsSetting)); //get saved terms
}

exports.logScreenView = function(name){
    googleAnalytics.logView(name);
}

exports.logEvent = function(category, action, label, value){
    googleAnalytics.logEvent(
    {
      category: category,
      action: action,
      label: label,
      value: value
    });
}

exports.fixhtmlViewFonts = function(page, viewId){
    if(app.ios){
        var LabelModule = require("ui/label");
        var label = new LabelModule.Label();
        label.text = "Dummy Value";

        var fontName = label.ios.font.familyName;
        var fontSize = 16;

        var view = page.getViewById(viewId);
        if(view != undefined){
            view.ios.font = UIFont.fontWithNameSize(fontName,fontSize);
        }
    } 
}

exports.toIcon = function(value){
    switch(value.toLowerCase()) {
        case "article":
            return "\uf0f6";
        case "book":
        case "livre":
            return "\uf02d";
        case "guidance":
        case "directives":
            return "\uf0b1";
        case "implementation tools":
        case "outils de mise en œuvre":
            return "\uf046";
        case "news":
        case "actualités":
            return "\uf1ea";
        case "website":
        case "site web":
            return "\uf0ac";
        case "multimedia tools":
        case "outils multimédias":
            return "\uf108";
        default:
            return "\uf03e";
    }
}

/*
exports.styleActionBar = function() {
	var topmost = frame.topmost();
	if (topmost.ios) {
		var navigationBar = topmost.ios.controller.navigationBar;
		// Make the iOS status bar use white text
		navigationBar.barStyle = 1;
	}
};
*/

exports.hideiOSBackButton = function() {
	var topmost = frame.topmost();
	if (topmost.ios) {
		// Hide the Back arrow
		var controller = topmost.ios.controller;
		controller.visibleViewController.navigationItem.setHidesBackButtonAnimated(true, false);
	}
};

exports.initLabels = function(){
    return new Promise(function (resolve, reject) {
        //Get Labels
        http.getJSON("https://www.outbreakhelp.ca/RestApi/app/labels?format=json").then(function (labels) {
            labels.forEach(function(label){
                //Add the labels
                var key = "label-" + label.Key;
                appSettings.setString(key, JSON.stringify(label));
                globalLabels.push(key);
            });
            
            appSettings.setString("globalLabels", JSON.stringify(globalLabels));
            
            resolve(globalLabels);
        }, function (e) {
            reject();
        });
    });
}

exports.initNewsletters = function(){
    return new Promise(function (resolve, reject) {
        //Get NewsletterLinks
        http.getJSON("https://www.outbreakhelp.ca/RestApi/app/newsletter?format=json").then(function (data) {
            appSettings.setString("NewsletterLinks", JSON.stringify(data));
            resolve(data);
        }, function (e) {
            reject();
        });
    });
}

exports.initTaxa = function () {
    return new Promise(function (resolve, reject) {
        var cultureModel = new CultureModule();
        var locale = cultureModel.current.locale; 
        
        //Get Taxa
        http.getJSON("https://www.outbreakhelp.ca/RestApi/app/taxa?format=json&locale=" + locale).then(function(data) {
            resolve(data);     
        }, function(e) {
            reject();
        });  
    });
}

exports.primeSiteData = function(){
    return new Promise(function (resolve, reject) {
        try{
            //Tell the site to preload the data
            http.request({ url: "https://www.outbreakhelp.ca/RestApi/app/resources/prime", 
                        method: "GET",
                        timeout: 1500
                            }).then(function (response) {
                //Do nothing
                resolve();
            }, function (e) {
                //Do nothing
                reject();
            });
        }catch(ex){
            reject(ex);
        }
    });
}

exports.setListViewNoSelect = function(args){
    if (frame.topmost().ios) {
        var cell = args.ios;
        cell.selectionStyle = UITableViewCellSelectionStyle.UITableViewCellSelectionStyleNone;
    }
}