import { EventData } from "data/observable";
import { Page } from "ui/page";
import { HelloWorldModel } from "./main-view-model";

import frameModule = require("ui/frame");

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = new HelloWorldModel();

    if (page.ios) {
        var controller = frameModule.topmost().ios.controller;
        var navigationBar = controller.navigationBar;
        navigationBar.barTintColor = UIColor.blueColor();
        navigationBar.translucent = true;
    }
}