
import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { ViewModel } from "./main-view-model";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {

    let page = <Page>args.object;
    page.bindingContext = new ViewModel();
}

export function onItemTap() {
    console.log("onItemTap");
}

export function onTap() {
    console.log("onTap");
}