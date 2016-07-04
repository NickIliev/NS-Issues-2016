import { EventData } from "data/observable";
import { Page } from "ui/page";
import { Observable } from "data/observable";


// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    
    page.actionBarHidden = true;
    page.addCss("Page {background-color: black;}");
    
    // console.log(page.backgroundSpanUnderStatusBar);
    // console.log(page.actionBarHidden);
    // console.log(page.css);
    // console.log(page.navigationContext);
    // console.log(page.frame);
    // console.log(page.actionBar);
    // console.log(page.modal);
    
    var data = new Observable();

    var object = { id: 1, title: "Test" };
    
    data.set('myObject', object);
    console.log(data.get("myObject")); // { id: 1, title: "Test" }
    
    var object2 = { id: 100, title: "NEWW" };
    data = new Observable(object2);
    
    console.log(data.get("myObject")); // undefined
    console.log(data.get("id")); // 100
    console.log(data.get("title")); // NEWW
}