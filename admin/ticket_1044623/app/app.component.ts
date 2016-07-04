import {Component, OnChanges} from "@angular/core";
import {SegmentedBarItem} from "ui/segmented-bar"


@Component({
    selector: "my-app",
    template:`
        <SegmentedBar [items]='segmItems'>
        </SegmentedBar>
`,
})

export class AppComponent {

    public items: Array<string>;
    public segmItems: Array<SegmentedBarItem>;

    constructor() {
        this.segmItems= [];
        for (var i = 0; i < 3; i++) {
            var segmentedBarItem = new SegmentedBarItem();
            segmentedBarItem.title = "Item " + (i + 1);
            this.segmItems.push(segmentedBarItem);
        }
    }
}