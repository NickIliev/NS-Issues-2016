"use strict";
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
// var groups = new ObservableArray(
//     { subgroup: [{ item: "one", key: "1" }, { item: "two", key: "2" }, { item: "three", key: "3" }] },
//     { subgroup: [{ item: "four", key: "4" }, { item: "five", key: "5" }, { item: "six", key: "6" }] }
// );
var groups = [
    [{ year: "1986", key2: "foo2" }, { year: "1986", key2: "blah" }],
    [{ year: "1987", key2: "baz" }, { year: "1987", key2: "beek" }],
    [{ year: "1988", key2: "baz" }, { year: "1988", key2: "beek" }]
];
var mainArray = new observable_array_1.ObservableArray();
groups.forEach(function (subgroup) {
    var jsonArg1 = new Object();
    jsonArg1["myItem2"] = subgroup;
    mainArray.push(jsonArg1);
});
var viewModel = new observable_1.Observable();
viewModel.set("groups", groups);
viewModel.set("tests", mainArray);
function onLoaded(args) {
    var page = args.object;
    page.bindingContext = viewModel;
}
exports.onLoaded = onLoaded;
//# sourceMappingURL=main-page.js.map