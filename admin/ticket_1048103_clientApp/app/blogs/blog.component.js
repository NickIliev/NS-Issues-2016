"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var router_1 = require('nativescript-angular/router');
var http_1 = require('@angular/http');
var blog_service_1 = require('./blog.service');
var observable_array_1 = require('data/observable-array');
var blog_detail_component_1 = require("./blog.detail.component");
require('rxjs/Rx');
require('rxjs/add/operator/map');
var blog_interface_1 = require("./blog.interface");
var BlogComponent = (function () {
    function BlogComponent(blogService, location) {
        this.blogService = blogService;
        this.location = location;
        this.Title = "Blogs";
        this.Blogs = new observable_array_1.ObservableArray();
    }
    BlogComponent.prototype.ngOnInit = function () {
        this.getBlogs();
    };
    // Event Feedback from Child Control
    BlogComponent.prototype.changeStatus = function (BlogID) {
        this.changeShowStatus(BlogID);
    };
    BlogComponent.prototype.changeShowStatus = function (BlogID) {
        //  this.Blogs.filter(x=> x.BlogID == BlogID)
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
        // Refresh listview
        var lvcontainer = this.listViewControl.nativeElement;
        lvcontainer.refresh();
    };
    // nb: subscribe arm still required
    BlogComponent.prototype.getBlogs = function (pullRefresh) {
        var that = this;
        // Reset Array
        that.Blogs.length = 0;
        // Get Blogs and Push into observable
        this.blogService.getBlogs()
            .map(function (params) {
            params.forEach(function (entry) {
                that.Blogs.push(new blog_interface_1.Blog(entry.BlogID, entry.SLUGID, entry.Title, entry.Summary, false));
            });
        })
            .subscribe();
    };
    BlogComponent.prototype.refreshPage = function (args) {
        var _this = this;
        console.log("Blogs Refresh -> go");
        var pullRefresh = args.object;
        setTimeout(function () {
            _this.getBlogs(pullRefresh);
        }, 1500);
    };
    BlogComponent.prototype.onNavigationButtonTap = function () {
        this.location.back();
    };
    __decorate([
        core_1.ViewChild(blog_detail_component_1.BlogDetailComponent), 
        __metadata('design:type', blog_detail_component_1.BlogDetailComponent)
    ], BlogComponent.prototype, "control2", void 0);
    __decorate([
        core_1.ViewChild("blogslist"), 
        __metadata('design:type', core_1.ElementRef)
    ], BlogComponent.prototype, "listViewControl", void 0);
    BlogComponent = __decorate([
        core_1.Component({
            template: "\n<GridLayout>\n    <ActionBar [title]=\"Title\" class=\"action-bar\">\n        <NavigationButton text=\"Go Back\" android.systemIcon=\"ic_menu_back\" (tap)=\"onNavigationButtonTap()\"></NavigationButton> \n        <Label (tap)=\"refreshPage($event)\" ios.position=\"right\" horizontalAlignment=\"right\" text=\"Refresh\"></Label>\n    </ActionBar>\n    <StackLayout>\n        <ListView #blogslist [items]=\"Blogs\" backgroundColor=\"red\">\n            <template  let-item=\"item\" let-i=\"index\" let-odd=\"odd\" let-even=\"even\">\n                <StackLayout [class.odd]=\"odd\" [class.even]=\"even\" margin=\"0\">\n                    <blog-detail [Title]=\"item.Title\"\n                        [Show]=\"item.Show\"\n                        [Summary]=\"item.Summary\"\n                        [BlogID] =\"item.BlogID\"\n                        (changeStatus)=\"changeStatus($event)\"> \n                    </blog-detail>\n                </StackLayout>     \n            </template>\n        </ListView>\n    </StackLayout>\n</GridLayout>\n              ",
            directives: [router_1.NS_ROUTER_DIRECTIVES, blog_detail_component_1.BlogDetailComponent],
            providers: [http_1.HTTP_PROVIDERS, blog_service_1.BlogService],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [blog_service_1.BlogService, common_1.Location])
    ], BlogComponent);
    return BlogComponent;
}());
exports.BlogComponent = BlogComponent;
//# sourceMappingURL=blog.component.js.map