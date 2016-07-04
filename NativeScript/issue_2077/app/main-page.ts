import { EventData } from "data/observable";
import { Page } from "ui/page";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function onLoaded(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    
    let background = page.getViewById("background");
    console.log("Starting...");
    background.animate({
      scale: { x: 1.2, y: 1.2 },
      duration: 4000
    }).then(function() {
      console.log("  DONE!");
    });
}