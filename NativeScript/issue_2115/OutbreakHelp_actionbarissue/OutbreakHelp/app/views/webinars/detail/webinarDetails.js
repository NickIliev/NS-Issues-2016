var application = require("application");
var util = require("utils/utils");
var frames = require("ui/frame");
var socialShare = require("nativescript-social-share");
var helpers = require('../../../scripts/helper');
var viewModel = require('./webinarDetails-Model');
//var monitor = global.monitor;
var page = null;

exports.navigatingTo = function (args) {
    page = args.object;
    helpers.styleActionBar();

    viewModel.set("pageTitle", viewModel.webinar.Title);
    viewModel.set("webinar", page.navigationContext);
    //monitor.trackFeature('Webinars.Detail.Initalized');
    page.bindingContext = viewModel;
    
    helpers.fixhtmlViewFonts(page, "summaryHtmlView");
    helpers.fixhtmlViewFonts(page, "descriptionHtmlView");
    helpers.logScreenView("Webinars Detail - " + viewModel.webinar.Title);
    
    setLabels();
    
};

exports.navigatedFrom = function (args) {
    //TODO: Wipe data
};

exports.onDownloadFileTap = function(args){
    var webinar = args.object.bindingContext;
    var link = webinar.Url;
    
    helpers.logEvent("Webinar Detail", "Download File", link);
    
    util.openUrl(link);
}

exports.onShareUrl = function(args){
    var link = page.bindingContext.webinar.Link;
    
    helpers.logEvent("Webinar Detail", "Share Url", link);
    
    socialShare.shareText(link);
}


exports.onOpenLink = function(args){
    var link = page.bindingContext.webinar.Link;
    
    helpers.logEvent("Webinar Detail", "Open Url", link);
    
    alert(helpers.getResource("WebinarDisclaimer")).then(function () {
        util.openUrl(link);
    })
}

exports.onNavigateBack = function(args){
    //monitor.trackFeature('Webinars.Detail.GoBack');
    frames.topmost().goBack();
}

function setLabels(){
    viewModel.pageTitle = helpers.getResource("MenuWebinars");
    viewModel.viewButton = helpers.getResource("WebinarViewButton").toUpperCase();
}

