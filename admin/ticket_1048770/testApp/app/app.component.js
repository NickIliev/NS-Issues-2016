"use strict";
var core_1 = require("@angular/core");
var router_deprecated_1 = require("@angular/router-deprecated");
var router_deprecated_2 = require("nativescript-angular/router-deprecated");
//importing classes
var list_component_1 = require("./components/list/list.component");
var create_component_1 = require("./components/create/create.component");
var auth_component_1 = require("./components/authentication/auth.component");
var menu_component_1 = require("./components/menu/menu.component");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            directives: [router_deprecated_2.NS_ROUTER_DIRECTIVES],
            providers: [router_deprecated_2.NS_ROUTER_PROVIDERS],
            template: "<page-router-outlet></page-router-outlet>",
        }),
        router_deprecated_1.RouteConfig([
            { path: "/auth", component: auth_component_1.AuthenticationPage, name: "Auth", useAsDefault: true },
            { path: "/menu", component: menu_component_1.MenuComponent, name: "Menu" },
            { path: "/list", component: list_component_1.ListComponent, name: "List" },
            { path: "/create", component: create_component_1.CreateComponent, name: "Create" },
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map