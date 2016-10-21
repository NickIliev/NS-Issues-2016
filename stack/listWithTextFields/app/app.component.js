"use strict";
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
        this.items = [];
        this.items = ["ala", "bala", "nica", "ala", "bala", "nica", "ala", "bala", "nica", "ala", "bala", "nica"];
    }
    AppComponent.prototype.onItemTap = function (args) {
        console.log(args.view);
        console.log(args.object);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "app.component.html",
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map