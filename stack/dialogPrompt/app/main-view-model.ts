import observable = require("data/observable");

export class MyViewModel extends observable.Observable {

    private _pendingConnections: Array<Object>;

    get pendingConnections(): Array<Object> {
        return this._pendingConnections;
    }
    set pendingConnections(value: Array<Object>) {
        if (this._pendingConnections !== value) {
            this._pendingConnections = value;
        }
    }
}