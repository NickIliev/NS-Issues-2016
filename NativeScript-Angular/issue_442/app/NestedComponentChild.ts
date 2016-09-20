import {Component, Input} from "@angular/core";
import {View} from "ui/core/view"

@Component({
  selector: "NestedComponentChild",
  template: `
    <Label [text]='"Child #" + counter'></Label>
  `
})

export class NestedComponentChild {
    @Input() counter: number = 0;
}