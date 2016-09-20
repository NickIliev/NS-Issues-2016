"use strict";
var core_1 = require("@angular/core");
var NestedComponentChild = (function () {
    function NestedComponentChild() {
        this.counter = 0;
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], NestedComponentChild.prototype, "counter", void 0);
    NestedComponentChild = __decorate([
        core_1.Component({
            selector: "NestedComponentChild",
            template: "\n    <Label [text]='\"Child #\" + counter'></Label>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], NestedComponentChild);
    return NestedComponentChild;
}());
exports.NestedComponentChild = NestedComponentChild;
//# sourceMappingURL=NestedComponentChild.js.map