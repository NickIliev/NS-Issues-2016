import { Component } from "@angular/core";

@Component({
    selector: "my-app",
    template: "<page-router-outlet></page-router-outlet>",
})

export class AppComponent {
}


// import {Component} from "@angular/core";
// import { RouterExtensions } from 'nativescript-angular/router';

// @Component({
//     selector: "my-app",
//     templateUrl: "app.component.html",
// })
// export class AppComponent {
//     public counter: number = 16;

//     constructor(private routerExtensions: RouterExtensions) {
//     }

//     public get message(): string {
//         if (this.counter > 0) {
//             return this.counter + " taps left";
//         } else {
//             return "Hoorraaay! \nYou are ready to start building!";
//         }
//     }
    
//     public onTap() {
//         this.counter--;
//     }

//     public toSec() {
//         this.routerExtensions.navigate(["/secondary"], { clearHistory: true });
//     }

//     public toThird() {
//         this.routerExtensions.navigate(["/third"], { clearHistory: false });
//     }
// }
