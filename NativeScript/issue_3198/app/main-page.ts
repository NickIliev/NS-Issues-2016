import { EventData } from 'data/observable';
import { Page } from 'ui/page';

import * as dialogs from "ui/dialogs";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;
}

export function showDialog() {
var options = {
    title: "Race Selection",
    message: "Race Chosen: Elf",
    okButtonText: "OK"
};
dialogs.alert(options).then(() => {
    console.log("Race Chosen!");
});
}