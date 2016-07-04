"use strict";
var scroll_view_1 = require("ui/scroll-view");
var scroller1;
var scroller2;
function pageLoaded(args) {
    var page = args.object;
    scroller1 = page.getViewById("scroller1");
    scroller2 = page.getViewById("scroller2");
    scroller1.on(scroll_view_1.ScrollView.scrollEvent, scrollingScroller1, this);
    scroller2.on(scroll_view_1.ScrollView.scrollEvent, scrollingScroller2, this);
}
exports.pageLoaded = pageLoaded;
function scrollingScroller1(args) {
    console.log('scrollingScroller1');
}
function scrollingScroller2(args) {
    console.log('EVENT FROM scrollingScroller2');
}
function buttonClicked(args) {
    scroll();
}
exports.buttonClicked = buttonClicked;
function scroll() {
    scroller1.scrollToHorizontalOffset(300, false);
    scroller1.animate({
        opacity: 1,
        duration: 500
    });
}
exports.scroll = scroll;
//# sourceMappingURL=main-page.js.map