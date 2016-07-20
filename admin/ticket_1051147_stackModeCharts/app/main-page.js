"use strict";
var main_view_model_1 = require("./main-view-model");
var vm = new main_view_model_1.MyViewModel();
function onPageLoaded(args) {
    var page = args.object;
    page.bindingContext = vm;
}
exports.onPageLoaded = onPageLoaded;
//# sourceMappingURL=main-page.js.map