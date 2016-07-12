import * as elementRegistryModule from 'nativescript-angular/element-registry';
// >> using-global-directives
import { nativeScriptBootstrap } from "nativescript-angular/application";
import { SIDEDRAWER_PROVIDERS } from "nativescript-telerik-ui-pro/sidedrawer/angular";
import { LISTVIEW_PROVIDERS } from 'nativescript-telerik-ui-pro/listview/angular';
import { CALENDAR_PROVIDERS } from 'nativescript-telerik-ui-pro/calendar/angular';
import { CHART_PROVIDERS } from 'nativescript-telerik-ui-pro/chart/angular';
import { AppComponent } from "./navigation/app.component";
import { AppPageRouterOutletRouterProviders } from "./navigation/app.routes";
// >> (hide)
import { FrescoDrawee } from "fresco/fresco";
import * as applicationModule from "application";
import { OptionsService } from "./navigation/options/options.service";
import { ExampleItemService } from "./navigation/exampleItemService.service";
import { NS_ROUTER_PROVIDERS } from "nativescript-angular/router";
import { RouterConfig, ActivatedRoute, Router, ROUTER_DIRECTIVES, RouterOutletMap, Event } from '@angular/router';

if (applicationModule.android) {
    applicationModule.onLaunch = function (intent) {
        com.facebook.drawee.backends.pipeline.Fresco.initialize(applicationModule.android.context);
    };
}
elementRegistryModule.registerElement("FrescoDrawee", () => FrescoDrawee);
// << (hide)

nativeScriptBootstrap(AppComponent, [LISTVIEW_PROVIDERS, SIDEDRAWER_PROVIDERS, CALENDAR_PROVIDERS, CHART_PROVIDERS, 
                                        AppPageRouterOutletRouterProviders, OptionsService, ExampleItemService, NS_ROUTER_PROVIDERS, RouterOutletMap], 
                                    { startPageActionBarHidden: false });
// << using-global-directives