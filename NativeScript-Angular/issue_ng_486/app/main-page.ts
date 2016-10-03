import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { topmost } from "ui/frame";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;
}

export function goToSub() {
  var navigationEntry = {
      moduleName: "sub-page",
      clearHistory: true
  };
  topmost().navigate(navigationEntry);
}

export function goToThird() {
  var navigationEntry = {
      moduleName: "third-page",
      clearHistory: false
  };
  topmost().navigate(navigationEntry);
}