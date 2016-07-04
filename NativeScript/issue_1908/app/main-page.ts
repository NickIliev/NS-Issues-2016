import { EventData } from "data/observable";
import { Page } from "ui/page";

import frameModule = require("ui/frame");
var topmost;

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function onLoaded(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    topmost = frameModule.topmost();
    console.log(topmost);
}

export function goToNextPage(args: EventData) {
    topmost.navigate("./sub-page");
}