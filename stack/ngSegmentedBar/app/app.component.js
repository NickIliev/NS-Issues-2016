"use strict";
var core_1 = require('@angular/core');
var page_1 = require('ui/page');
var segmented_bar_1 = require('ui/segmented-bar');
var TabsComponent = (function () {
    function TabsComponent(page) {
        this.page = page;
        this.selectedIndex = 0;
        this.items = [{ title: 'First' }, { title: 'Second' }, { title: 'Third' }];
    }
    TabsComponent.prototype.ngOnInit = function () {
        this.firstTabContent.nativeElement.visibility = "visible";
        this.secondTabContent.nativeElement.visibility = "collapsed";
        this.thirdTabContent.nativeElement.visibility = "collapsed";
    };
    TabsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.tabs.nativeElement.on(segmented_bar_1.SegmentedBar.selectedIndexChangedEvent, function (args) {
            switch (args.newIndex) {
                case 0:
                    console.log('first selected');
                    _this.firstTabContent.nativeElement.visibility = "visible";
                    _this.secondTabContent.nativeElement.visibility = "collapsed";
                    _this.thirdTabContent.nativeElement.visibility = "collapsed";
                    break;
                case 1:
                    console.log('second selected');
                    _this.firstTabContent.nativeElement.visibility = "collapsed";
                    _this.secondTabContent.nativeElement.visibility = "visible";
                    _this.thirdTabContent.nativeElement.visibility = "collapsed";
                    break;
                case 2:
                    console.log('third selected');
                    _this.firstTabContent.nativeElement.visibility = "collapsed";
                    _this.secondTabContent.nativeElement.visibility = "collapsed";
                    _this.thirdTabContent.nativeElement.visibility = "visible";
                    break;
            }
        });
    };
    TabsComponent.prototype.ngOnDestroy = function () { };
    __decorate([
        core_1.ViewChild("tabs"), 
        __metadata('design:type', core_1.ElementRef)
    ], TabsComponent.prototype, "tabs", void 0);
    __decorate([
        core_1.ViewChild("firstTabContent"), 
        __metadata('design:type', core_1.ElementRef)
    ], TabsComponent.prototype, "firstTabContent", void 0);
    __decorate([
        core_1.ViewChild("secondTabContent"), 
        __metadata('design:type', core_1.ElementRef)
    ], TabsComponent.prototype, "secondTabContent", void 0);
    __decorate([
        core_1.ViewChild("thirdTabContent"), 
        __metadata('design:type', core_1.ElementRef)
    ], TabsComponent.prototype, "thirdTabContent", void 0);
    TabsComponent = __decorate([
        core_1.Component({
            selector: 'tabs',
            templateUrl: 'app.component.html'
        }), 
        __metadata('design:paramtypes', [page_1.Page])
    ], TabsComponent);
    return TabsComponent;
}());
exports.TabsComponent = TabsComponent;
//# sourceMappingURL=app.component.js.map