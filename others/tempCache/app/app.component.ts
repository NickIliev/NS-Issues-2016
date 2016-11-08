import { Component, ChangeDetectionStrategy, OnInit, ViewChild, ElementRef } from "@angular/core";
import { mockedDataArray } from "../mock-dataItems"
import { EventData } from "data/observable";
import { ScrollView, ScrollEventData } from "ui/scroll-view";

// >> ext-horizontal-lists-code
@Component({
    selector: "horizontal-scrolling-lists-listview",
    templateUrl: "ui-extended/listview/horizontal-scrolling/horizontal-scrolling.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HorizontalScrollingExampleComponent implements OnInit {
    public countries: Array<any> = [];

    ngOnInit() {
        for (var index = 0; index < mockedDataArray.length; index++) {
            this.countries.push({ "data" : mockedDataArray[index], id: index});      
        }
    }

    onTap(args: EventData) {
        // using the unique id assigned via the view-model
        console.log(args.object.get("id"));
    }

    onScroll(args: ScrollEventData) {
        console.log(args.scrollX);
    }

    onScrollLoaded(args) {
        // example on how to scroll to specific position of the horizontal scroll list
        (<ScrollView>args.object).scrollToHorizontalOffset(310, true);
    }
}
// << ext-horizontal-lists-code