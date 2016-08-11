"use strict";
var observable_1 = require("data/observable");
var vm = new observable_1.Observable();
var europianCountries = ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
    "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy",
    "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia",
    "Slovenia", "Spain", "Sweden", "United Kingdom"];
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    vm.set("source", europianCountries);
    page.bindingContext = vm;
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map