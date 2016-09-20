import observable = require("data/observable");
import { ObservableArray } from "data/observable-array";
import listViewModule = require("nativescript-telerik-ui-pro/listview");
import timer = require("timer");

export class HelloWorldModel extends observable.Observable {

    private _items: ObservableArray<any>;
    private _numberOfAddedItems;
    
    constructor() {
        super();

        this.initItems();
    }

    get items() {
        return this._items;
    }

    private initItems() {
        this._items = new ObservableArray<any>();
    }

    public pullToRefreshInitiated(args: listViewModule.ListViewEventData) {
        var that = new WeakRef(this);
        // the timer is not mandatory but just for demonstration purposes to delay the activity indicator
        // timer.setTimeout(function() {
            var newItemsToAddArray = [
                {description: "ddd"},
                {description: "eee"},
                {description: "fff"},
            ];

            for (var index = 0; index < newItemsToAddArray.length; index++) {
                that.get()._items.push(newItemsToAddArray[index]);   
            }

            that.get()._numberOfAddedItems++;

            var listView = args.object;
            listView.notifyPullToRefreshFinished();
        // }, 1000);
    }

    private initDataItems() {
        this._items = new ObservableArray<any>();
        this._numberOfAddedItems = 0;

        this._numberOfAddedItems++;
    }
}