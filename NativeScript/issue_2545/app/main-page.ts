import { EventData, Observable, PropertyChangeData } from "data/observable";
import { Page } from "ui/page";
import { TextField } from "ui/text-field"; 
import { Label } from "ui/label";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    var textField = <TextField>page.getViewById("tf");
    var label = <Label>page.getViewById("lb");
    var observable = new Observable();
    observable.set("text", "");
    observable.set("labeltext", "Sample label text");

    textField.on(Observable.propertyChangeEvent, function (event:PropertyChangeData) {

        observable.set("labeltext", event.value);

    });

    

    page.bindingContext = observable;
}