import observable = require("data/observable");

export class MagnitudeModel extends observable.Observable {

    private _magnitude: string;

    get magnitude(): string {
        return this._magnitude;
    }
    set magnitude(value: string) {
        this._magnitude = value;
        this.notifyPropertyChange("magnitude", value)
    }

    constructor() {
        super();

        this._magnitude = "-150.020313164";
    }

    public changeMagnitude(newValue: string) {
        this._magnitude = newValue;
        this.notifyPropertyChange("magnitude", newValue);
    }
}