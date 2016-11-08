import {Component, OnInit} from "@angular/core";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {
    public imgSrc: string;

    ngOnInit() {
        this.imgSrc = "~/images/flags/icon.png";
    }    
}
