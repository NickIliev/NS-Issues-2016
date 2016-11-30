import {Observable} from 'data/observable';

export class HelloWorldModel extends Observable {

  private _counter: number;
  private _message: string;
  private _list: Array<string>;

  constructor() {
    super();

    // Initialize default values.
    this._counter = 42;
    this.updateMessage();

    this._list = ["ala","bala","nica"];
  }

  
  public get list() : Array<string> {
    return this._list;
  }

  public set list(v : Array<string>) {
    this._list = v;
    this.notifyPropertyChange('list', v)
  }
  
  get message(): string {
    return this._message;
  }
  
  set message(value: string) {
    if (this._message !== value) {
      this._message = value;
      this.notifyPropertyChange('message', value)
    }
  }

  public onTap() {
    this._counter--;
    this.updateMessage();
  }

  private updateMessage() {
    if (this._counter <= 0) {
      this.message = 'Hoorraaay! You unlocked the NativeScript clicker achievement!';
    } else {
      this.message = `${this._counter} taps left`;
    }
  }
}