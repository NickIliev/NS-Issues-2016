import { NgModule, ErrorHandler }       from '@angular/core';
import { AppComponent }   from './app.component';
import { BookingSharedComponent } from "./shared/booking/booking.component";
import { BaseRequestOptions, RequestOptions} from '@angular/http';
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/platform";
import { rendererTraceCategory, routerTraceCategory, listViewTraceCategory } from "nativescript-angular/trace";

/**
 * This override is required by the current Appointedd API to accept requests.
 */
class MyRequestOptions extends BaseRequestOptions {
  constructor () {
    super();
    this.headers.append('X-Request-Src','angular');
  }
} 

@NgModule({
	bootstrap:[AppComponent],
    imports:[
		NativeScriptModule,
		NativeScriptRouterModule,
		NativeScriptFormsModule,
		NativeScriptHttpModule,
    ],
    providers: [
        {
            provide: RequestOptions,
            useClass: MyRequestOptions
        }
    ],
    declarations:[
    	AppComponent,
		BookingSharedComponent
    ],
    entryComponents:[
    ]
})
export class AppModule {}