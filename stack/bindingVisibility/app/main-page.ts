import { EventData, Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { Page } from "ui/page";
import { Image } from "ui/image";

class MenuItem extends Observable {
    private _name: string;
    private _visibility: boolean;
    
    constructor(name) {
        super();

        this._name = name;
        this._visibility = false;
    }
    
    get name(): string {
        return this._name;
    }
    set name(value: string) {
        this._name = value;
    }
    
    get visibility(): boolean {
        return this._visibility;
    }
    set visibility(value: boolean) {
        this._visibility = value;
        this.notifyPropertyChange("isVisible", value);
    }
}


var itemsObservableArray = new ObservableArray([
        new MenuItem("explore"),
        new MenuItem("community"),
        new MenuItem("profile"),
        new MenuItem("ranking"),
        new MenuItem("camera")
]);

var viewModel = new Observable({
    currentActive:"explore",
    menuItems: itemsObservableArray
});

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;

    itemsObservableArray.getItem(0).set("visibility", true);
    itemsObservableArray.getItem(1).set("visibility", true);
    itemsObservableArray.getItem(2).set("visibility", true);

    page.bindingContext = viewModel;
}
