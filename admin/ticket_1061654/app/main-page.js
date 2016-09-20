"use strict";
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    var listPickerOne = page.getViewById("lp-one");
    var listPickerTwo = page.getViewById("lp-two");
    listPickerOne.items = [1, 2, 3, 4, 5, 6];
    listPickerTwo.items = [1, 2, 3, 4, 5, 6];
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map