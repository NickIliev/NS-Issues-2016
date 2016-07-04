// backstackVisible = false not working on Android with physical back button #1953

import { EventData } from "data/observable";
import { Page } from "ui/page";

var frameModule = require( 'ui/frame');

let topmost;

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
    topmost = frameModule.topmost()
}

export function onTap(args: EventData) {
    var navigationEntry = {
        moduleName: "sub-page",
        backstackVisible: false
    };
    topmost.navigate(navigationEntry);
}