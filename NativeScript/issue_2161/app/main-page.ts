import { EventData } from "data/observable";
import { Page } from "ui/page";
import { AbsoluteLayout } from "ui/layouts/absolute-layout";

var rootpage;
var moveable;

export function pageloaded(args) {
    rootpage = args.object;
    moveable = <AbsoluteLayout>rootpage.getViewById('moveable');
    console.log("on load X: " + moveable.originX);
    console.log("on load Y: " + moveable.originY);
}

export function click(args) {
    console.log("on click X: " + moveable.originX);
    console.log("on click Y: " + moveable.originY);
    
    moveable.translateX = -50;
    moveable.translateY = -50;
    moveable.animate({
        translate: { x: 0, y: 0 }, 
        duration: 200,
        delay: 1000
    });
}