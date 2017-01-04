import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { Label } from "ui/label";
import { HelloWorldModel } from './main-view-model';
import { GestureEventData, GestureEventDataWithState, GestureTypes, TouchGestureEventData } from "ui/gestures";

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;
    
    var label = new Label();
    var observer = label.on(GestureTypes.touch, function (args: TouchGestureEventData) { 
        console.log("Tap state: " + args.action);
    });

    page.content = label;
}