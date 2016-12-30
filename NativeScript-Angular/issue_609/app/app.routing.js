"use strict";
var core_1 = require('@angular/core');
var router_1 = require('nativescript-angular/router');
var items_component_1 = require('./items.component');
var first_component_1 = require('./first.component');
var second_component_1 = require('./second.component');
var routes = [
    {
        path: '',
        component: items_component_1.ItemsComponent,
        children: [
            { path: "first", component: first_component_1.FirstComponent },
            { path: "second", component: second_component_1.SecondComponent }
        ]
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forRoot(routes)],
            exports: [router_1.NativeScriptRouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app.routing.js.map