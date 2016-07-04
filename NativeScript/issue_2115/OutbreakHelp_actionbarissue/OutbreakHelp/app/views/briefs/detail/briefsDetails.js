var application = require("application");
var util = require("utils/utils");
var appModule = require("application");
var frames = require("ui/frame");
var helpers = require('../../../scripts/helper');
var viewModel = require('./briefsDetails-Model');
//var monitor = global.monitor;
var page = null;

exports.navigatingTo = function (args) {
    page = args.object;
    helpers.styleActionBar();
    
    viewModel.set("brief", page.navigationContext);
    viewModel.set("pageTitle", helpers.getResource("MenuKB"));
    //monitor.trackFeature('briefs.Detail.Initalized');
    page.bindingContext = viewModel;
    createBindingFunctions();
    fixHtmlViews();
    setLabels();
    helpers.logScreenView("Evidence Briefs Detail - " + viewModel.brief.Title);
};

exports.navigatedFrom = function (args) {
    //TODO: Wipe data
};

exports.onNavigateBack = function(args){
    //monitor.trackFeature('briefs.Detail.GoBack');
    frames.topmost().goBack();
}

exports.onRelatedResourceItemTap = function (args) {
    var itemData = viewModel.brief.RelatedResources[args.index];
    
    helpers.navigate({
        moduleName: "views/resources/detail/resourceDetail",
        context: itemData.Id
    });
}; 

exports.onListViewLoadingFixSelectState = function (args) {
    helpers.setListViewNoSelect(args);
}

function setLabels(){
    viewModel.General = helpers.getResource("FilterGeneral");
    viewModel.Related = helpers.getResource("Related");
}

function fixHtmlViews(){
    helpers.fixhtmlViewFonts(page, "IssueAndResearchQuestion");
    helpers.fixhtmlViewFonts(page, "SummaryOfRecommendations");
    helpers.fixhtmlViewFonts(page, "TargetUser");
    helpers.fixhtmlViewFonts(page, "TypeAndQualityOfEvidence");
    helpers.fixhtmlViewFonts(page, "MainFindings");
    helpers.fixhtmlViewFonts(page, "RecommendationsForFutureResearch");
}

function createBindingFunctions(){
   var toIcon = {
        toView: function (value) {
            return helpers.toIcon(value);
        }
    }
    
    appModule.resources["toIcon"] = toIcon;
}
