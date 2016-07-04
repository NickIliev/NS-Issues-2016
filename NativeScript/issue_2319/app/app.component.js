"use strict";
var core_1 = require("@angular/core");
var Order = (function () {
    function Order(id, status) {
        this.id = id;
        this.status = status;
        this.colors = ['red', 'orange', 'yellow', 'green', 'gray', 'blue'];
    }
    ;
    Order.prototype.getBgColor = function () {
        return this.colors[this.status];
    };
    return Order;
}());
exports.Order = Order;
var AppComponent = (function () {
    function AppComponent() {
        this.orders = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        var i;
        for (i = 0; i < 200; i++) {
            this.orders.push(new Order(i, i % 6));
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "list",
            template: "\n    <ListView [items]=\"orders\">\n        <template let-item=\"item\">\n            <StackLayout orientation=\"vertical\">\n                <StackLayout orientation=\"horizontal\" [class]=\"item.getBgColor()\">\n                    <Label text=\"class\"></Label>\n                    <Label text=\"\"></Label>\n                </StackLayout>\n                <StackLayout orientation=\"horizontal\" [backgroundColor]=\"item.getBgColor()\">\n                    <Label text=\"backgroundColor\"></Label>\n                    <Label text=\"\"></Label>\n                </StackLayout>\n                <Label [text]=\"item.id\"></Label>\n                <Label [text]=\"item.status\"></Label>\n                <Label [text]=\"item.getBgColor()\"></Label>\n            </StackLayout>\n        </template>\n    </ListView>    \n  ",
            styles: [
                '.red { background-color: red; }',
                '.orange { background-color: orange; }',
                '.yellow { background-color: yellow; }',
                '.green { background-color: green; }',
                '.gray { background-color: gray; }',
                '.blue { background-color: blue; }'
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map