"use strict";
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var platform_1 = require("nativescript-angular/platform");
var core_1 = require("@angular/core");
var app_component_1 = require("./app.component");
var angular_1 = require("nativescript-telerik-ui-pro/sidedrawer/angular");
var angular_2 = require('nativescript-telerik-ui-pro/listview/angular');
var angular_3 = require('nativescript-telerik-ui-pro/calendar/angular');
var angular_4 = require('nativescript-telerik-ui-pro/chart/angular');
var AppComponentModule = (function () {
    function AppComponentModule() {
    }
    AppComponentModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                angular_2.LISTVIEW_DIRECTIVES,
                angular_1.SIDEDRAWER_DIRECTIVES,
                angular_3.CALENDAR_DIRECTIVES,
                angular_4.CHART_DIRECTIVES,
            ],
            bootstrap: [app_component_1.AppComponent],
            imports: [platform_1.NativeScriptModule],
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponentModule);
    return AppComponentModule;
}());
platform_1.platformNativeScriptDynamic().bootstrapModule(AppComponentModule);
//# sourceMappingURL=main.js.map