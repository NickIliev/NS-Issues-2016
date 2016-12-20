import { Component } from "@angular/core";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    
    public getCoding: boolean;
    public timerVerifyCode: string;

    counterDown() {
            let counterDown = 60;
            this.getCoding = true;
            let timerCounter = setInterval(function () {
                counterDown--;
                console.log('counterDown=>', counterDown);
                this.timerVerifyCode = counterDown + 'after request';
                console.log('counterDown=>', counterDown);
                console.log('timerVerifyCode=>', this.timerVerifyCode);
                if (counterDown <= 0) {
                    clearInterval(timerCounter);
                    this.timerVerifyCode = 'request code';
                }
            }, 1000);
        }
}
