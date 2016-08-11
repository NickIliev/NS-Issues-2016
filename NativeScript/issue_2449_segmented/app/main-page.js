"use strict";
var observable_1 = require("data/observable");
var vm = new observable_1.Observable();
vm.set("segBaritemSelectedIndex", 0);
vm.set("isItemOneVisible", true);
vm.set("isItemTwoVisible", false);
vm.set("isItemThreeVisible", false);
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    var segbar = page.getViewById("seg-bar");
    vm.addEventListener(observable_1.Observable.propertyChangeEvent, function (propertyChangeData) {
        if (propertyChangeData.propertyName.toString() == 'segBaritemSelectedIndex') {
            switch (propertyChangeData.value) {
                case 0:
                    vm.set("isItemOneVisible", true);
                    vm.set("isItemTwoVisible", false);
                    vm.set("isItemThreeVisible", false);
                    break;
                case 1:
                    vm.set("isItemOneVisible", false);
                    vm.set("isItemTwoVisible", true);
                    vm.set("isItemThreeVisible", false);
                    break;
                case 2:
                    vm.set("isItemOneVisible", false);
                    vm.set("isItemTwoVisible", false);
                    vm.set("isItemThreeVisible", true);
                    break;
                default:
                    break;
            }
        }
    });
    page.bindingContext = vm;
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map