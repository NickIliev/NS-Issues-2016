import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { ViewModel } from './main-view-model';
import * as RadListwModule from "nativescript-telerik-ui/listview";
import * as application from "application";
import * as frame from "ui/frame";

var list;
let vm = new ViewModel();
vm.set("cachedIndex", 0);

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;
  page.bindingContext = vm;
}

export function onListLoaded(args: RadListwModule.ListViewEventData) {
    list = <RadListwModule.RadListView>args.object;

    if (list.items) {
        list.scrollToIndex(vm.get("cachedIndex"));
    }

    list.refresh();
}

export function onItemSelected(args: RadListwModule.ListViewEventData) {
  console.log(args.itemIndex);
}


export function onItemTap(args:RadListwModule.ListViewEventData) {
    var tappedItemIndex = args.itemIndex;
    vm.set("cachedIndex", tappedItemIndex);

    var tappedItem = vm.get("dataItems").getItem(tappedItemIndex);

    var navEntry = {
        moduleName: "details-page",
        context: {"tappedItem": tappedItem },
        animated: true,
        transition: {
            name: application.android ? "explode" : "curl"
        }
    };

    frame.topmost().navigate(navEntry);
}