import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import { TabView, SelectedIndexChangedEventData } from "ui/tab-view"; 

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;
  page.bindingContext = new HelloWorldModel();

  var tabView = <TabView>page.getViewById('tabs')

  tabView.on(TabView.selectedIndexChangedEvent, (args: SelectedIndexChangedEventData) => {
      switch (args.newIndex) {
          case 0:
              page.bindingContext = {};
              console.log("tapped 1");
              break;
          case 1:
              page.bindingContext = {};
              console.log("tapped 2");
              break;
      }
  })
}