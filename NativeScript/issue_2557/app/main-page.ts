import { EventData, Observable } from "data/observable";
import { Page } from "ui/page";

import { PanGestureEventData } from "ui/gestures";
import { WebView, LoadEventData } from "ui/web-view";


// Event handler for Page "navigatingTo" event attached in main-page.xml
export function onLoaded(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    var webView = <WebView>page.getViewById('webview');

    webView.on("pan", (args: PanGestureEventData) => {
        if (args.deltaY < -10) {
            console.log(args.deltaY);
        } else if (args.deltaY > 0) {
            console.log(args.deltaY);
        }
    })
}