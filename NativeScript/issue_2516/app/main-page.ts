import { EventData } from "data/observable";
import { Page } from "ui/page";
import { HelloWorldModel } from "./main-view-model";

import connectivity = require("connectivity");

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = new HelloWorldModel();

    var connectionType = connectivity.getConnectionType();
    switch (connectionType) {
        case connectivity.connectionType.none:
            console.log("No connection");
            break;
        case connectivity.connectionType.wifi:
            console.log("WiFi connection");
            break;
        case connectivity.connectionType.mobile:
            console.log("Mobile connection");
            break;
    }
}