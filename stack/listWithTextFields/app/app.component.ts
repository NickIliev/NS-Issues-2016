import { Component } from "@angular/core";
import { ItemEventData } from "ui/list-view";
@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    public items: Array<string> = [];

    constructor() {
        this.items = ["ala", "bala", "nica","ala", "bala", "nica","ala", "bala", "nica","ala", "bala", "nica"];
    }

    onItemTap(args: ItemEventData) {
        console.log(args.view);
        console.log(args.object);
    }
}
