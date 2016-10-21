import { EventData, Observable } from 'data/observable';
import { Page } from 'ui/page';
import { TimePicker } from "ui/time-picker";

var vm = new Observable();
vm.set("hour", 9);
vm.set("minute", 25);

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;

  var tp = <TimePicker>page.getViewById("tp");  

  page.bindingContext = vm;
}