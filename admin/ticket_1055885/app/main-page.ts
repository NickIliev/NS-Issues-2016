import { Observable, EventData } from "data/observable";
import { Page } from "ui/page";
import { TabView } from "ui/tab-view";
 
var viewModel = new Observable();;
var tab;

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
 
    tab = <TabView>page.getViewById("tabViewContainer");

    viewModel.set("isShown", false);
    page.bindingContext = viewModel;
}
 
export function toggleVisibility() {
    if (viewModel.get("isShown")) {
        viewModel.set("isShown", false);
    } else {
        viewModel.set("isShown", true);
    }
}