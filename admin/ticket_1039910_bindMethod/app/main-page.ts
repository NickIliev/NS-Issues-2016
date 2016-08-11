import { EventData, Observable } from "data/observable";
import { Page } from "ui/page";

var viewModel = new Observable();
viewModel.set("sliderFooter", "week2");

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = viewModel;
}

export function next(args) {
    viewModel.set("sliderFooter", "week300");
}