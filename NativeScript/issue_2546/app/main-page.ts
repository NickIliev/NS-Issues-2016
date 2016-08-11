import { EventData, Observable } from "data/observable";
import { Page } from "ui/page";

var vm = new Observable();

var europianCountries = ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
"Denmark", "Estonia", "Finland", "France","Germany", "Greece", "Hungary", "Ireland", "Italy", 
"Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands","Poland", "Portugal", "Romania", "Slovakia", 
"Slovenia","Spain", "Sweden", "United Kingdom"];

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;

    vm.set("source", europianCountries);

    page.bindingContext = vm;
}