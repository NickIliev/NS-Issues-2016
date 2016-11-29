import { Component, OnInit } from "@angular/core";
import { TouchGestureEventData } from "ui/gestures";
@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {

    public source: Array<string>;

    ngOnInit() {
        this.source = ["ala", "bala", "nica"];
    }

    onMainGridTouch(args: TouchGestureEventData) {

        console.log(args.view);
        console.log(args.eventName);
        console.log("x: " + args.getX() + " y:"  + args.getY());
        console.log(args.getAllPointers());

        var pointers = args.getAllPointers();
        for (var index = 0; index < pointers.length; index++) {
            var pointer = pointers[index];
            console.log(pointer.android);
        }
    }
}
