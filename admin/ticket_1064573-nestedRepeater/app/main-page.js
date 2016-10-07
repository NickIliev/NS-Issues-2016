"use strict";
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
var observable_array_2 = require("data/observable-array");
var observable_array_1 = require("data/observable-array");
function onPageLoaded(args) {
    var page = args.object;
    var array = new observable_array_2.ObservableArray(schoolCalender);
    var listView = page.getViewById('listview');
    page.bindingContext = { myItems: array };
}
exports.onPageLoaded = onPageLoaded;
function listViewItemTap(args) {
    var itemIndex = args.index;
    var object = args.object;
    console.log(itemIndex);
}
exports.listViewItemTap = listViewItemTap;
function test(args) {
    console.log(args.object.get('id'));
}
exports.test = test;
//# sourceMappingURL=main-page.js.map