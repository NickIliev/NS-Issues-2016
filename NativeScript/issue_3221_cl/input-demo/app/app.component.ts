import { Component } from "@angular/core";
import { Color } from "color";

import { View } from "ui/core/view";
import { TextField } from "ui/text-field";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
    styleUrls: ["app-common.css"]
})

export class AppComponent {
    pinFlag:boolean;
    pin: string;

    constructor(){
        this.pinFlag = false;
        this.pin = "";
    }
}
