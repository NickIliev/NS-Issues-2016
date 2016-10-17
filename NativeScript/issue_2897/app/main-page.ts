import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { TabView, TabViewItem, SelectedIndexChangedEventData } from "ui/tab-view";
import * as application from "application";


// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;
    //tabViewID Change your tabview id.
  var tabView = <TabView>page.getViewById("tabViewID");

  tabView.on(TabView.selectedIndexChangedEvent, (args: SelectedIndexChangedEventData) => {
      var actualOldIndex = args.oldIndex;
      var actualNewIndex = args.newIndex;

      var previousTab = <TabViewItem>tabView.items[actualOldIndex];
      var selectedTab = <TabViewItem>tabView.items[actualNewIndex];

      selectedTab.view.android.setAllCaps(false);
  });
}