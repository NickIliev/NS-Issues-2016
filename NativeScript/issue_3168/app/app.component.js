"use strict";
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        this.source = ["ala", "bala", "nica"];
    };
    AppComponent.prototype.onMainGridTouch = function (args) {
        console.log(args.view);
        console.log(args.eventName);
        console.log("x: " + args.getX() + " y:" + args.getY());
        console.log(args.getAllPointers());
        var pointers = args.getAllPointers();
        for (var index = 0; index < pointers.length; index++) {
            var pointer = pointers[index];
            console.log(pointer.android);
        }
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