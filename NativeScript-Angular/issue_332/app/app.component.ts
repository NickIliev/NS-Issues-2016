import {Component, ViewChild, ElementRef} from "@angular/core";
import {TabView, TabViewItem, SelectedIndexChangedEventData} from 'ui/tab-view';
import { StackLayout } from "ui/layouts/stack-layout"; 

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {

    public selectedIndex: number;

    @ViewChild("tabs") tabs: ElementRef; 

    @ViewChild("tabOne") tabOne: ElementRef; 
    @ViewChild("tabTwo") tabTwo: ElementRef; 

    constructor() {
        this.selectedIndex = 1;
    }

    ngAfterViewInit() {
        this.tabs.nativeElement.on(TabView.selectedIndexChangedEvent, (args: SelectedIndexChangedEventData) => {
            switch (args.newIndex) {
                case 0:
                    console.log('first selected');
                    this.tabOne.nativeElement.cssClass = "elephant";                   
                    break;
                case 1:
                    console.log('second selected');
                    this.tabTwo.nativeElement.cssClass = "logo";                   
                    break;
            }
        })
    }
}
