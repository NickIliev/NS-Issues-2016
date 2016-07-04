"use strict";
var snackbar = require("nativescript-snackbar");
var page;
function navigatingTo(args) {
    page = args.object;
}
exports.navigatingTo = navigatingTo;
function onTap(args) {
    console.log("tapped");
    var logo = page.getViewById("logo");
    logo.rotate = 0;
    logo.animate({
        rotate: 360,
        duration: 1200,
        delay: 100,
        iterations: 3,
        curve: "easeIn"
    })
        .then(function () {
        snackbar.simple("Logged timed event");
    });
    // issued description : the animation works only obn the first tap 
    // the second button Taap won't trigger animation
}
exports.onTap = onTap;
//# sourceMappingURL=main-page.js.map