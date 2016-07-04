// this import should be first in order to load some required settings (like globals and reflect-metadata)
import {nativeScriptBootstrap} from "nativescript-angular/application";
import {AppComponent} from "./app.component";
/// <reference path="../node_modules/nativescript-azure-mobile-apps/azure-mobile-apps.d.ts" />
var azureModule = require("nativescript-azure-mobile-apps/client");
var client = new azureModule.MobileServiceClient("https://<PORTAL_NAME>.azurewebsites.net");

nativeScriptBootstrap(AppComponent);