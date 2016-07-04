import { EventData } from "data/observable";
import { Page } from "ui/page";

import httpModule = require("http");

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    
    page.actionBar.title = "Different TITLE";
}

export function onTap(args:EventData) {
    httpModule.request({
        url: "https://httpbin.org/post",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        content: JSON.stringify({ MyVariableOne: "ValueOne", MyVariableTwo: "ValueTwo" })
    }).then(function (response) {
        // Success
        var result = response.content.toJSON();
        
        console.log(result);
        
    }, function (e) {
        // error occur
        console.log("Error occurred " + e);
    });
}