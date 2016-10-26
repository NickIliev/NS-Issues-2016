"use strict";
var core_1 = require("@angular/core");
var observable_array_1 = require("data/observable-array");
var data_service_1 = require("./data.service");
var AppComponent = (function () {
    function AppComponent(_dataService) {
        this._dataService = _dataService;
    }
    Object.defineProperty(AppComponent.prototype, "categoricalSource", {
        get: function () {
            return this._categoricalSource;
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.ngOnInit = function () {
        this._categoricalSource = new observable_array_1.ObservableArray(this._dataService.getCategoricalSource());
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            providers: [data_service_1.DataService],
            templateUrl: "app.component.html",
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map