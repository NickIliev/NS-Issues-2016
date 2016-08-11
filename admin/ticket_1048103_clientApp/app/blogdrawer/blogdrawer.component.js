"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var router_1 = require('nativescript-angular/router');
var http_1 = require('@angular/http');
var blog_service_1 = require('../blogs/blog.service');
var observable_array_1 = require('data/observable-array');
var blog_detail_component_1 = require("../blogs/blog.detail.component");
var page_1 = require("ui/page");
require('rxjs/Rx');
require('rxjs/add/operator/map');
var blog_interface_1 = require("../blogs/blog.interface");
var angular_1 = require("nativescript-telerik-ui/sidedrawer/angular");
var BlogDrawerComponent = (function () {
    //get instance of the page in the constructor
    function BlogDrawerComponent(blogService, location, page, _changeDetectionRef) {
        this.blogService = blogService;
        this.location = location;
        this.page = page;
        this._changeDetectionRef = _changeDetectionRef;
        this.Title = "Blogs";
        this.Blogs = new observable_array_1.ObservableArray();
    }
    BlogDrawerComponent.prototype.ngOnInit = function () {
        this.getBlogs();
    };
    BlogDrawerComponent.prototype.ngAfterViewInit = function () {
        this._drawer = this.drawerComponent.sideDrawer;
    };
    //>> Drawer
    BlogDrawerComponent.prototype.openDrawer = function () {
        this._drawer.showDrawer();
    };
    //>> Drawer
    BlogDrawerComponent.prototype.changeStatus = function (BlogID) {
        this.changeShowStatus(BlogID);
    };
    BlogDrawerComponent.prototype.changeShowStatus = function (BlogID) {
        this.Blogs.forEach(function (x) {
            if (x.BlogID == BlogID) {
                if (x.Show) {
                    x.Show = false;
                }
                else {
                    x.Show = true;
                }
            }
            else {
                x.Show = false;
            }
        });
        // get RadListView using its id
        var lvcontainer = this.page.getViewById("blogslist");
        lvcontainer.refresh();
    };
    BlogDrawerComponent.prototype.getBlogs = function (pullRefresh) {
        var that = this;
        that.Blogs.length = 0;
        this.blogService.getBlogs()
            .map(function (params) {
            params.forEach(function (entry) {
                that.Blogs.push(new blog_interface_1.Blog(entry.BlogID, entry.SLUGID, entry.Title, entry.Summary, false));
            });
        })
            .subscribe();
    };
    BlogDrawerComponent.prototype.radlistviewloaded = function () {
        console.log("list view loaded");
    };
    BlogDrawerComponent.prototype.refreshPage = function (args) {
        var _this = this;
        console.log("Blogs Refresh -> go");
        var pullRefresh = args.object;
        setTimeout(function () {
            _this.getBlogs(pullRefresh);
            var listView = args.object;
            listView.notifyPullToRefreshFinished();
        }, 1000);
    };
    BlogDrawerComponent.prototype.onNavigationButtonTap = function () {
        this.location.back();
    };
    __decorate([
        core_1.ViewChild(blog_detail_component_1.BlogDetailComponent), 
        __metadata('design:type', blog_detail_component_1.BlogDetailComponent)
    ], BlogDrawerComponent.prototype, "control2", void 0);
    __decorate([
        core_1.ViewChild(angular_1.RadSideDrawerComponent), 
        __metadata('design:type', angular_1.RadSideDrawerComponent)
    ], BlogDrawerComponent.prototype, "drawerComponent", void 0);
    BlogDrawerComponent = __decorate([
        core_1.Component({
            template: "\n<ActionBar [title]=\"Title\" class=\"action-bar\">\n    <NavigationButton text=\"Go Back\" android.systemIcon=\"ic_menu_back\" (tap)=\"onNavigationButtonTap()\"></NavigationButton> \n    <Label (tap)=\"refreshPage($event)\" ios.position=\"right\" horizontalAlignment=\"right\" text=\"Refresh\"></Label>\n    <Label (tap)=\"openDrawer()\" ios.position=\"right\" horizontalAlignment=\"right\" text=\"Draw\"></Label>\n</ActionBar>\n  \n<RadSideDrawer #drawer>\n    <template drawerSide>\n        <StackLayout class=\"sideStackLayout\">\n            <StackLayout class=\"sideTitleStackLayout\">\n                <Label text=\"Navigation Menu\"></Label>\n            </StackLayout>\n            <StackLayout class=\"sideStackLayout\">\n                <Label text=\"Test Link1\"></Label>\n                <Label text=\"Test Link2\"></Label>\n            </StackLayout>\n        </StackLayout>\n    </template>\n    <template drawerMain>\n        <RadListView   id=\"blogslist\" pullToRefresh=\"true\" (pullToRefreshInitiated)=\"refreshPage($event)\" [items]=\"Blogs\" >\n                <template listItemTemplate let-item=\"item\" let-i=\"index\" let-odd=\"odd\" let-even=\"even\">\n                    <StackLayout [class.odd]=\"odd\" [class.even]=\"even\" margin=\"0\">\n                        <blog-detail [Title]=\"item.Title\"\n                            [Show]=\"item.Show\"\n                            [Summary]=\"item.Summary\"\n                            [BlogID] =\"item.BlogID\"\n                            (changeStatus)=\"changeStatus($event)\"> \n                        </blog-detail>\n                    </StackLayout>     \n                </template>\n        </RadListView>      \n    </template>\n</RadSideDrawer>\n   \n              ",
            directives: [router_1.NS_ROUTER_DIRECTIVES, blog_detail_component_1.BlogDetailComponent],
            providers: [http_1.HTTP_PROVIDERS, blog_service_1.BlogService],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [blog_service_1.BlogService, common_1.Location, page_1.Page, core_1.ChangeDetectorRef])
    ], BlogDrawerComponent);
    return BlogDrawerComponent;
}());
exports.BlogDrawerComponent = BlogDrawerComponent;
//# sourceMappingURL=blogdrawer.component.js.map