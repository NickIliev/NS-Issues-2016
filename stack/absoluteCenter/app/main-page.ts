import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import { CustomRepeater } from "./my_repeater"

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;

  var cust = <CustomRepeater>page.getViewById("cust");
  cust.itemTemplate = '<Label text="{{ $value }}" backgroundColor="red" textWrap="true" />';
  
  page.bindingContext = new HelloWorldModel();
}