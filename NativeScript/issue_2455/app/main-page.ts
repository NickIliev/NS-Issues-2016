import { EventData } from "data/observable";
import { Page } from "ui/page";
import { Button } from "ui/button";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    var btn = <Button>page.getViewById("btn");

    btn.text = "0000123456"; // this works
}