"use strict";
var core_1 = require("@angular/core");
var products_service_1 = require("./shared/products.service");
var ProductsComponent = (function () {
    function ProductsComponent(productsService) {
        this.productsService = productsService;
        this.products = [];
    }
    ProductsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.productsService.getList().subscribe(function (res) {
            _this.products = res;
        });
    };
    return ProductsComponent;
}());
ProductsComponent = __decorate([
    core_1.Component({
        selector: 'products',
        templateUrl: 'products.component.html',
        providers: [products_service_1.ProductsService]
    }),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsComponent);
exports.ProductsComponent = ProductsComponent;
//# sourceMappingURL=products.component.js.map