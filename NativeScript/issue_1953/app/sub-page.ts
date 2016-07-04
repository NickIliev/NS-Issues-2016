import { EventData } from "data/observable";
import { Page } from "ui/page";

var frameModule = require('ui/frame');

let topmost;

export function onLoaded(args: EventData) {
    var page = <Page>args.object;
    topmost = frameModule.topmost();
}
