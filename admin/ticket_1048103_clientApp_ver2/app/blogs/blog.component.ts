import {Component, OnInit, ViewChild, ChangeDetectionStrategy, Input, ElementRef} from '@angular/core';

import {Location} from '@angular/common';
import {NS_ROUTER_DIRECTIVES} from 'nativescript-angular/router';

import {HTTP_PROVIDERS} from '@angular/http';
import {BlogService} from './blog.service';
import {Observable} from 'rxjs/Rx';
import {ObservableArray} from 'data/observable-array';
import { BlogDetailComponent } from "./blog.detail.component";

import {ListView} from "ui/list-view";

import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Blog } from "./blog.interface";

import listViewModule = require("nativescript-telerik-ui/listview");
import drawerModule = require("nativescript-telerik-ui/sidedrawer");

@Component({

    template: `
<GridLayout>
    <ActionBar [title]="Title" class="action-bar">
        <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" (tap)="onNavigationButtonTap()"></NavigationButton> 
        <Label (tap)="refreshPage($event)" ios.position="right" horizontalAlignment="right" text="Refresh"></Label>
    </ActionBar>
    <StackLayout>
        <ListView #blogslist [items]="Blogs" backgroundColor="red">
            <template  let-item="item" let-i="index" let-odd="odd" let-even="even">
                <StackLayout [class.odd]="odd" [class.even]="even" margin="0">
                    <blog-detail [Title]="item.Title"
                        [Show]="item.Show"
                        [Summary]="item.Summary"
                        [BlogID] ="item.BlogID"
                        (changeStatus)="changeStatus($event)"> 
                    </blog-detail>
                </StackLayout>     
            </template>
        </ListView>
    </StackLayout>
</GridLayout>
              `,
    directives: [NS_ROUTER_DIRECTIVES, BlogDetailComponent],
    providers: [HTTP_PROVIDERS, BlogService],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class BlogComponent implements OnInit {

    public Title: string = "Blogs";
    public Blogs: ObservableArray<Blog>;
    @ViewChild(BlogDetailComponent) control2: BlogDetailComponent;
    @ViewChild("blogslist") listViewControl: ElementRef;

    constructor(private blogService: BlogService, private location: Location) {
        this.Blogs = new ObservableArray<Blog>();
    }

    ngOnInit() {
        this.getBlogs();
    }

    // Event Feedback from Child Control
    changeStatus(BlogID: number) {
        this.changeShowStatus(BlogID);
    }

    private changeShowStatus(BlogID: Number): void {

        //  this.Blogs.filter(x=> x.BlogID == BlogID)
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

        // Refresh listview
        let lvcontainer = <ListView>this.listViewControl.nativeElement;
        lvcontainer.refresh();

    }

    // nb: subscribe arm still required
    getBlogs(pullRefresh?: any): void {
        var that = this;

        // Reset Array
        that.Blogs.length = 0;

        // Get Blogs and Push into observable
        this.blogService.getBlogs()
            .map(function (params) {
                params.forEach(function (entry) {
                    that.Blogs.push(new Blog(entry.BlogID, entry.SLUGID, entry.Title, entry.Summary, false));
                });
            })
            .subscribe();
    }


    public refreshPage(args: any) {
        console.log("Blogs Refresh -> go");
        let pullRefresh = args.object;

        setTimeout(() => {
            this.getBlogs(pullRefresh);
        }, 1500);
    }

    public onNavigationButtonTap() {
        this.location.back();
    }
}