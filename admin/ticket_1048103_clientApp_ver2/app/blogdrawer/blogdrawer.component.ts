import {Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, Input, ElementRef} from '@angular/core';

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

import sideDrawerModule = require("nativescript-telerik-ui/sidedrawer");
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-telerik-ui/sidedrawer/angular";

@Component({

    template: `
<ActionBar [title]="Title" class="action-bar">
    <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" (tap)="onNavigationButtonTap()"></NavigationButton> 
    <Label (tap)="refreshPage($event)" ios.position="right" horizontalAlignment="right" text="Refresh"></Label>
    <Label (tap)="openDrawer()" ios.position="right" horizontalAlignment="right" text="Draw"></Label>
</ActionBar>
  
<RadSideDrawer #drawer>
    <template drawerSide>
        <StackLayout class="sideStackLayout">
            <StackLayout class="sideTitleStackLayout">
                <Label text="Navigation Menu"></Label>
            </StackLayout>
            <StackLayout class="sideStackLayout">
                <Label text="Test Link1"></Label>
                <Label text="Test Link2"></Label>
            </StackLayout>
        </StackLayout>
    </template>
    <template drawerMain>
        <RadListView   id="blogslist" pullToRefresh="true" (pullToRefreshInitiated)="refreshPage($event)" [items]="Blogs" >
                <template listItemTemplate let-item="item" let-i="index" let-odd="odd" let-even="even">
                    <StackLayout [class.odd]="odd" [class.even]="even" margin="0">
                        <blog-detail [Title]="item.Title"
                            [Show]="item.Show"
                            [Summary]="item.Summary"
                            [BlogID] ="item.BlogID"
                            (changeStatus)="changeStatus($event)"> 
                        </blog-detail>
                    </StackLayout>     
                </template>
        </RadListView>      
    </template>
</RadSideDrawer>
   
              `,
    directives: [NS_ROUTER_DIRECTIVES, BlogDetailComponent],
    providers: [HTTP_PROVIDERS, BlogService],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class BlogDrawerComponent implements OnInit {

    public Title: string = "Blogs";
    public Blogs: ObservableArray<Blog>;
    @ViewChild(BlogDetailComponent) control2: BlogDetailComponent;

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private _drawer: SideDrawerType;

    //get instance of the page in the constructor
    constructor(private blogService: BlogService, private location: Location, private page: Page, private _changeDetectionRef: ChangeDetectorRef) {
        this.Blogs = new ObservableArray<Blog>();
    }

    ngOnInit() {
        this.getBlogs();
    }

    ngAfterViewInit() {
        this._drawer = this.drawerComponent.sideDrawer;
    }

    //>> Drawer
    public openDrawer() {
        this._drawer.showDrawer();
    }
    //>> Drawer


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

    
    public radlistviewloaded(){
        console.log("list view loaded")
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
