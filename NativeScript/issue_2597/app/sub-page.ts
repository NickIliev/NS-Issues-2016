import { EventData } from "data/observable";
import { Page } from "ui/page";
import { topmost } from "ui/frame";

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
}

export function onTap(args: EventData) {
    topmost().navigate({
        moduleName: "main-page",
        animated: false
    });
}