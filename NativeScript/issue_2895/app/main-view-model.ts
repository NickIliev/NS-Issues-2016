import {Observable} from 'data/observable';
import {ImageSource} from "image-source";

export class HelloWorldModel extends Observable {

  private _counter: number;
  private _message: string;

  private _img: ImageSource;

  constructor() {
    super();

    // Initialize default values.
    this._counter = 42;
    this.updateMessage();
  }

  get img(): ImageSource {
    return this._img;
  }
  
  set img(value: ImageSource) {
    if (this._img !== value) {
      this._img = value;
      this.notifyPropertyChange('img', value)
    }
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