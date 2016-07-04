var application = require("application");

var platform = require("platform");

var screen = platform.screen;

console.log(screen.mainScreen.heightDIPs);
console.log(screen.mainScreen.heightPixels);
console.log(screen.mainScreen.scale);
console.log(screen.mainScreen.widthDIPs);
console.log(screen.mainScreen.widthPixels);

var device = platform.device;

console.log(device.os);
console.log(device.manufacturer);
console.log(device.osVersion);
console.log(device.model);
console.log(device.sdkVersion);
console.log(device.deviceType);
console.log(device.uuid);
console.log(device.language);
console.log(device.region);






application.start({ moduleName: "main-page" });
