import { EventData } from "data/observable";
import { Page } from "ui/page";

import timePickerModule = require("ui/time-picker");
import app = require("application");

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    
    // <timePickerModule.TimePicker>page.getViewById("time");
    var timePicker = new android.widget.TimePicker(app.android.context)
    
    console.log(timePicker);
    
    timePicker.setCurrentMinute(new java.lang.Integer(15));
    

}