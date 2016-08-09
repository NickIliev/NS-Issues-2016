import { EventData } from "data/observable";
import { Page } from "ui/page";
import { Button } from "ui/button";

import { GestureTypes, PanGestureEventData } from "ui/gestures";

var item;
let prevDeltaX: number;
let prevDeltaY: number;

export function onLoaded(args: EventData) {
    var page = <Page>args.object;
    item = <Button>page.getViewById("btn");

    item.translateX = 0;
    item.translateY = 0;
    item.scaleX = 1;
    item.scaleY = 1
}

export function onPan(args: PanGestureEventData) {

    if (args.state === 1) {
        prevDeltaX = 0;
        prevDeltaY = 0;
    } else if (args.state === 2) {
        item.translateX += args.deltaX - prevDeltaX;
        item.translateY += args.deltaY - prevDeltaY;

        prevDeltaX = args.deltaX;
        prevDeltaY = args.deltaY;
    }
}