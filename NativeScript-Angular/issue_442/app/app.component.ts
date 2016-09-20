import {Component, ViewContainerRef} from "@angular/core";
import {Page} from "ui/page";

import {NestedComponentChild} from "./NestedComponentChild"

@Component({
    selector: "NestedComponentParent",
    template: `
    <StackLayout #contentStack>
        <Label text="Text on parent"></Label>
        <Button (tap)="addChild()" text="Add child"></Button>
        <NestedComponentChild *ngFor="let idx of items" [counter]="idx"></NestedComponentChild>
    </StackLayout>
  `,
    directives: [NestedComponentChild]
})

export class NestedComponentParent {
    items = [];
    counter = 0;

    constructor(private page: Page, vcRef:ViewContainerRef) {
    }

    addChild() {
        this.counter++;
        this.items.push(this.counter);
    }
}