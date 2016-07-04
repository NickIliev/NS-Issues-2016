import { EventData } from "data/observable";
import { Page } from "ui/page";

import frameModule = require("ui/frame");
var topmost;
// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;

    topmost = frameModule.topmost();
}

export function goToSubPage() { 
    topmost.navigate("sub-page");
};