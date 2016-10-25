"use strict";
var observable_1 = require('data/observable');
var vm = new observable_1.Observable();
vm.set("interests", "some interests");
function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = vm;
}
exports.navigatingTo = navigatingTo;
function onTapInterests(args) {
    console.log("onTapInterests");
}
exports.onTapInterests = onTapInterests;
//# sourceMappingURL=main-page.js.map