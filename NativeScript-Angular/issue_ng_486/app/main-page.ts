var frameModule = require("ui/frame");
var topmost = frameModule.topmost();

export function onNavigatingTo(args) {
    var page = args.object;
}

export function onTap(args) {
    var topmost = frameModule.topmost();
    topmost.navigate({
      moduleName: "sub-page"
    });
}

export function goToThird(args) {
    var topmost = frameModule.topmost();
    topmost.navigate({
      moduleName: "third-page",
      clearHistory: true
    });
}
