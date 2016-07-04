import {Component} from "@angular/core";

import {Router} from "@angular/router-deprecated";

@Component({
    selector: "my-main",
    templateUrl: "./Main/main.xml",
    styleUrls: ["./Main/main.css"]
})

export class MainPage {
    constructor(private router: Router) {
        this.router = router;
    }

    moveTo(where: string) {
        console.log("Navigating to: " + where);
        this.router.navigate([where]);
    }
}