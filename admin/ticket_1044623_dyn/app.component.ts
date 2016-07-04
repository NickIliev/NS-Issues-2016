import {Component, OnInit, OnChanges} from "@angular/core";
import {ObservableArray} from "data/observable-array";
import {SegmentedBarItem} from "ui/segmented-bar"


@Component({
    selector: "my-app",
    templateUrl:"app.component.html",
})
export class AppComponent {
    public selectedIndex =1;

    public items: Array<string>;
    public selected:string;
    public segmItems:Array<SegmentedBarItem>;

    constructor() {
        this.selected = '1';
        this.items = [];
        this.segmItems= [];
        for (var i = 0; i < 5; i++) {
            this.items.push("data item " + i);
            var sg = new SegmentedBarItem();
            sg.title= "data item " + i;
            this.segmItems.push(sg);

        }
    }
    


    public onchange(selectedi){
        console.log("selected index "+selectedi);
        this.selected = selectedi;
    }
}
