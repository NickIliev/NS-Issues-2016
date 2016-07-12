"use strict";
var application_1 = require("nativescript-angular/application");
var app_component_1 = require("./app.component");
application_1.nativeScriptBootstrap(app_component_1.AppComponent, null, { startPageActionBarHidden: false });
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
//# sourceMappingURL=main.js.map