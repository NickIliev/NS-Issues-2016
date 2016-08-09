import * as elementRegistryModule from 'nativescript-angular/element-registry';

// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { nativeScriptBootstrap } from "nativescript-angular/application";
import { NS_ROUTER_PROVIDERS } from "nativescript-angular/router";
import { HTTP_PROVIDERS } from '@angular/http';
import { RouterConfig, ActivatedRoute, Router, ROUTER_DIRECTIVES, RouterOutletMap, Event } from '@angular/router';

//UI
import { SIDEDRAWER_PROVIDERS } from "nativescript-telerik-ui/sidedrawer/angular";
import { LISTVIEW_PROVIDERS } from 'nativescript-telerik-ui/listview/angular';


// Routing
import { APP_ROUTER_PROVIDERS } from "./navigation/app.route";
import { AppComponent } from "./app.component"

///// HACK - fix dom adapter
import {Parse5DomAdapter} from '@angular/platform-server/src/parse5_adapter';
(<any>Parse5DomAdapter).prototype.getCookie = function (name) { return null; };
///// HACK - fix dom adapter

nativeScriptBootstrap(AppComponent, [
    LISTVIEW_PROVIDERS, SIDEDRAWER_PROVIDERS,
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    NS_ROUTER_PROVIDERS, 
    RouterOutletMap
],  { startPageActionBarHidden: false });

