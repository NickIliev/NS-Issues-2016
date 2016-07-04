import { EventData } from "data/observable";
import { Page } from "ui/page";

import { GridLayout } from "ui/layouts/grid-layout";
var blue;

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;

    blue = <GridLayout>page.getViewById("mr-blue");
}

export function onTap() {

    blue.android.bringToFront();
}