import { EventData } from "data/observable";
import { Page } from "ui/page";

var stackModule = require("ui/layouts/stack-layout");
var gestures = require("ui/gestures");

var frameModule = require("ui/frame");

export function onLoaded(args: EventData) {
    // Get the event sender
    const page = <Page>args.object;
    
    var myStack = page.getViewById("swipable");
    
    myStack.on(gestures.GestureTypes.swipe, function (args) {
        frameModule.topmost().navigate({
            moduleName: "sub-page"
        })
    });
}