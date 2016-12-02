import { Component } from "@angular/core";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    public items: Array<DataItem>;

    constructor() {
        this.items = new Array<DataItem>();
        for (let i = 0; i < 5; i++) {
            this.items.push(new DataItem("item " + i));
        }
    }
}

export class DataItem {
    constructor(public itemDesc: string) {}
}