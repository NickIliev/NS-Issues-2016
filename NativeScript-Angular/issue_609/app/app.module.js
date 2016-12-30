"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("nativescript-angular/platform");
var app_routing_1 = require('./app.routing');
var app_component_1 = require("./app.component");
var item_service_1 = require('./item.service');
var items_component_1 = require("./items.component");
var item_detail_component_1 = require("./item-detail.component");
var first_component_1 = require('./first.component');
var second_component_1 = require('./second.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                platform_1.NativeScriptModule,
                app_routing_1.AppRoutingModule
            ],
            declarations: [
                app_component_1.AppComponent,
                items_component_1.ItemsComponent,
                first_component_1.FirstComponent,
                second_component_1.SecondComponent,
                item_detail_component_1.ItemDetailComponent
            ],
            providers: [
                item_service_1.ItemService
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map