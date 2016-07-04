import {NS_ROUTER_DIRECTIVES} from "nativescript-angular/router";
import {Router} from "@angular/router-deprecated";
import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";

@Component({
  selector: "Second",
  directives: [NS_ROUTER_DIRECTIVES],
  template: `
    <StackLayout>
        <Button text="toFirst" [nsRouterLink]="['FirstListPage']"></Button>
        <GridLayout>
            <ListView [items]="taskList" class="small-spacing">
                <template let-item="item">
                    <Label [text]="item.title" class="medium-spacing"></Label>
                </template>
            </ListView>
        </GridLayout>
    </StackLayout>
    `,
})
export class SecondListPage implements OnInit {
  taskList: Array<Object> = [];

  constructor(private _router: Router) {}

  ngOnInit() {
    this.taskList.push({ title: "Kids to school" });
    this.taskList.push({ title: "Car wash" });
    this.taskList.push({ title: "Buy present" });
    this.taskList.push({ title: "Attend seminar" });
  }
    
  goToFirst() {
      this._router.navigate(["FirstListPage"]);
  }
}