import { EventData, Observable, PropertyChangeData } from "data/observable";
import { Page } from "ui/page";

var mainObservable = new Observable({
    currentActive:"explore"
});

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function onLoaded(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = mainObservable;
}

export function loadexplore(args: PropertyChangeData){
    loadSelection("explore");
    console.log(mainObservable.get("currentActive"));
}

export function loadcommunity(args: PropertyChangeData){
    loadSelection("community");
    console.log(mainObservable.get("currentActive"));
}

function loadSelection(selection) {
    mainObservable.set("currentActive", selection);
}