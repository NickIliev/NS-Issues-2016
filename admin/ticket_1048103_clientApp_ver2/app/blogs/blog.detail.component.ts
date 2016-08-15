import { Component, Input, Output, ViewChild, EventEmitter, OnInit } from '@angular/core';
import * as gestures from 'ui/gestures';

@Component({
    selector: 'blog-detail',
    template: `
            <!-- this event is causing the swipes of the parent not to work (touch)="blogTapEvent($event)"-->
            <!-- from user point of view it is very confusing tho have nested elements with different logic-->
            <!-- for gestures - for examlple which swipe to execute if we have two nested swipes!?-->
            <!-- that is why the default behaviour is only the final nested element to execute the gesture -->
            <StackLayout >
                <Label [text]="Title" [class.focus-title]="Show" margin="10"></Label>
                <Label [text]="Summary" [class.focus-summary]="Show" textWrap="true"  [visibility]="Show ? 'visible' : 'collapsed'" margin="10" ></Label>
            </StackLayout>
	`
})
export class BlogDetailComponent implements OnInit {

    @Input('BlogID') public BlogID: number;
    @Input('Title') public Title: string;
    @Input('Summary') public Summary: string;
    @Input('Show') public Show: boolean;
    
    //@Output() changeStatus = new EventEmitter<number>();

    ngOnInit() {
        //this.Show = true;
    }

    // blogTapEvent() {

    //     console.log("Tapped" + this.BlogID)
    //     this.changeStatus.emit(this.BlogID);

    // }
}