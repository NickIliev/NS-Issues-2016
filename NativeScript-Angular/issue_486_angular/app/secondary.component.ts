import { Component } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
    selector: 'secondary',
    templateUrl: 'secondary.component.html'
})

export class SecondaryComponent {
    constructor(private routerExtensions: RouterExtensions) {
    }

    public goBack() {
        this.routerExtensions.backToPreviousPage();
    }
}
