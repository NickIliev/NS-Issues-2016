import {Observable} from 'data/observable';
import * as httpModule from 'http';

export class MyViewModel extends Observable {

  constructor() {
    super();
  }

  public onTap() {
    this.getActivityViaHttp().then(res => {
      console.log("IP: " + res.origin);
    })
  }

  private getActivityViaHttp() : Promise<any> {
    return httpModule.getJSON('http://httpbin.org/ip');
  }
}