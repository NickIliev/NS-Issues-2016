import observable = require("data/observable");
import { ObservableArray } from "data/observable-array";

export class HelloWorldModel extends observable.Observable {

    get items(): ObservableArray<any> {

        var arr = new ObservableArray();
        arr.push({"first_name": "item 1"});
        arr.push({"first_name": "item 2"});
        arr.push({"first_name": "item 3"});
        arr.push({"first_name": "item 4"});

        return arr;
    }

}