"use strict";
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var ProductsService = (function () {
    function ProductsService(http) {
        this.http = http;
    }
    ProductsService.prototype.getList = function () {
        return this.http.get('/api/list').map(function (res) { return res.json(); });
    };
    return ProductsService;
}());
ProductsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map