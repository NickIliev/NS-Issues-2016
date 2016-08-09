import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import * as gestures from 'ui/gestures';

@Component({
    selector: 'blog-detail',
    template: `
           
                <Label [text]="Title" [class.focus-title]="Show" margin="10"></Label>
                <Label [text]="Summary" [class.focus-summary]="Show" textWrap="true"  [visibility]="Show ? 'visible' : 'collapsed'" margin="10" ></Label>
          
	`
})
export class BlogNoTapDetailComponent {

    @Input('BlogID') public BlogID: number;
    @Input('Title') public Title: string;
    @Input('Summary') public Summary: string;
    @Input('Show') public Show: boolean;
}