"use strict";
var main_view_model_1 = require('./main-view-model');
function onPageLoaded(args) {
    var page = args.object;
    page.bindingContext = new main_view_model_1.TicketViewModel();
}
exports.onPageLoaded = onPageLoaded;
//# sourceMappingURL=main-page.js.map