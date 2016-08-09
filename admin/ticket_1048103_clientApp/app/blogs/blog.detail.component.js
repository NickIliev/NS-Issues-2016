"use strict";
var core_1 = require('@angular/core');
var BlogDetailComponent = (function () {
    function BlogDetailComponent() {
        this.changeStatus = new core_1.EventEmitter();
    }
    BlogDetailComponent.prototype.ngOnInit = function () {
        this.Show = true;
    };
    __decorate([
        core_1.Input('BlogID'), 
        __metadata('design:type', Number)
    ], BlogDetailComponent.prototype, "BlogID", void 0);
    __decorate([
        core_1.Input('Title'), 
        __metadata('design:type', String)
    ], BlogDetailComponent.prototype, "Title", void 0);
    __decorate([
        core_1.Input('Summary'), 
        __metadata('design:type', String)
    ], BlogDetailComponent.prototype, "Summary", void 0);
    __decorate([
        core_1.Input('Show'), 
        __metadata('design:type', Boolean)
    ], BlogDetailComponent.prototype, "Show", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BlogDetailComponent.prototype, "changeStatus", void 0);
    BlogDetailComponent = __decorate([
        core_1.Component({
            selector: 'blog-detail',
            template: "\n            <!-- this event is causing the swipes of the parent not to work (touch)=\"blogTapEvent($event)\"-->\n            <!-- from user point of view it is very confusing tho have nested elements with different logic-->\n            <!-- for gestures - for examlple which swipe to execute if we have two nested swipes!?-->\n            <!-- that is why the default behaviour is only the final nested element to execute the gesture -->\n            <StackLayout >\n                <Label [text]=\"Title\" [class.focus-title]=\"Show\" margin=\"10\"></Label>\n                <Label [text]=\"Summary\" [class.focus-summary]=\"Show\" textWrap=\"true\"  [visibility]=\"Show ? 'visible' : 'collapsed'\" margin=\"10\" ></Label>\n            </StackLayout>\n\t"
        }), 
        __metadata('design:paramtypes', [])
    ], BlogDetailComponent);
    return BlogDetailComponent;
}());
exports.BlogDetailComponent = BlogDetailComponent;
//# sourceMappingURL=blog.detail.component.js.map