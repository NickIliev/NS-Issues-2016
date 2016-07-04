"use strict";
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var application_1 = require("nativescript-angular/application");
var app_component_1 = require("./app.component");
/// <reference path="../node_modules/nativescript-azure-mobile-apps/azure-mobile-apps.d.ts" />
var azureModule = require("nativescript-azure-mobile-apps/client");
var client = new azureModule.MobileServiceClient("https://<PORTAL_NAME>.azurewebsites.net");
application_1.nativeScriptBootstrap(app_component_1.AppComponent);
//# sourceMappingURL=main.js.map