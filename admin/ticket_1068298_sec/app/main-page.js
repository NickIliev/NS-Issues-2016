var vmModule = require("./main-view-model");
// var webViewModule = require("ui/web-view");
// var webView = new webViewModule.WebView();

function pageLoaded(args) {
    var page = args.object;
    // var myWebView = page.getViewById("my-web-view");
// myWebView.getViewById().setPluginsEnabled(true);
    page.bindingContext = vmModule.mainViewModel;
}
exports.pageLoaded = pageLoaded;