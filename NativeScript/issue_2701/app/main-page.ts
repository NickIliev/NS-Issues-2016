import { EventData } from "data/observable";
import { Page } from "ui/page";

var http = require("http");

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;

    http.request({
        url: "https://httpbin.org/headers",
        method: "GET",
        headers: { "Content-Type": "application/json", "headerA": "value-111, value222" },
    }).then(function (response) {
        var result = response.content.toJSON();
        console.log(result["headers"].Headera);
    }, function (e) {
        console.log("Error occurred " + e);
    });

}