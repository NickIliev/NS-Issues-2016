import { EventData } from 'data/observable';
import { Page } from 'ui/page';

import { Button } from "ui/button";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;
  let btn = <Button>page.getViewById("btn");

  btn.on(Button.tapEvent, function (args: EventData) {
      // Do something
      for (var key in args) {
        if (args.hasOwnProperty(key)) {
          var element = args[key];

          console.log("key: " + key + " ------  element:" +element);
        }
      }
  });


}
