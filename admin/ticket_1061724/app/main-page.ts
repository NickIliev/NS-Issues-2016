import { EventData } from "data/observable";
import { Page } from "ui/page";
import { HelloWorldModel } from "./main-view-model";

import frame = require("ui/frame");
import dialogs = require("ui/dialogs");

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = new HelloWorldModel();
}

export function onTap(args) {
    dialogs.alert({ title: 'Success', message: 'Success message...', okButtonText: 'Ok' }).then(function () {
        navigate("subpage", true);
    })


}

function navigate(page, clearHistory) {
    var location = 'components/' + page;
    var top = frame.topmost();
    
    var trans = 'slide';
    var clear = clearHistory == null || clearHistory == 'undefined' ? true : clearHistory;
    
    var options = {
        moduleName: location,
        animated: true,
        clearHistory: clear,
        transition: {
            name: trans
        }
    };
    
    top.navigate(options);
}