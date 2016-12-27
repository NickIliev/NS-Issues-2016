import { Component, OnInit } from "@angular/core";
import { ObservableArray } from "data/observable-array";
import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    templateUrl: "items.component.html",
})
export class ItemsComponent implements OnInit {
    items: ObservableArray<Item>;

    constructor(private itemService: ItemService) { }

    ngOnInit() {
        this.items = new ObservableArray(this.itemService.getItems());
    }
}
