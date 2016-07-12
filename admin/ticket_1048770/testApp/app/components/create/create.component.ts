import {Component} from "@angular/core";
import {Location} from "@angular/common";
import * as applicationSettings from "application-settings";

@Component({
    selector: "create",
    templateUrl: "./components/create/create.html",
})

export class CreateComponent {

    location: Location;
    firstname: string;
    lastname: string;

    constructor(location: Location) {
        this.location = location;
        this.firstname = "";
        this.lastname = "";
    }

    save() {
        if(this.firstname != "" && this.lastname != "") {
            var people: Array<Object> = JSON.parse(applicationSettings.getString("people", "[]"));
            people.push({firstname: this.firstname, lastname: this.lastname});
            applicationSettings.setString("people", JSON.stringify(people));
            this.location.back();
        }
    }

}
