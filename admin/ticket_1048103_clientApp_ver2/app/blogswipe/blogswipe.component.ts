import {Component, OnInit, ViewChild, ChangeDetectionStrategy, Input, ElementRef} from '@angular/core';

import {Location} from '@angular/common';
import {NS_ROUTER_DIRECTIVES} from 'nativescript-angular/router';

import {HTTP_PROVIDERS} from '@angular/http';
import {BlogService} from '../blogs/blog.service';
import {Observable} from 'rxjs/Rx';
import {ObservableArray} from 'data/observable-array';
import { BlogDetailComponent } from "../blogs/blog.detail.component";

import {ListView} from "ui/list-view";
import { RadListView } from "nativescript-telerik-ui/listview";
import { Page } from "ui/page"

import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Blog } from "../blogs/blog.interface";
import * as FrameModule from "ui/frame";

import listViewModule = require("nativescript-telerik-ui/listview");


// >> Font
import { TNSFontIconService, TNSFontIconPipe } from 'nativescript-ng2-fonticon';
// << Font


var selectedItemIndex; // will use this to cache your args.itemIndex where we can get it (lazy loading)

@Component({

    template: `
   
<ActionBar [title]="Title" class="action-bar">
    <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" (tap)="onNavigationButtonTap()"></NavigationButton> 
    <Label (tap)="refreshPage($event)" ios.position="right" horizontalAlignment="right" text="Refresh"></Label>
</ActionBar>

 
      
<GridLayout rows="auto, *">
    <RadListView id="blogslist" row="1"
                pullToRefresh="true" 
                (pullToRefreshInitiated)="refreshPage($event)" 
                [items]="Blogs" 
                itemSwipe="true"
                selectionBehavior="None"
                (itemSwipeProgressStarted)="onSwipeCellStarted($event)"
                (itemSwipeProgressChanged)="onCellSwiping($event)" 
                (itemSwipeProgressEnded)="onSwipeCellFinished($event)"
                (itemTap)="onItemClick($event)">

        <template listItemTemplate let-item="item"  let-item="item" let-i="index" let-odd="odd" let-even="even">
             <StackLayout [class.odd]="odd" [class.even]="even" margin="0">
                   <blog-detail [Title]="item.Title"
                                 [Show]="item.Show"
                                 [Summary]="item.Summary"
                                 [BlogID] ="item.BlogID"> 
                    </blog-detail>
            </StackLayout>
        </template>

        <GridLayout *listItemSwipeTemplate columns="auto, *, auto" class="listItemSwipeGridLayout">

            <StackLayout id="delete-view" class="deleteViewStackLayout" col="2" (tap)="onRightSwipeClick($event)">
                <Label class="fa" [text]="'fa-trash' | fonticon" verticalAlignment="center" horizontalAlignment="center"></Label>
            </StackLayout>
        </GridLayout>

    </RadListView>
</GridLayout>
   
              `,
    directives: [NS_ROUTER_DIRECTIVES, BlogDetailComponent],
    pipes: [TNSFontIconPipe],
    providers: [HTTP_PROVIDERS, BlogService],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class BlogSwipeComponent implements OnInit {

    public Title: string = "Blogs";
    public Blogs: ObservableArray<Blog>;
    @ViewChild(BlogDetailComponent) control2: BlogDetailComponent;

    //get instance of the page in the constructor
    constructor(private blogService: BlogService, private location: Location, private page: Page, private fonticon: TNSFontIconService) {
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

        // this will return your scren width - for nexus 6 api 23 its 1440
        console.log(listview.getMeasuredWidth());

        // the thershold is now 1440 / 4 = 360;
        swipeLimits.threshold = listview.getMeasuredWidth() / 4;

        // user can swipe on the whole screeen (1440) but if the swipe is greater then 360 the stick will be fired
        swipeLimits.left = listview.getMeasuredWidth();
        //swipeLimits.right = 1; 

        // DELETE this swipeLimits.right = 0; as when this is set the stick does not work as expected

    }

    public onSwipeCellFinished(args: listViewModule.ListViewEventData) {

        if (args.data.x > 200) {
            console.log("Perform left action");
        } else if (args.data.x < -200) {
            console.log("Perform right action");
        }
    }

    public onLeftSwipeClick(args) { // : listViewModule.ListViewEventData WONT WORK - you are tapping on StackLayout - not on ListView
        console.log("Left swipe button is tapped");
    }

    public onRightSwipeClick(args) {  // : listViewModule.ListViewEventData WONT WORK - you are tapping on StackLayout - not on ListView
        console.log("Right swipe button is tapped");
        console.log("The index of the item you want to delete is " + selectedItemIndex);

        // console.log(args.itemIndex); // won't work - you will need to get your itemIndex when the
        //var selectedBlog = this.Blogs[args.itemIndex]; //won't work - see above - where Blogs is your data array

        // var currentTitle = selectedBlog.Title; // the same applies to any other key value

        // console.log(currentTitle);
        //this.changeShowStatus(selectedBlog.BlogID);
    }

    public onItemSelected(args: listViewModule.ListViewEventData) {
        // see below to know where selectedItemIndex comes from
        // var selectedBlog = this.Blogs[selectedItemIndex]; // where Blogs is your data array
        // var currentTitle = selectedBlog.BlogID; // the same applies to any other key value
        // console.log(currentTitle);
    }

    // << Swipe

    public onItemClick(args: listViewModule.ListViewEventData) {
        var listView = <listViewModule.RadListView>FrameModule.topmost().currentPage.getViewById("blogslist");
        listView.notifySwipeToExecuteFinished();
        selectedItemIndex = args.itemIndex;

        var oBlog = this.Blogs.getItem(selectedItemIndex);
        console.log("Title is " + oBlog.Title);
        this.changeShowStatus(oBlog.BlogID);
    }


    public onNavigationButtonTap() {
        this.location.back();
    }
}