import {Observable} from 'data/observable';

export class HelloWorldModel extends Observable {

  private source: Array<string> = [];

  constructor() {
    super();

    this.source = ["ala", "bala", "nica", "ala", "bala","ala", "bala","ala", "bala"];
  }


}