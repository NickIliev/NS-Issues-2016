"use strict";
var frameModule = require('ui/frame');
var topmost;
function onLoaded(args) {
    var page = args.object;
    topmost = frameModule.topmost();
}
exports.onLoaded = onLoaded;
//# sourceMappingURL=sub-page.js.map