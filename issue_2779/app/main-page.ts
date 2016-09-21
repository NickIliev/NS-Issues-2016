import { EventData, Observable } from 'data/observable';
import { Page } from 'ui/page';
import { GestureEventData } from "ui/gestures";

import { Button } from "ui/button";
import { Label } from "ui/label";

export function onNavigatingTo(args: EventData) {
    let page: Page = <Page>args.object
    page.bindingContext = new Index(page);
}

class Index extends Observable {

    private _digits: Array<string> = []

    constructor(private _page: Page) {
        super()
    }

    get digits(): Array<string> {
        return this._digits
    }
    set digits(value: Array<string>) {
        this._digits = value
        this.notifyPropertyChange('digits', value)
    }

    tapped(args: GestureEventData) {
        if (this.digits.length == 4) {
            return
        }
        let btn: Button = <Button>args.object;
        let iosButton: UIButton = btn.ios;

        console.log("X: " + iosButton.frame.origin.x);
        console.log("Y: " + iosButton.frame.origin.y); // this is always 0

        if (this.digits.length < 4) {
            this._digits.push(btn.text)
            this.digits = this._digits
        }
    }

    clear() {
        if (this.digits.length > 0) {
            this._digits.pop()
            this.digits = this._digits
        }
    }

}