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
var FrameModule = require("ui/frame");
// >> Font
var nativescript_ng2_fonticon_1 = require('nativescript-ng2-fonticon');
// << Font
var selectedItemIndex; // will use this to cache your args.itemIndex where we can get it (lazy loading)
var BlogSwipeComponent = (function () {
    //get instance of the page in the constructor
    function BlogSwipeComponent(blogService, location, page, fonticon) {
        this.blogService = blogService;
        this.location = location;
        this.page = page;
        this.fonticon = fonticon;
        this.Title = "Blogs";
        this.Blogs = new observable_array_1.ObservableArray();
    }
    BlogSwipeComponent.prototype.ngOnInit = function () {
        this.getBlogs();
    };
    BlogSwipeComponent.prototype.changeStatus = function (BlogID) {
        console.log("Change in PARENT triggered from child control !");
        this.changeShowStatus(BlogID);
    };
    BlogSwipeComponent.prototype.getBlogs = function (pullRefresh) {
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
    BlogSwipeComponent.prototype.refreshPage = function (args) {
        var _this = this;
        console.log("Blogs Refresh -> go");
        var pullRefresh = args.object;
        setTimeout(function () {
            _this.getBlogs(pullRefresh);
            var listView = args.object;
            listView.notifyPullToRefreshFinished();
        }, 1000);
    };
    BlogSwipeComponent.prototype.changeShowStatus = function (BlogID) {
        console.log("Change in show detail triggered");
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
    // >> Swipe
    BlogSwipeComponent.prototype.onCellSwiping = function (args) {
        var swipeLimits = args.data.swipeLimits;
        var currentItemView = args.object;
        var currentView;
        console.log("Swipe");
        if (args.data.x > 200) {
            console.log("Notify perform left action");
        }
        else if (args.data.x < -200) {
            console.log("Notify perform right action");
        }
    };
    BlogSwipeComponent.prototype.onSwipeCellStarted = function (args) {
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
    };
    BlogSwipeComponent.prototype.onSwipeCellFinished = function (args) {
        if (args.data.x > 200) {
            console.log("Perform left action");
        }
        else if (args.data.x < -200) {
            console.log("Perform right action");
        }
    };
    BlogSwipeComponent.prototype.onLeftSwipeClick = function (args) {
        console.log("Left swipe button is tapped");
    };
    BlogSwipeComponent.prototype.onRightSwipeClick = function (args) {
        console.log("Right swipe button is tapped");
        console.log("The index of the item you want to delete is " + selectedItemIndex);
        // console.log(args.itemIndex); // won't work - you will need to get your itemIndex when the
        //var selectedBlog = this.Blogs[args.itemIndex]; //won't work - see above - where Blogs is your data array
        // var currentTitle = selectedBlog.Title; // the same applies to any other key value
        // console.log(currentTitle);
        //this.changeShowStatus(selectedBlog.BlogID);
    };
    BlogSwipeComponent.prototype.onItemSelected = function (args) {
        // see below to know where selectedItemIndex comes from
        // var selectedBlog = this.Blogs[selectedItemIndex]; // where Blogs is your data array
        // var currentTitle = selectedBlog.BlogID; // the same applies to any other key value
        // console.log(currentTitle);
    };
    // << Swipe
    BlogSwipeComponent.prototype.onItemClick = function (args) {
        var listView = FrameModule.topmost().currentPage.getViewById("blogslist");
        listView.notifySwipeToExecuteFinished();
        selectedItemIndex = args.itemIndex;
        var oBlog = this.Blogs.getItem(selectedItemIndex);
        console.log("Title is " + oBlog.Title);
        this.changeShowStatus(oBlog.BlogID);
    };
    BlogSwipeComponent.prototype.onNavigationButtonTap = function () {
        this.location.back();
    };
    __decorate([
        core_1.ViewChild(blog_detail_component_1.BlogDetailComponent), 
        __metadata('design:type', blog_detail_component_1.BlogDetailComponent)
    ], BlogSwipeComponent.prototype, "control2", void 0);
    BlogSwipeComponent = __decorate([
        // will use this to cache your args.itemIndex where we can get it (lazy loading)
        core_1.Component({
            template: "\n   \n<ActionBar [title]=\"Title\" class=\"action-bar\">\n    <NavigationButton text=\"Go Back\" android.systemIcon=\"ic_menu_back\" (tap)=\"onNavigationButtonTap()\"></NavigationButton> \n    <Label (tap)=\"refreshPage($event)\" ios.position=\"right\" horizontalAlignment=\"right\" text=\"Refresh\"></Label>\n</ActionBar>\n\n \n      \n<GridLayout rows=\"auto, *\">\n    <RadListView id=\"blogslist\" row=\"1\"\n                pullToRefresh=\"true\" \n                (pullToRefreshInitiated)=\"refreshPage($event)\" \n                [items]=\"Blogs\" \n                itemSwipe=\"true\"\n                selectionBehavior=\"None\"\n                (itemSwipeProgressStarted)=\"onSwipeCellStarted($event)\"\n                (itemSwipeProgressChanged)=\"onCellSwiping($event)\" \n                (itemSwipeProgressEnded)=\"onSwipeCellFinished($event)\"\n                (itemTap)=\"onItemClick($event)\">\n\n        <template listItemTemplate let-item=\"item\"  let-item=\"item\" let-i=\"index\" let-odd=\"odd\" let-even=\"even\">\n             <StackLayout [class.odd]=\"odd\" [class.even]=\"even\" margin=\"0\">\n                   <blog-detail [Title]=\"item.Title\"\n                                 [Show]=\"item.Show\"\n                                 [Summary]=\"item.Summary\"\n                                 [BlogID] =\"item.BlogID\"> \n                    </blog-detail>\n            </StackLayout>\n        </template>\n\n        <GridLayout *listItemSwipeTemplate columns=\"auto, *, auto\" class=\"listItemSwipeGridLayout\">\n            <!-- remove the left button <StackLayout id=\"mark-view\" class=\"markViewStackLayout\" col=\"0\" (tap)=\"onLeftSwipeClick($event)\">\n                <Label text=\"mark\" verticalAlignment=\"center\" horizontalAlignment=\"center\"></Label>\n            </StackLayout> -->\n            <StackLayout id=\"delete-view\" class=\"deleteViewStackLayout\" col=\"2\" (tap)=\"onRightSwipeClick($event)\">\n                <Label class=\"fa\" [text]=\"'fa-trash' | fonticon\" verticalAlignment=\"center\" horizontalAlignment=\"center\"></Label>\n            </StackLayout>\n        </GridLayout>\n\n    </RadListView>\n</GridLayout>\n   \n              ",
            directives: [router_1.NS_ROUTER_DIRECTIVES, blog_detail_component_1.BlogDetailComponent],
            pipes: [nativescript_ng2_fonticon_1.TNSFontIconPipe],
            providers: [http_1.HTTP_PROVIDERS, blog_service_1.BlogService],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [blog_service_1.BlogService, common_1.Location, page_1.Page, nativescript_ng2_fonticon_1.TNSFontIconService])
    ], BlogSwipeComponent);
    return BlogSwipeComponent;
}());
exports.BlogSwipeComponent = BlogSwipeComponent;
//# sourceMappingURL=blogswipe.component.js.map