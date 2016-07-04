import { EventData } from "data/observable";
import { Page } from "ui/page";
import { HelloWorldModel } from "./main-view-model";

import frameModule = require("ui/frame");

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = new HelloWorldModel();
}

export function onShareUrl(args:EventData) {
    console.log("onSHareUrl");
    frameModule.topmost().navigate("sub-page");
}

export function toggleFavorite(args:EventData) {
    console.log("toggleFavorite");
    frameModule.topmost().navigate("sub-page");
}