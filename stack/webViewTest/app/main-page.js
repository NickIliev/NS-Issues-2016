"use strict";
var main_view_model_1 = require("./main-view-model");
var webViewInterfaceModule = require('nativescript-webview-interface');
var oWebViewInterface;
var page;
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
    setupWebViewInterface(page);
}
exports.navigatingTo = navigatingTo;
function setupWebViewInterface(page) {
    var webView = page.getViewById('webView');
    oWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView);
}
//# sourceMappingURL=main-page.js.map