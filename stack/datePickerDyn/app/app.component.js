"use strict";
var core_1 = require("@angular/core");
var dialogs = require("ui/dialogs");
var AppComponent = (function () {
    function AppComponent() {
        this.isVisible = false;
    }
    AppComponent.prototype.addTime = function () {
        var _this = this;
        dialogs.prompt({
            message: "Pick the date you work"
        }).then(function (r) {
            console.log(r.result + "\n" + r.text);
            _this.day = 31;
            _this.month = 12;
            _this.year = 2016;
            _this.isVisible = true;
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "app.component.html"
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map