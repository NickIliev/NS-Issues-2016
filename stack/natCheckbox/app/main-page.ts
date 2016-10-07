import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { CheckBox } from 'nativescript-checkbox';
import { topmost } from 'ui/frame';

let page;

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function pageLoaded(args: EventData) {
  // Get the event sender
  page = <Page>args.object;
}
 
export function toggleCheck() {
  let checkBox = <CheckBox>page.getViewById('myCheckbox');
  checkBox.toggle();
}
 
export function getCheckProp() {
  let checkBox = <CheckBox>page.getViewById('myCheckbox');
  console.log('checked prop value = ' + checkBox.checked);
}