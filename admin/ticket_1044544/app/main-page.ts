import { EventData } from "data/observable";
import { Page } from "ui/page";
import { HelloWorldModel } from "./main-view-model";

import { Progress } from "ui/progress";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = new HelloWorldModel();
    
    var progressBar = <Progress>page.getViewById("myProgress");
    
    progressBar.android.getLayoutParams().height = 50;
    progressBar.android.invalidate();
}