import { EventData } from 'data/observable';
import { Page } from 'ui/page';

import { AnimationCurve } from "ui/enums";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;

  var header = page.getViewById("header");

  var start = 0;

  header.animate({
      translate: { x: -(header.marginLeft + start), y: 0},
      curve: AnimationCurve.easeOut
  }).then(() => {
      header.translateX = 0;
      header.marginLeft = -start;
  });
}