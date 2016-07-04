"use strict";
var observable_1 = require("data/observable");
var model = new observable_1.Observable();
var totalCost = 0;
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = model;
    var polishSwitch = page.getViewById("sw-polish");
    var washSwitch = page.getViewById("sw-wash");
    model.set("optionPolish", false);
    var options = {
        sourceProperty: "optionPolish",
        targetProperty: "checked",
        twoWay: true
    };
    polishSwitch.bind(options, model);
    // polishSwitch.checked is now true
    model.set("optionWash", false);
    var options = {
        sourceProperty: "optionWash",
        targetProperty: "checked",
        twoWay: true
    };
    washSwitch.bind(options, model);
    // washSwitch.checked is now false
    model.set("cost", totalCost);
    model.addEventListener(observable_1.Observable.propertyChangeEvent, function (args) {
        console.log(args.eventName.toString() + " " + args.propertyName.toString() + " " + args.value.toString());
        switch (args.propertyName.toString()) {
            case 'optionWash':
                if (args.value.toString() == 'true') {
                    totalCost += 80;
                }
                else {
                    totalCost -= 80;
                }
                break;
            case 'optionPolish':
                if (args.value.toString() == 'true') {
                    totalCost += 40;
                }
                else {
                    totalCost -= 40;
                }
                break;
        }
        model.set("cost", totalCost);
    });
}
exports.navigatingTo = navigatingTo;
// export function onTap(args:EventData) {
//     totalCost = 0; 
//     model.set("cost", totalCost);  // reset the value before each re-calculation 
//     if (model.get("optionPolish") && model.get("optionWash")) {
//         totalCost += 120; // both ON
//         model.set("cost", totalCost);
//     } else if (model.get("optionPolish") && !model.get("optionWash")) {
//         totalCost += 40; // ON + OFF
//         model.set("cost", totalCost);
//     } else if (!model.get("optionPolish") && model.get("optionWash")) {
//         totalCost += 80; // OFF + ON
//         model.set("cost", totalCost);
//     } else {
//         totalCost += 0; // both OFF
//         model.set("cost", totalCost);        
//     } 
// }
//# sourceMappingURL=main-page.js.map