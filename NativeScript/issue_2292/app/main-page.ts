import { EventData } from "data/observable";
import { Page } from "ui/page";
import listPickerModule = require("ui/list-picker");

    var Frames = require('ui/frame');


// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    
    var listPicker = <listPickerModule.ListPicker>page.getViewById("picker");
    
    listPicker.items = ["one", "two", "three"];
    
    
    Frames.topmost().navigate('sub-page');
}

export function onTap() {


    Frames.topmost().navigate('sub-page');

}