import {Component, OnInit, NgZone} from "@angular/core";
import {Page} from "ui/page";

import gestures = require("ui/gestures");

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})


export class AppComponent  {
    public counter: number = 16;
    
    public get message(): string {
        if (this.counter > 0) {
            return this.counter + " taps left";
        } else {
            return "Hoorraaay! \nYou are ready to start building!";
        }
    }
    
    constructor(private _page: Page, private _zone: NgZone) {
        this._page.actionBarHidden = true;

        var that = this;
        
        this._page.on("swipe", function(args: gestures.SwipeGestureEventData) {
            console.log("Swipe Direction From event function: " + args.direction);

            that._zone.run(() => {
                 that.onSwipe(); 
            });
        })
    }

    public onSwipe() {
        console.log("onSwipe triggered");
        this.counter--;
        console.log(this.counter);
    }
}
