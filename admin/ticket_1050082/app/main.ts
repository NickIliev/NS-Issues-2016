// this import should be first in order to load some required settings (like globals and reflect-metadata)

import { AppComponent } from "./app.component";
import { nativeScriptBootstrap } from "nativescript-angular/application";
import { SIDEDRAWER_PROVIDERS } from "nativescript-telerik-ui-pro/sidedrawer/angular";
import { LISTVIEW_PROVIDERS } from 'nativescript-telerik-ui-pro/listview/angular';
import { CALENDAR_PROVIDERS } from 'nativescript-telerik-ui-pro/calendar/angular';
import { CHART_PROVIDERS } from 'nativescript-telerik-ui-pro/chart/angular';

nativeScriptBootstrap(AppComponent, [LISTVIEW_PROVIDERS, SIDEDRAWER_PROVIDERS, CALENDAR_PROVIDERS, CHART_PROVIDERS], 
                                    { startPageActionBarHidden: false });
nativeScriptBootstrap(AppComponent);