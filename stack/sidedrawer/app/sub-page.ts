import { EventData } from "data/observable";
import { Page } from "ui/page";

export function onLoaded(args: EventData) {
    // Get the event sender
    const page = <Page>args.object;

}