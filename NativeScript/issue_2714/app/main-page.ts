import { EventData } from "data/observable";
import { Page } from "ui/page";
import { HelloWorldModel } from "./main-view-model";
var http = require("http");

import { WebView } from "ui/web-view";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = new HelloWorldModel();

    // http.getJSON("https://httpbin.org/user-agent").then(function (res) {
    //     //// Argument (r) is JSON!
    //     console.log(res["user-agent"]);

    // }, function (e) {
    //     //// Argument (e) is Error!
    //     //console.log(e);
    // });

    var webView = UIWebView.alloc().initWithFrame(CGRectZero);
    var userAgentString = webView.stringByEvaluatingJavaScriptFromString("@navigator.userAgent");
    console.log(userAgentString);

    var wv = new WebView();
    var ua = wv.ios.stringByEvaluatingJavaScriptFromString("@navigator.userAgent");
    console.log(ua)

    http.request({
        url: "https://httpbin.org/user-agent",
        method: "GET",
        headers: { "Content-Type": "application/json", "User-Agent": "My-Custom-User-Agent" },
        content: JSON.stringify({ MyVariableOne: "ValueOne", MyVariableTwo: "ValueTwo" })
    }).then(function (response) {
        var result = response.content.toJSON();
        console.log(result["user-agent"]);
    }, function (e) {
        // console.log("Error occurred " + e);
    });    
}