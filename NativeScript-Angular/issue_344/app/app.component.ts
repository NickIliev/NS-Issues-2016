import {Component, ViewChild, ElementRef, OnInit} from "@angular/core";
import {Button} from "ui/button";
import {Label} from "ui/label";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {

    @ViewChild("btn") button: ElementRef;
    @ViewChild("lbl") label: ElementRef;

    ngOnInit() {
        let viewButton: Button = this.button.nativeElement;
        let viewBLabel: Label = this.label.nativeElement;

        viewButton.text= "012345";
        viewBLabel.text= "012345";
    }
}
