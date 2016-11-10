"use strict";
var main_view_model_1 = require('./main-view-model');
var color_1 = require("color");
function onLoaded(args) {
    var page = args.object;
    page.bindingContext = new main_view_model_1.ViewModel();
    var myListView = page.getViewById("myListView");
    console.log(myListView.android);
    myListView.backgroundColor = new color_1.Color("gray");
    myListView.borderColor = new color_1.Color("red");
    myListView.android.setScrollbarFadingEnabled(true);
}
exports.onLoaded = onLoaded;
//# sourceMappingURL=main-page.js.map