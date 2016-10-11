import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;
  page.bindingContext = new HelloWorldModel();

  fetch("http://10.0.2.2/api").then(response => { return response.text(); })
    .then(function (r) {
        console.log(r);
    }, function (e) {
        console.log(e);
    });
}