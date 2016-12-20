import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import * as dialogs from "ui/dialogs";

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
}

export function onTap() {
    var options = {
        title: "Race Selection",
        message: "Race Chosen: Elf",
        okButtonText: "OK"
    };
    dialogs.alert(options).then(() => {
        console.log("Race Chosen!");
    });
}