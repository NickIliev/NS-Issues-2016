// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { StockService } from "./stock.service";
import { CHART_DIRECTIVES } from 'nativescript-telerik-ui-pro/chart/angular';

@NgModule({
    declarations: [AppComponent,CHART_DIRECTIVES,],
    bootstrap: [AppComponent],
    imports: [NativeScriptModule],
     providers: [
        StockService
    ]
})
class AppComponentModule {}

platformNativeScriptDynamic().bootstrapModule(AppComponentModule);