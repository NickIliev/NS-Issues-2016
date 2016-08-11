import {Component, OnInit, ViewChild, ChangeDetectionStrategy, Input, ElementRef,  Output, EventEmitter} from '@angular/core';

import {Location} from '@angular/common';
import {NS_ROUTER_DIRECTIVES} from 'nativescript-angular/router';

import { HTTP_PROVIDERS } from '@angular/http';
import { BlogService } from '../blogs/blog.service';
import { Observable } from 'rxjs/Rx';
import { ObservableArray } from 'data/observable-array';

import { ListView } from "ui/list-view";
import { RadListView } from "nativescript-telerik-ui-pro/listview";
import { Page } from "ui/page";
import gestures = require("ui/gestures");

import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Blog } from "../blogs/blog.interface";
import * as FrameModule from "ui/frame";

import listViewModule = require("nativescript-telerik-ui-pro/listview");

@Component({

    template: `

        <ActionBar [title]="Title" class="action-bar">
             <NavigationButton text="Go Back" android.systemIcon="ic_menu_back"
                (tap)="onNavigationButtonTap()"></NavigationButton> 

            <Label (tap)="refreshPage($event)" ios.position="right" horizontalAlignment="right"
                text="Refresh"></Label>
        </ActionBar>

        <GridLayout rows="auto, *">
            <RadListView  id="blogslist" row="1" pullToRefresh="true" 
                        (pullToRefreshInitiated)="refreshPage($event)"  [items]="Blogs" itemSwipe="true"
                        itemSwipeProgressStarted)="onSwipeCellStarted($event)"
                        (itemSwipeProgressChanged)="onCellSwiping($event)" (itemSwipeProgressEnded)="onSwipeCellFinished($event)">


                <template listItemTemplate let-item="item"  let-item="item" let-i="index" let-odd="odd" let-even="even">
                    <StackLayout [class.odd]="odd" [class.even]="even" margin="0">
                                    <blog-detail [Title]="item.Title"
                                                    [Show]="item.Show"
                                                    [Summary]="item.Summary"
                                                    [BlogID] ="item.BlogID"
                                                    (changeStatus)="changeStatus($event)"> 
                                    </blog-detail>

                    </StackLayout>
                </template>

                <GridLayout *listItemSwipeTemplate columns="auto, *, auto" class="listItemSwipeGridLayout">
                    <StackLayout id="mark-view" class="markViewStackLayout" col="0" (tap)="onLeftSwipeClick($event)">
                        <Label text="mark" verticalAlignment="center" horizontalAlignment="center"></Label>
                    </StackLayout>
                    <StackLayout id="delete-view" class="deleteViewStackLayout" col="2" (tap)="onRightSwipeClick($event)">
                        <Label text="delete" verticalAlignment="center" horizontalAlignment="center"></Label>
                    </StackLayout>
                </GridLayout>
            </RadListView>
        </GridLayout>

              `,
    directives: [NS_ROUTER_DIRECTIVES, BlogDetailComponent],
    providers: [HTTP_PROVIDERS, BlogService],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class BlogSwipeComponent implements OnInit {

    public Title: string = "Blogs";
    public Blogs: ObservableArray<Blog>;
    @ViewChild(BlogDetailComponent) control2: BlogDetailComponent;

    //get instance of the page in the constructor
    constructor(private blogService: BlogService, private location: Location, private page: Page) {
        this.Blogs = new ObservableArray<Blog>();
    }

    ngOnInit() {
        this.getBlogs();
    }

    changeStatus(BlogID: number) {
        console.log("Change in PARENT triggered from child control !");
        this.changeShowStatus(BlogID);
    }


    getBlogs(pullRefresh?: any): void {
        var that = this;

        that.Blogs.length = 0;

        this.blogService.getBlogs()
            .map(function (params) {
                params.forEach(function (entry) {
                    that.Blogs.push(new Blog(entry.BlogID, entry.SLUGID, entry.Title, entry.Summary, false));
                });
            })
            .subscribe();
    }

    public refreshPage(args: listViewModule.ListViewEventData) {
        console.log("Blogs Refresh -> go");
        let pullRefresh = args.object;

        setTimeout(() => {
            this.getBlogs(pullRefresh);
            var listView = args.object;
            listView.notifyPullToRefreshFinished();
        }, 1000);
    }

 private changeShowStatus(BlogID: Number): void {


     console.log("Change in show detail triggered");
        this.Blogs.forEach(x => {
            if (x.BlogID == BlogID) {
                if (x.Show) {
                    x.Show = false;
                }
                else {
                    x.Show = true;
                }
            } else { x.Show = false }
        });
        // get RadListView using its id
        let lvcontainer: RadListView = <RadListView>this.page.getViewById("blogslist");
        lvcontainer.refresh();

    }

    // >> Swipe
    public onCellSwiping(args: listViewModule.ListViewEventData) {
        var swipeLimits = args.data.swipeLimits;
        var currentItemView = args.object;
        var currentView;

        console.log("Swipe");

        if (args.data.x > 200) {
            console.log("Notify perform left action");
        } else if (args.data.x < -200) {
            console.log("Notify perform right action");
        }
    }

    public onSwipeCellStarted(args: listViewModule.ListViewEventData) {
        var swipeLimits = args.data.swipeLimits;
        var listview = FrameModule.topmost().currentPage.getViewById("blogslist");

  console.log("Swipe Started");

        swipeLimits.threshold = listview.getMeasuredWidth();
        swipeLimits.left = listview.getMeasuredWidth();
        swipeLimits.right = listview.getMeasuredWidth();
    }

    public onSwipeCellFinished(args: listViewModule.ListViewEventData) {


        if (args.data.x > 200) {
            console.log("Perform left action");
        } else if (args.data.x < -200) {
            console.log("Perform right action");
        }
    }

     public onLeftSwipeClick(args) {
        console.log("Left swipe click");
    }

   public onRightSwipeClick(args: listViewModule.ListViewEventData) {
        console.log(args.itemIndex);
        var selectedBlog = this.Blogs[args.itemIndex]; // where Blogs is your data array
        //var currentTitle = selectedBlog.Title; // the same applies to any other key value
        //this.changeShowStatus(selectedBlog.BlogID);
}

public onItemSelected(args: listViewModule.ListViewEventData) {
        console.log(args.itemIndex);
        var selectedBlog = this.Blogs[args.itemIndex]; // where Blogs is your data array
       // var currentTitle = selectedBlog.BlogID; // the same applies to any other key value
}

    // << Swipe

 public onItemClick(args: listViewModule.ListViewEventData) {
        var listView = <listViewModule.RadListView>FrameModule.topmost().currentPage.getViewById("blogslist");
        //listView.notifySwipeToExecuteFinished();
        console.log("Item click: " + args.itemIndex);

      //  this.changeShowStatus(args.itemIndex);
    }


    public onNavigationButtonTap() {
        this.location.back();
    }
}


@Component({
    selector: 'blog-detail',
    template: `
            <StackLayout (touch)="blogTapEvent($event)" >
                <Label [text]="Title" [class.focus-title]="Show" margin="10"></Label>
                <Label [text]="Summary" [class.focus-summary]="Show" textWrap="true"  [visibility]="Show ? 'visible' : 'collapsed'" margin="10" ></Label>
            </StackLayout>
`
})
class BlogDetailComponent {

    @Input('BlogID') public BlogID: number;
    @Input('Title') public Title: string;
    @Input('Summary') public Summary: string;
    @Input('Show') public Show: boolean;
    
    @Output() changeStatus = new EventEmitter<number>();

    blogTapEvent(e: gestures.TouchGestureEventData) {
        if (e && e.action === 'down') {
            console.log("Tapped" + this.BlogID)
            this.changeStatus.emit(this.BlogID);
        }
    }
}
