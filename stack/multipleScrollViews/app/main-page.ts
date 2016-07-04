import { EventData } from "data/observable";
import { Page } from "ui/page";
import { ScrollView } from "ui/scroll-view";
import observable = require("data/observable");
import scrollViewModule = require("ui/scroll-view")

let scroller1: ScrollView;
let scroller2: ScrollView;

export function pageLoaded(args: EventData) {
    let page = <Page>args.object;

    scroller1 = <ScrollView>page.getViewById("scroller1");
    scroller2 = <ScrollView>page.getViewById("scroller2");

    scroller1.on(ScrollView.scrollEvent, scrollingScroller1, this);
    scroller2.on(ScrollView.scrollEvent, scrollingScroller2, this);
}


function scrollingScroller1(args: scrollViewModule.ScrollEventData) {
    console.log('scrollingScroller1');
}
function scrollingScroller2(args: scrollViewModule.ScrollEventData) {
    console.log('EVENT FROM scrollingScroller2');
}


export function buttonClicked(args: scrollViewModule.ScrollEventData) {
    scroll();
}

export function scroll() {
    scroller1.scrollToHorizontalOffset(300, false);
    scroller1.animate({
        opacity: 1,
        duration: 500
    });
}