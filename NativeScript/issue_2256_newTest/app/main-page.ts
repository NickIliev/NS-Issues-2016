import { EventData } from "data/observable";
import { Page } from "ui/page";
import { Observable } from "data/observable";

const context = new Observable();
const values = ["--i--", "-i---", "-i-"];
var count = 0;

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = context;
    change();
}

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function change() {
    context.set("text", values[count++ % 3]);
}