import { EventData, Observable } from "data/observable";
import { Page } from "ui/page";
import frameModule = require("ui/frame");

var topmost;
var context = new Observable();

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    topmost = frameModule.topmost();
}

export function onTap(args: EventData) {
    
    var navigationEntry = {
        moduleName: "sub-page",
        context: context,
        clearHistory: true,
        transitioniOS: {
            name: "slideRight"
        },
        transitionAndroid: {
            name: "slideRight"
        }
    };
    
    topmost.navigate(navigationEntry);
}