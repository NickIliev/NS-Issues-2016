"use strict";
var core_1 = require('@angular/core');
var app_component_1 = require('./app.component');
var booking_component_1 = require("./shared/booking/booking.component");
var http_1 = require('@angular/http');
var router_1 = require("nativescript-angular/router");
var forms_1 = require("nativescript-angular/forms");
var http_2 = require("nativescript-angular/http");
var platform_1 = require("nativescript-angular/platform");
/**
 * This override is required by the current Appointedd API to accept requests.
 */
var MyRequestOptions = (function (_super) {
    __extends(MyRequestOptions, _super);
    function MyRequestOptions() {
        _super.call(this);
        this.headers.append('X-Request-Src', 'angular');
    }
    return MyRequestOptions;
}(http_1.BaseRequestOptions));
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [app_component_1.AppComponent],
            imports: [
                platform_1.NativeScriptModule,
                router_1.NativeScriptRouterModule,
                forms_1.NativeScriptFormsModule,
                http_2.NativeScriptHttpModule,
            ],
            providers: [
                {
                    provide: http_1.RequestOptions,
                    useClass: MyRequestOptions
                }
            ],
            declarations: [
                app_component_1.AppComponent,
                booking_component_1.BookingSharedComponent
            ],
            entryComponents: []
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map