"use strict";
var core_1 = require("@angular/core");
var tab_view_1 = require('ui/tab-view');
var AppComponent = (function () {
    function AppComponent() {
        this.selectedIndex = 1;
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.tabs.nativeElement.on(tab_view_1.TabView.selectedIndexChangedEvent, function (args) {
            switch (args.newIndex) {
                case 0:
                    console.log('first selected');
                    _this.tabOne.nativeElement.cssClass = "elephant";
                    break;
                case 1:
                    console.log('second selected');
                    _this.tabTwo.nativeElement.cssClass = "logo";
                    break;
            }
        });
    };
    __decorate([
        core_1.ViewChild("tabs"), 
        __metadata('design:type', core_1.ElementRef)
    ], AppComponent.prototype, "tabs", void 0);
    __decorate([
        core_1.ViewChild("tabOne"), 
        __metadata('design:type', core_1.ElementRef)
    ], AppComponent.prototype, "tabOne", void 0);
    __decorate([
        core_1.ViewChild("tabTwo"), 
        __metadata('design:type', core_1.ElementRef)
    ], AppComponent.prototype, "tabTwo", void 0);
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