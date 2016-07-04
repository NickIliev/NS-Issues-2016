"use strict";
var router_1 = require("nativescript-angular/router");
var router_deprecated_1 = require("@angular/router-deprecated");
var core_1 = require("@angular/core");
var FirstListPage = (function () {
    function FirstListPage(_router) {
        this._router = _router;
        this.groceryList = [];
    }
    FirstListPage.prototype.ngOnInit = function () {
        this.groceryList.push({ name: "Apples" });
        this.groceryList.push({ name: "Bananas" });
        this.groceryList.push({ name: "Oranges" });
    };
    FirstListPage.prototype.goToSecond = function () {
        this._router.navigate(["SecondListPage"]);
    };
    FirstListPage = __decorate([
        core_1.Component({
            selector: "First",
            directives: [router_1.NS_ROUTER_DIRECTIVES],
            template: "\n    <StackLayout>\n        <Button text=\"toSecond\"  [nsRouterLink]=\"['SecondListPage']\"></Button>\n        <GridLayout>\n            <ListView [items]=\"groceryList\" class=\"small-spacing\">\n                <template let-item=\"item\">\n                    <Label [text]=\"item.name\" class=\"medium-spacing\"></Label>\n                </template>\n            </ListView>\n        </GridLayout>\n    </StackLayout>\n    ",
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router])
    ], FirstListPage);
    return FirstListPage;
}());
exports.FirstListPage = FirstListPage;
//# sourceMappingURL=first-list.component.js.map