"use strict";
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var platform_1 = require("nativescript-angular/platform");
var app_routes_1 = require("./app.routes");
var app_component_1 = require("./app.component");
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var forms_1 = require("nativescript-angular/forms");
var AppComponentModule = (function () {
    function AppComponentModule() {
    }
    AppComponentModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent
            ].concat(app_routes_1.routableComponents),
            bootstrap: [app_component_1.AppComponent],
            imports: [
                platform_1.NativeScriptModule,
                forms_1.NativeScriptFormsModule,
                router_1.NativeScriptRouterModule,
                router_1.NativeScriptRouterModule.forRoot(app_routes_1.routes),
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponentModule);
    return AppComponentModule;
}());
platform_1.platformNativeScriptDynamic().bootstrapModule(AppComponentModule);
//# sourceMappingURL=main.js.map