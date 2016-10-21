"use strict";
var observable_1 = require('data/observable');
var vm = new observable_1.Observable();
vm.set("hour", 9);
vm.set("minute", 25);
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    var tp = page.getViewById("tp");
    page.bindingContext = vm;
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map