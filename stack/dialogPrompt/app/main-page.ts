import { EventData, Observable } from "data/observable";
import { Page } from "ui/page";
// import { MyViewModel } from "./main-view-model";

import dialogModule = require("ui/dialogs");

var viewModel = new MyViewModel();
viewModel.pendingConnections = [{PatientFirstName:"John"}, {PatientFirstName:"Merry"}, {PatientFirstName:"Abygeil"}];

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;

    page.bindingContext = viewModel;

    for (var index = viewModel.pendingConnections.length - 1; index >= 0; index--) {
        connectionDealer(index);
    }
}

function connectionDealer(index) {

    var pendingConnection = viewModel.pendingConnections[index];

    dialogModule.confirm({
        message: pendingConnection["PatientFirstName"] + " would like to share their glucose readings with you.",
        okButtonText:"Accept",
        cancelButtonText:"Reject"                                    
    }).then(function(result) {
        if(result === true) {
            // your code follow.. pass pendingConnection[index] to your method
            console.log("accepted by " + pendingConnection["PatientFirstName"]);
        } else {
            // your code follow.. pass pendingConnection[index] to your method
            console.log("Rejected by " + pendingConnection["PatientFirstName"]);
        }            
    });
}


export class MyViewModel extends Observable {

    private _pendingConnections: Array<Object>;

    get pendingConnections(): Array<Object> {
        return this._pendingConnections;
    }
    set pendingConnections(value: Array<Object>) {
        if (this._pendingConnections !== value) {
            this._pendingConnections = value;
        }
    }
}