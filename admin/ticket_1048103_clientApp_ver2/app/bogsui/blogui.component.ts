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

import listViewModule = require("nativescript-telerik-ui/listview");


@Component({

    template: `
   
        <ActionBar [title]="Title" class="action-bar">
             <NavigationButton text="Go Back" android.systemIcon="ic_menu_back"
                (tap)="onNavigationButtonTap()"></NavigationButton> 
  
            <Label (tap)="refreshPage($event)" ios.position="right" horizontalAlignment="right"
                text="Refresh"></Label>
        </ActionBar>
  
          
 
                <RadListView   id="blogslist"
                pullToRefresh="true" 
                (pullToRefreshInitiated)="refreshPage($event)" 
                [items]="Blogs" >
                        <template listItemTemplate let-item="item" let-i="index" let-odd="odd" let-even="even">
                            <StackLayout [class.odd]="odd" [class.even]="even" margin="0">
                             <blog-detail [Title]="item.Title"
                                 [Show]="item.Show"
                                 [Summary]="item.Summary"
                                 [BlogID] ="item.BlogID"
                                 (changeStatus)="changeStatus($event)"
                                 > 
                             </blog-detail>
 
                            </StackLayout>     
                        </template>
                    </RadListView>
         
   
              `,
    directives: [NS_ROUTER_DIRECTIVES, BlogDetailComponent],
    providers: [HTTP_PROVIDERS, BlogService],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class BlogUIComponent implements OnInit {

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
        this.changeShowStatus(BlogID);
    }

    private changeShowStatus(BlogID: Number): void {
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

    public onNavigationButtonTap() {
        this.location.back();
    }
}
