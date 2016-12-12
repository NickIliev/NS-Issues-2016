import { Observable } from 'data/observable';

export class HelloWorldModel extends Observable {

    private _pingFlag: boolean;
    private _myClass: string;

    constructor() {
        super();

        this.pingFlag = true;

    }

    get myClass() {
        return this._myClass;
    }

    set myClass(calue: string) {


        
    }

    get pingFlag(): boolean {
        return this._pingFlag;
    }

    set pingFlag(value: boolean) {
        if (this._pingFlag !== value) {
            this._pingFlag = value;
            this.notifyPropertyChange('pingFlag', value)
        }
    }

}