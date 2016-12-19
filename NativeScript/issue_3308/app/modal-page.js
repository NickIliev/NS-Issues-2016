"use strict";
var context;
var closeCallback;
var frame_1 = require("ui/frame");
function onShownModally(args) {
    context = args.context;
    closeCallback = args.closeCallback;
}
exports.onShownModally = onShownModally;
function onLoaded(args) {
    var page = args.object;
    console.log(page);
}
exports.onLoaded = onLoaded;
function onSetReturnPage() {
    frame_1.topmost().navigate({
        moduleName: "third-page",
    });
}
exports.onSetReturnPage = onSetReturnPage;
function onCloseModal() {
    closeCallback();
}
exports.onCloseModal = onCloseModal;
//# sourceMappingURL=modal-page.js.map