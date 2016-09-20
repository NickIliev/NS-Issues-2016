"use strict";
var observable_1 = require('data/observable');
// Event handler for Page "navigatingTo" event attached in main-page.xml
function onPageLoaded(args) {
    // Get the event sender
    var page = args.object;
    var vm = new observable_1.Observable();
    vm.set("color", "red");
    vm.set("name", "Anakin");
    page.bindingContext = vm;
}
exports.onPageLoaded = onPageLoaded;
//# sourceMappingURL=main-page.js.map