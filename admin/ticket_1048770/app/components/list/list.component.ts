import {Component} from "@angular/core";
import {Location} from "@angular/common"; //allows to track navigations
import {Router} from "@angular/router-deprecated"; //allows to navigate
import * as applicationSettings from "application-settings"; //for storing data

@Component({
    selector: "list",
    templateUrl: "./components/list/list.html",
})

export class ListComponent {

    router: Router;
    personList: Array<Object>;

    constructor(router: Router, location: Location) {
        this.router = router;
        this.personList = JSON.parse(applicationSettings.getString("people", "[]"));
        location.subscribe((path) => {
            this.personList = JSON.parse(applicationSettings.getString("people", "[]"));
        });
    }

    create() {
        this.router.navigate(["Create"]);
    }
}
