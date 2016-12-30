import {Component, ChangeDetectionStrategy, OnInit} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",

})
export class AppComponent implements OnInit {
    myItems: BehaviorSubject<number[]> = new BehaviorSubject([]);

    ngOnInit(): void {
        this.myItems.next([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    }
}
