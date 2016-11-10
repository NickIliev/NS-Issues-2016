"use strict";
var observable_1 = require('data/observable');
var vm = new observable_1.Observable();
vm.set("url", "https://www.nativescript.org/");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = vm;
    var wv = page.getViewById("wv");
    var cookieManager = android.webkit.CookieManager.getInstance();
    var cookie = cookieManager.getCookie("https://www.nativescript.org/");
    console.log("cookie:" + cookie);
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map