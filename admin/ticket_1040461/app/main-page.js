"use strict";
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    var timePicker = page.getViewById("time");
    console.log(timePicker.android);
    timePicker.android.setDisplayedValues(new java.lang.String["0", "15", "30", "45"]);
    timePicker.android.setMinValue(0);
    timePicker.android.setMaxValue(3);
    timePicker.android.setOnLongPressUpdateInterval(100);
    timePicker.minuteInterval = 15;
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map