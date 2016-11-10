import {Observable} from 'data/observable';

export class HelloWorldModel extends Observable {

  private items: Array<string>;

  constructor() {
    super();

    this.items = ["res://icon", "res://logo",null,null,null,null,null,null,null,null,null,null, "res://logo","res://icon"];
  }

}