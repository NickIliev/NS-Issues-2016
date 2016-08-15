import { EventData } from "data/observable";
import { Page } from "ui/page";

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
}