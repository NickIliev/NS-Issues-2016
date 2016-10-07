var schoolCalender = [
  {
    "name": "OCTOBER",
    "names": [
      {
        "date": "10-10-2016",
        "dayType": "Full Holiday",
        "desc": "Mahanavami",
        "monthName": "OCTOBER",
        "day": 10
      },
      {
        "date": "11-10-2016",
        "dayType": "Working Day",
        "desc": "",
        "monthName": "OCTOBER",
        "day": 11
      },
      {
        "date": "12-10-2016",
        "dayType": "Full Holiday",
        "desc": "Moharram",
        "monthName": "OCTOBER",
        "day": 12
      }
    ]
  },
  {
    "name": "DECEMBER",
    "names": [
      {
        "date": "13-12-2016",
        "dayType": "Partial Holiday",
        "desc": "Nabi Dinam",
        "monthName": "DECEMBER",
        "day": 13
      }
    ]
  }
];

import { EventData } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { Page } from "ui/page";

var observable_array_1 = require("data/observable-array");
export function onPageLoaded(args: EventData) {
    var page = <Page>args.object;
    
    var array = new ObservableArray(schoolCalender);
    var listView = page.getViewById('listview');

    page.bindingContext = { myItems: array };

}

export function listViewItemTap(args) {
    var itemIndex = args.index;
    var object = args.object;
    console.log(itemIndex);
}

export function test(args) {
    console.log(args.object.get('id'));
}

