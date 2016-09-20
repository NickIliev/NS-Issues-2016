import { EventData, Observable } from "data/observable";
import { Page } from "ui/page";
import { TabView, SelectedIndexChangedEventData } from 'ui/tab-view'; 

let viewModel = new Observable();
viewModel.set("selIndex", 0);

const THIS_TAB_IDX: number = 0; 
var isThisTabSelected: boolean = false;


// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    var tab = <TabView>page.getViewById("tabViewContainer");

    isThisTabSelected = tab.selectedIndex === THIS_TAB_IDX;

    tab.on(TabView.selectedIndexChangedEvent, function(args: SelectedIndexChangedEventData) {
        isThisTabSelected = args.newIndex === THIS_TAB_IDX;
    })

    page.bindingContext = viewModel;
}