import { Component } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
    selector: 'third',
    templateUrl: 'third.component.html'
})

export class ThirdComponent {
    constructor(private routerExtensions: RouterExtensions) {
    }

    public goBack() {
        this.routerExtensions.backToPreviousPage();
    }
}
