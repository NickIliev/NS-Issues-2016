"use strict";
var core_1 = require("@angular/core");
var router_1 = require('nativescript-angular/router');
var FirstComponent = (function () {
    function FirstComponent(routerExtensions) {
        this.routerExtensions = routerExtensions;
        this.counter = 16;
    }
    Object.defineProperty(FirstComponent.prototype, "message", {
        get: function () {
            if (this.counter > 0) {
                return this.counter + " taps left";
            }
            else {
                return "Hoorraaay! \nYou are ready to start building!";
            }
        },
        enumerable: true,
        configurable: true
    });
    FirstComponent.prototype.onTap = function () {
        this.counter--;
    };
    FirstComponent.prototype.toSec = function () {
        this.routerExtensions.navigate(["/secondary"], { clearHistory: true });
    };
    FirstComponent.prototype.toThird = function () {
        this.routerExtensions.navigate(["/third"], { clearHistory: false });
    };
    FirstComponent = __decorate([
        core_1.Component({
            selector: "first",
            templateUrl: "first.component.html",
        }), 
        __metadata('design:paramtypes', [router_1.RouterExtensions])
    ], FirstComponent);
    return FirstComponent;
}());
exports.FirstComponent = FirstComponent;
//# sourceMappingURL=first.component.js.map