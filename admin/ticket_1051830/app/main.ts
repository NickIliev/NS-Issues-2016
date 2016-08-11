// this import should be first in order to load some required settings (like globals and reflect-metadata)
import {nativeScriptBootstrap} from "nativescript-angular/application";
import {AppComponent} from "./app.component";

var platform = require('platform');

console.dump(platform.screen.mainScreen);

console.dump(platform.device);



nativeScriptBootstrap(AppComponent);