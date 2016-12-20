"use strict";
var core_1 = require("@angular/core");
var observable_array_1 = require("data/observable-array");
var item_service_1 = require("./item.service");
var ItemsComponent = (function () {
    function ItemsComponent(itemService) {
        this.itemService = itemService;
    }
    ItemsComponent.prototype.ngOnInit = function () {
        this.items = new observable_array_1.ObservableArray(this.itemService.getItems());
    };
    ItemsComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            templateUrl: "items.component.html",
        }), 
        __metadata('design:paramtypes', [item_service_1.ItemService])
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=items.component.js.map