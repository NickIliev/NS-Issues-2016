"use strict";
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var NestedComponentChild_1 = require("./NestedComponentChild");
var NestedComponentParent = (function () {
    function NestedComponentParent(page, vcRef) {
        this.page = page;
        this.items = [];
        this.counter = 0;
    }
    NestedComponentParent.prototype.addChild = function () {
        this.counter++;
        this.items.push(this.counter);
    };
    NestedComponentParent = __decorate([
        core_1.Component({
            selector: "NestedComponentParent",
            template: "\n    <StackLayout #contentStack>\n        <Label text=\"Text on parent\"></Label>\n        <Button (tap)=\"addChild()\" text=\"Add child\"></Button>\n        <NestedComponentChild *ngFor=\"let idx of items\" [counter]=\"idx\"></NestedComponentChild>\n    </StackLayout>\n  ",
            directives: [NestedComponentChild_1.NestedComponentChild]
        }), 
        __metadata('design:paramtypes', [page_1.Page, core_1.ViewContainerRef])
    ], NestedComponentParent);
    return NestedComponentParent;
}());
exports.NestedComponentParent = NestedComponentParent;
//# sourceMappingURL=app.component.js.map