"use strict";
var core_1 = require('@angular/core');
var BlogNoTapDetailComponent = (function () {
    function BlogNoTapDetailComponent() {
    }
    __decorate([
        core_1.Input('BlogID'), 
        __metadata('design:type', Number)
    ], BlogNoTapDetailComponent.prototype, "BlogID", void 0);
    __decorate([
        core_1.Input('Title'), 
        __metadata('design:type', String)
    ], BlogNoTapDetailComponent.prototype, "Title", void 0);
    __decorate([
        core_1.Input('Summary'), 
        __metadata('design:type', String)
    ], BlogNoTapDetailComponent.prototype, "Summary", void 0);
    __decorate([
        core_1.Input('Show'), 
        __metadata('design:type', Boolean)
    ], BlogNoTapDetailComponent.prototype, "Show", void 0);
    BlogNoTapDetailComponent = __decorate([
        core_1.Component({
            selector: 'blog-detail',
            template: "\n           \n                <Label [text]=\"Title\" [class.focus-title]=\"Show\" margin=\"10\"></Label>\n                <Label [text]=\"Summary\" [class.focus-summary]=\"Show\" textWrap=\"true\"  [visibility]=\"Show ? 'visible' : 'collapsed'\" margin=\"10\" ></Label>\n          \n\t"
        }), 
        __metadata('design:paramtypes', [])
    ], BlogNoTapDetailComponent);
    return BlogNoTapDetailComponent;
}());
exports.BlogNoTapDetailComponent = BlogNoTapDetailComponent;
//# sourceMappingURL=blog.notap.detail.component.js.map