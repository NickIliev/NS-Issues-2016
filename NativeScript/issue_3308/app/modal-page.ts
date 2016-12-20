var context: any;
var closeCallback: Function;

import * as page from "ui/page";
import { topmost } from "ui/frame";
import { EventData } from "data/observable";

export function onShownModally(args: page.ShownModallyData) {
    context = args.context;
    closeCallback = args.closeCallback;
}

export function onLoaded(args: EventData) {
    let page = args.object;

    console.log(page);
}

export function onSetReturnPage() {
    topmost().navigate({
        moduleName: "third-page",
    });
}

export function onCloseModal() {
    closeCallback();
}