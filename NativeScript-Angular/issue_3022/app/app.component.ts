import { Component, OnInit } from "@angular/core";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {
    public selectedIndex: number;

    ngOnInit() {
        this.selectedIndex = 0;
    }
}
