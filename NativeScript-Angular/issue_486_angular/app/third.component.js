"use strict";
var core_1 = require("@angular/core");
var router_1 = require('nativescript-angular/router');
var ThirdComponent = (function () {
    function ThirdComponent(routerExtensions) {
        this.routerExtensions = routerExtensions;
    }
    ThirdComponent.prototype.goBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    ThirdComponent = __decorate([
        core_1.Component({
            selector: 'third',
            templateUrl: 'third.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.RouterExtensions])
    ], ThirdComponent);
    return ThirdComponent;
}());
exports.ThirdComponent = ThirdComponent;
//# sourceMappingURL=third.component.js.map