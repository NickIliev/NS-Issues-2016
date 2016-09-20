"use strict";
var Observable = require("data/observable").Observable;
var timeModel = new Observable();
timeModel.StartTime_Formatted = '9:53';
timeModel.EndTime_Formatted = '9:53';
function loaded(args) {
    var page = args.object;
    page.bindingContext = timeModel;
}
exports.loaded = loaded;
function onTimeTap(args) {
    timeModel.set('EndTime_Formatted', '10:53');
}
exports.onTimeTap = onTimeTap;
//# sourceMappingURL=main-page.js.map