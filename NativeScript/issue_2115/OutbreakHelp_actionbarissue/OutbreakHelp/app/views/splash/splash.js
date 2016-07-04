'use strict';
var helpers = require('../../scripts/helper');
var gestures = require("ui/gestures");
var viewModel = require('./splash-view-model');
var appSettings = require("application-settings");
var http = require("http");
var frame = require("ui/frame");
var imageModule = require("ui/image");
var CultureModule = require('../../scripts/culture');
var canNav = false;
var page = null;
var connectivity = require("connectivity");
var currentMSTime = 0;
var interval = null;

//var monitor = global.monitor;

exports.navigatingTo = function (args) {
    page = args.object;
    page.bindingContext = viewModel;
        

    
    var cultureModel = new CultureModule();
    viewModel.set("isEnglish", cultureModel.current.language == "English" ? true : false);
    
    setLogoText();
}

exports.pageLoaded = function (args) {
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
        global.splashInterval = setInterval(function() {
            currentMSTime += 200;
            
            if(currentMSTime >= 3000){
                if(canNav){
                    navigateToHome();
                } 
            }
        }, 200);
         
        helpers.initLabels().then(function(args) {
            helpers.primeSiteData();
            canNav = true;
        }, function(e){
            //Do nothing
        });
        
        helpers.initNewsletters();
    }
} 

function navigateToHome(){
    clearInterval(global.splashInterval);

    frame.topmost().navigate({
        moduleName: "./views/home/home",
        animated: true,
        transition: {
            name: "fade",
            duration: 200,
            curve: "easeInOut"
        }
    });
}

function setLogoText(){
    var prefix = (viewModel.isEnglish) ? "Outbreak" : "Info";
    var postfix = (viewModel.isEnglish) ? "Help" : "ÉPIDÉMIE";

    viewModel.set("BrandPrefix", prefix.toUpperCase());
    viewModel.set("BrandPostfix", postfix.toUpperCase());
}