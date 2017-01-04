import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { AppComponent } from "./app.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [NativeScriptModule, NativeScriptFormsModule, NativeScriptHttpModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
