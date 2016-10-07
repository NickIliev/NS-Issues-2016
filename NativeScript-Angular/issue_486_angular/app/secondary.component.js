"use strict";
var core_1 = require("@angular/core");
var router_1 = require('nativescript-angular/router');
var SecondaryComponent = (function () {
    function SecondaryComponent(routerExtensions) {
        this.routerExtensions = routerExtensions;
    }
    SecondaryComponent.prototype.goBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    SecondaryComponent = __decorate([
        core_1.Component({
            selector: 'secondary',
            templateUrl: 'secondary.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.RouterExtensions])
    ], SecondaryComponent);
    return SecondaryComponent;
}());
exports.SecondaryComponent = SecondaryComponent;
//# sourceMappingURL=secondary.component.js.map