import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/platform";

import { AppComponent } from "./app.component";
import { SubComponentComponent } from "./subComponent.component";
import {ListItemComponent} from "./listItem.component";

@NgModule({
    declarations: [AppComponent, ListItemComponent, SubComponentComponent],
    bootstrap: [AppComponent],
    imports: [NativeScriptModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
