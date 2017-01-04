import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptModule } from "nativescript-angular/platform";

import { HttpModule } from '@angular/http';

import { BarcodeScanner } from "nativescript-barcodescanner";

import { AppComponent } from "./app.component";


@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        HttpModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        BarcodeScanner],
    bootstrap: [AppComponent]
})
export class AppModule { }