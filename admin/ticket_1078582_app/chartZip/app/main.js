"use strict";
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var platform_1 = require("nativescript-angular/platform");
var core_1 = require("@angular/core");
var app_component_1 = require("./app.component");
var stock_service_1 = require("./stock.service");
var angular_1 = require("nativescript-telerik-ui-pro/chart/angular");
var AppComponentModule = (function () {
    function AppComponentModule() {
    }
    return AppComponentModule;
}());
AppComponentModule = __decorate([
    core_1.NgModule({
        declarations: [app_component_1.AppComponent, angular_1.CHART_DIRECTIVES,],
        bootstrap: [app_component_1.AppComponent],
        imports: [platform_1.NativeScriptModule],
        providers: [
            stock_service_1.StockService
        ]
    }),
    __metadata("design:paramtypes", [])
], AppComponentModule);
platform_1.platformNativeScriptDynamic().bootstrapModule(AppComponentModule);
//# sourceMappingURL=main.js.map