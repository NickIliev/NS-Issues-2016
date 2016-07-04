"use strict";
var observable_1 = require("data/observable");
var mainObservable = new observable_1.Observable({
    currentActive: "explore"
});
// Event handler for Page "navigatingTo" event attached in main-page.xml
function onLoaded(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = mainObservable;
}
exports.onLoaded = onLoaded;
function loadexplore(args) {
    loadSelection("explore");
    console.log(mainObservable.get("currentActive"));
}
exports.loadexplore = loadexplore;
function loadcommunity(args) {
    loadSelection("community");
    console.log(mainObservable.get("currentActive"));
}
exports.loadcommunity = loadcommunity;
function loadSelection(selection) {
    mainObservable.set("currentActive", selection);
}
//# sourceMappingURL=main-page.js.map