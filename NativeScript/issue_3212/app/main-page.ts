import { EventData } from 'data/observable';
import { Page } from 'ui/page';

import * as appSettings from "application-settings";
import { alert }from "ui/dialogs";

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
    appSettings.setBoolean("switched", false);
}

export function save() {
    appSettings.setBoolean("switched", true);
}

export function getValue() {
    var options = {
        title: "", 
        message: appSettings.getBoolean("switched").toString(), 
        okButtonText: "OK"
    }
    alert(options).then(() => {});
}

export function reset() {
    appSettings.setBoolean("switched", false);
}