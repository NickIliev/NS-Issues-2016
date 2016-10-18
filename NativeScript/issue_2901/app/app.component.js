"use strict";
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        var timePicker = this.tp.nativeElement;
        timePicker.hour = 9;
        timePicker.minute = 25;
    };
    AppComponent.prototype.onTap = function () {
        var timePicker = this.tp.nativeElement;
        console.log(timePicker.hour + " : " + timePicker.minute);
    };
    __decorate([
        core_1.ViewChild("timePicker"), 
        __metadata('design:type', core_1.ElementRef)
    ], AppComponent.prototype, "tp", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'time-picker-component',
            templateUrl: 'app.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map