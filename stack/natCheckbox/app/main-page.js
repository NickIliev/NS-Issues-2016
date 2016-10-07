"use strict";
var page;
// Event handler for Page "navigatingTo" event attached in main-page.xml
function pageLoaded(args) {
    // Get the event sender
    page = args.object;
}
exports.pageLoaded = pageLoaded;
function toggleCheck() {
    var checkBox = page.getViewById('myCheckbox');
    checkBox.toggle();
}
exports.toggleCheck = toggleCheck;
function getCheckProp() {
    var checkBox = page.getViewById('myCheckbox');
    console.log('checked prop value = ' + checkBox.checked);
}
exports.getCheckProp = getCheckProp;
//# sourceMappingURL=main-page.js.map