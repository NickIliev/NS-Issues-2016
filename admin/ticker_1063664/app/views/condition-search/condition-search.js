var Observable = require("data/observable").Observable;
var imageSource = require("image-source");

var View = require("~/common/view-base")
var navigation = require("~/components/navigation");
var tabViewUtil = require("~/components/tabview-util");

var ConditionSearchViewModel = require("./condition-search-view-model");

var view = new View();
view.viewModel = new ConditionSearchViewModel([]);

view.loaded = function(page) {
    var that = view;
    that.page = page;

    that.webView = that.page.getViewById("wvStaywell");

    tabViewUtil.selectTab(that.viewModel, that.page, 1);
};

view.onWebViewLoadFinished = function (args) {
    var that = view;
    if (args.error) {
        that.viewModel.showError(args.error.toString());
    }
    that.viewModel.set("isLoading", false);
};

view.onWebViewLoadStarted = function (args) {
    var webView = args.object;
    if (!args.error) {
        view.viewModel.set("isLoading", true);
        if(args.url.indexOf("device=staywellapp") <= -1) {
            webView.stopLoading(); // stops loading current URL
            if(args.url.indexOf("?") <= -1) {
                webView.url = args.url + "?device=staywellapp";
            }
            else {
                webView.url = args.url + "&device=staywellapp";
            }
        }
    }
};

// TODO: intercept back button?

module.exports = view;