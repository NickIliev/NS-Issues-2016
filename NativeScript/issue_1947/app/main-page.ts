import { EventData } from "data/observable";
import { Page } from "ui/page";

var snackbar = require("nativescript-snackbar");

let page;

export function navigatingTo(args: EventData) {
    page = <Page>args.object;
}

export function onTap(args:EventData) {
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