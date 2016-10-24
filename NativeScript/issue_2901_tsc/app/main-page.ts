import { EventData, Observable, PropertyChangeData } from 'data/observable';
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
  tp.on("propertyChangeEvent", function (args:PropertyChangeData) {
    console.log(args.eventName);
    console.log(args.object);
    console.log(args.propertyName);
    console.log(args.value);
  })

  page.bindingContext = vm;
}

export function onCheckChange(args:PropertyChangeData) {
    console.log(args.eventName);
    console.log(args.object);
    console.log(args.propertyName);
    console.log(args.value);
}