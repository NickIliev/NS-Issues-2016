import {Component} from "@angular/core";
import dialogs = require("ui/dialogs");
import {DatePicker} from "ui/date-picker";
import {Page} from "ui/page";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html"
})

export class AppComponent {
    private datePicker: DatePicker;
    public isVisible: boolean = false;

    public day: number;
    public month: number;
    public year: number;

    public addTime() {
        dialogs.prompt({
            message: "Pick the date you work"
        }).then(r => {
            console.log(r.result + "\n" + r.text);
            this.day = 31;
            this.month = 12;
            this.year = 2016;
            this.isVisible = true;
        });
    }
}