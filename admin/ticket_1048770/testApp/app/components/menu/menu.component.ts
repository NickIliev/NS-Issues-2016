import {Observable} from 'data/observable';
import {Component} from "@angular/core";

@Component({
    selector: "menu",
    templateUrl: "./components/menu/menu.html",
})

export class MenuComponent extends Observable {
  public selectedItem: string;
  public items: Array<any> = [
    { title: 'Home' },
    { title: 'G+'   },
    { title: 'Sync' }
  ];

  constructor() {
    super();
    this.selectedItem = `Selected: ${this.items[0].title}`;
  }

  public selectSegment(e: any) {
    this.set('selectedItem', `Selected: ${this.items[e.newIndex].title}`);
  }
}
