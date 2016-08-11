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
var BlogUIComponent = (function () {
    //get instance of the page in the constructor
    function BlogUIComponent(blogService, location, page) {
        this.blogService = blogService;
        this.location = location;
        this.page = page;
        this.Title = "Blogs";
        this.Blogs = new observable_array_1.ObservableArray();
    }
    BlogUIComponent.prototype.ngOnInit = function () {
        this.getBlogs();
    };
    BlogUIComponent.prototype.changeStatus = function (BlogID) {
        this.changeShowStatus(BlogID);
    };
    BlogUIComponent.prototype.changeShowStatus = function (BlogID) {
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
    BlogUIComponent.prototype.getBlogs = function (pullRefresh) {
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
    BlogUIComponent.prototype.refreshPage = function (args) {
        var _this = this;
        console.log("Blogs Refresh -> go");
        var pullRefresh = args.object;
        setTimeout(function () {
            _this.getBlogs(pullRefresh);
            var listView = args.object;
            listView.notifyPullToRefreshFinished();
        }, 1000);
    };
    BlogUIComponent.prototype.onNavigationButtonTap = function () {
        this.location.back();
    };
    __decorate([
        core_1.ViewChild(blog_detail_component_1.BlogDetailComponent), 
        __metadata('design:type', blog_detail_component_1.BlogDetailComponent)
    ], BlogUIComponent.prototype, "control2", void 0);
    BlogUIComponent = __decorate([
        core_1.Component({
            template: "\n   \n        <ActionBar [title]=\"Title\" class=\"action-bar\">\n             <NavigationButton text=\"Go Back\" android.systemIcon=\"ic_menu_back\"\n                (tap)=\"onNavigationButtonTap()\"></NavigationButton> \n  \n            <Label (tap)=\"refreshPage($event)\" ios.position=\"right\" horizontalAlignment=\"right\"\n                text=\"Refresh\"></Label>\n        </ActionBar>\n  \n          \n \n                <RadListView   id=\"blogslist\"\n                pullToRefresh=\"true\" \n                (pullToRefreshInitiated)=\"refreshPage($event)\" \n                [items]=\"Blogs\" >\n                        <template listItemTemplate let-item=\"item\" let-i=\"index\" let-odd=\"odd\" let-even=\"even\">\n                            <StackLayout [class.odd]=\"odd\" [class.even]=\"even\" margin=\"0\">\n                             <blog-detail [Title]=\"item.Title\"\n                                 [Show]=\"item.Show\"\n                                 [Summary]=\"item.Summary\"\n                                 [BlogID] =\"item.BlogID\"\n                                 (changeStatus)=\"changeStatus($event)\"\n                                 > \n                             </blog-detail>\n \n                            </StackLayout>     \n                        </template>\n                    </RadListView>\n         \n   \n              ",
            directives: [router_1.NS_ROUTER_DIRECTIVES, blog_detail_component_1.BlogDetailComponent],
            providers: [http_1.HTTP_PROVIDERS, blog_service_1.BlogService],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [blog_service_1.BlogService, common_1.Location, page_1.Page])
    ], BlogUIComponent);
    return BlogUIComponent;
}());
exports.BlogUIComponent = BlogUIComponent;
//# sourceMappingURL=blogui.component.js.map