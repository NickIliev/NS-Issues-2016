import { EventData } from 'data/observable';
import { Page } from 'ui/page';

var frameModule = require("ui/frame"); 

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;

  frameModule.topmost().ios.controller.navigationBar.translucent = false;
}

export function onTap() {
  frameModule.topmost().navigate({
    moduleName: "sub-page",
    // animated: true, // solution for the buggy transition when translucent set to false
    // transition: {
    //   name: "curl" 
    // }
  });
}