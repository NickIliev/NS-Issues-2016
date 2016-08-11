"use strict";
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var application_1 = require("nativescript-angular/application");
var router_1 = require("nativescript-angular/router");
var http_1 = require('@angular/http');
var router_2 = require('@angular/router');
//UI
var angular_1 = require("nativescript-telerik-ui/sidedrawer/angular");
var angular_2 = require('nativescript-telerik-ui/listview/angular');
// Routing
var app_route_1 = require("./navigation/app.route");
var app_component_1 = require("./app.component");
///// HACK - fix dom adapter
var parse5_adapter_1 = require('@angular/platform-server/src/parse5_adapter');
parse5_adapter_1.Parse5DomAdapter.prototype.getCookie = function (name) { return null; };
///// HACK - fix dom adapter
application_1.nativeScriptBootstrap(app_component_1.AppComponent, [
    angular_2.LISTVIEW_PROVIDERS, angular_1.SIDEDRAWER_PROVIDERS,
    http_1.HTTP_PROVIDERS,
    app_route_1.APP_ROUTER_PROVIDERS,
    router_1.NS_ROUTER_PROVIDERS,
    router_2.RouterOutletMap
], { startPageActionBarHidden: false });
//# sourceMappingURL=main.js.map