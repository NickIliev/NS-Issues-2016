import { EventData } from "data/observable";
import { Page } from "ui/page";
import listPickerModule = require("ui/list-picker");

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    var listPickerOne = <listPickerModule.ListPicker>page.getViewById("lp-one");
    var listPickerTwo = <listPickerModule.ListPicker>page.getViewById("lp-two");

    listPickerOne.items = [1, 2, 3, 4, 5, 6];
    listPickerTwo.items = [1, 2, 3, 4, 5, 6];
    
}