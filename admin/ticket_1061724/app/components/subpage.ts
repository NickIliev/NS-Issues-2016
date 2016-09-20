import { EventData } from "data/observable";
import { Page } from "ui/page";

import frame = require("ui/frame");

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function onPageLoaded(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
}
