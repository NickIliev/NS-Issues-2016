"use strict";
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        var viewButton = this.button.nativeElement;
        var viewBLabel = this.label.nativeElement;
        viewButton.text = "012345";
        viewBLabel.text = "012345";
    };
    __decorate([
        core_1.ViewChild("btn"), 
        __metadata('design:type', core_1.ElementRef)
    ], AppComponent.prototype, "button", void 0);
    __decorate([
        core_1.ViewChild("lbl"), 
        __metadata('design:type', core_1.ElementRef)
    ], AppComponent.prototype, "label", void 0);
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