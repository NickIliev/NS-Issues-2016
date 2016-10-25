"use strict";
var observable_1 = require("data/observable");
var page;
var tempSessions = [
    {
        id: '0',
        title: "Stuff"
    },
    {
        id: '1',
        title: "Stuffly"
    },
    {
        id: '2',
        title: "Stufferrs"
    },
    {
        id: '3',
        title: "Event 4"
    }
];
function pageLoaded(args) {
    console.log(JSON.stringify(tempSessions));
    page = args.object;
    page.bindingContext = new observable_1.Observable({
        sessions: tempSessions
    });
}
exports.pageLoaded = pageLoaded;
//# sourceMappingURL=main-page.js.map