"use strict";
var router_1 = require("nativescript-angular/router");
var router_deprecated_1 = require("@angular/router-deprecated");
var core_1 = require("@angular/core");
var SecondListPage = (function () {
    function SecondListPage(_router) {
        this._router = _router;
        this.taskList = [];
    }
    SecondListPage.prototype.ngOnInit = function () {
        this.taskList.push({ title: "Kids to school" });
        this.taskList.push({ title: "Car wash" });
        this.taskList.push({ title: "Buy present" });
        this.taskList.push({ title: "Attend seminar" });
    };
    SecondListPage.prototype.goToFirst = function () {
        this._router.navigate(["FirstListPage"]);
    };
    SecondListPage = __decorate([
        core_1.Component({
            selector: "Second",
            directives: [router_1.NS_ROUTER_DIRECTIVES],
            template: "\n    <StackLayout>\n        <Button text=\"toFirst\" [nsRouterLink]=\"['FirstListPage']\"></Button>\n        <GridLayout>\n            <ListView [items]=\"taskList\" class=\"small-spacing\">\n                <template let-item=\"item\">\n                    <Label [text]=\"item.title\" class=\"medium-spacing\"></Label>\n                </template>\n            </ListView>\n        </GridLayout>\n    </StackLayout>\n    ",
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router])
    ], SecondListPage);
    return SecondListPage;
}());
exports.SecondListPage = SecondListPage;
//# sourceMappingURL=second-list.component.js.map