import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/platform";
import { AppRoutingModule } from './app.routing';
import { AppComponent } from "./app.component";


import { ItemsComponent } from "./items.component";

import { FirstComponent } from './first.component';
import { SecondComponent } from './second.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        FirstComponent,
        SecondComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
