var core_1 = require('@angular/core');
var platform_1 = require("nativescript-angular/platform");
var router_1 = require("nativescript-angular/router");
var app_routes_1 = require("./app.routes");
var NavigationApp = (function () {
    function NavigationApp() {
    }
    NavigationApp = __decorate([
        core_1.Component({
            selector: 'navigation-test',
            template: "\n        <StackLayout>\n            <StackLayout class=\"nav\">\n                <Button text=\"First\" \n                    [nsRouterLink]=\"['/first']\"></Button>\n                <Button text=\"Second\"\n                    [nsRouterLink]=\"['/second']\"></Button>\n            </StackLayout>\n\n            <router-outlet></router-outlet>\n        </StackLayout>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], NavigationApp);
    return NavigationApp;
}());
exports.NavigationApp = NavigationApp;
var NavigationAppModule = (function () {
    function NavigationAppModule() {
    }
    NavigationAppModule = __decorate([
        core_1.NgModule({
            bootstrap: [NavigationApp],
            imports: [
                router_1.NativeScriptRouterModule,
                router_1.NativeScriptRouterModule.forRoot(app_routes_1.routes)
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], NavigationAppModule);
    return NavigationAppModule;
}());
exports.NavigationAppModule = NavigationAppModule;
platform_1.platformNativeScriptDynamic().bootstrapModule(NavigationAppModule);
//# sourceMappingURL=main.js.map