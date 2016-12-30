import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Event } from '@angular/router';

@Component({
    selector: "ns-items",
    templateUrl: "items.component.html",
})
export class ItemsComponent implements OnInit {

    constructor(route: ActivatedRoute) { }

    ngOnInit(): void {

    }
}
