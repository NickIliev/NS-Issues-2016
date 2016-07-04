import {NS_ROUTER_DIRECTIVES} from "nativescript-angular/router";
import {Router} from "@angular/router-deprecated";
import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";

@Component({
  selector: "First",
  directives: [NS_ROUTER_DIRECTIVES],
  template: `
    <StackLayout>
        <Button text="toSecond"  [nsRouterLink]="['SecondListPage']"></Button>
        <GridLayout>
            <ListView [items]="groceryList" class="small-spacing">
                <template let-item="item">
                    <Label [text]="item.name" class="medium-spacing"></Label>
                </template>
            </ListView>
        </GridLayout>
    </StackLayout>
    `,
})

export class FirstListPage implements OnInit {
  groceryList: Array<Object> = [];
  
  constructor(private _router: Router) {}

  ngOnInit() {
    this.groceryList.push({ name: "Apples" });
    this.groceryList.push({ name: "Bananas" });
    this.groceryList.push({ name: "Oranges" });
  }
  
  goToSecond() {
      this._router.navigate(["SecondListPage"]);
  }
}