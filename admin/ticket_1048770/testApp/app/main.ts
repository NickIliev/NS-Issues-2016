import {nativeScriptBootstrap} from "nativescript-angular/application";
import {AppComponent} from "./app.component"; 
import {AuthenticationPage} from "./components/authentication/auth.component";


nativeScriptBootstrap(AppComponent, null, { startPageActionBarHidden: false });


/** 
export function pageLoaded(args) {
nativeScriptBootstrap(AuthenticationPage, [])
.then ((appRef) =>{
    console.log("Done");
}, (err) => {
    let errMsg = err.message+"\n\n"+err.stack;
    console.log("Error");
});
}
*/