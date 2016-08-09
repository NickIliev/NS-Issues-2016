"use strict";
var main_view_model_1 = require("./main-view-model");
var label_1 = require("ui/label");
var vm = new main_view_model_1.HelloWorldModel();
;
vm.set("productName", "Top"); // initial value set
// Event handler for Page "navigatingTo" event attached in main-page.xml
function onNavigatedTo(args) {
    // Get the event sender
    var page = args.object;
    vm.set("categoricalSource", generateSource());
    page.bindingContext = vm;
    var label = new label_1.Label();
    console.log(label.android.view);
}
exports.onNavigatedTo = onNavigatedTo;
function changeProduct() {
    vm.set("productName", "Pants");
}
exports.changeProduct = changeProduct;
function toggleProduct() {
    if (vm.get("productName").toString() === "Top") {
        vm.set("productName", "Pants");
    }
    else if (vm.get("productName").toString() === "Pants") {
        vm.set("productName", "Top");
    }
}
exports.toggleProduct = toggleProduct;
function generateSource() {
    var initialObject = {
        "chartSource": [
            { "name": "April", "Dresses": 100000, "Pants": 200000, "Top": 300000, "Skirts": 400000, "Jackets": 500000 },
            { "name": "May", "Dresses": 10000, "Pants": 200000, "Top": 30000, "Skirts": 400000, "Jackets": 500000 },
            { "name": "June", "Dresses": 35000, "Pants": 25000, "Top": 255500, "Skirts": 35000, "Jackets": 254000 },
            { "name": "July", "Dresses": 258361, "Pants": 20000, "Top": 300000, "Skirts": 25000, "Jackets": 35620 }
        ],
        "someOtherKey": "some other value"
    };
    console.log("Initial object: " + JSON.stringify(initialObject));
    var chartSourceObj = initialObject["chartSource"];
    console.log(JSON.stringify("chartSource object: " + chartSourceObj));
    var chartSourceArray = Object.keys(chartSourceObj).map(function (k) { return chartSourceObj[k]; });
    console.log("Lenght of our cource array: " + chartSourceArray.length);
    console.log("Each element of the array: ");
    chartSourceArray.forEach(function (element) {
        console.log(JSON.stringify(element));
    });
    return chartSourceArray;
}
//# sourceMappingURL=main-page.js.map