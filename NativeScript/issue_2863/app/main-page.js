"use strict";
function onTap() {
    console.log("onTap from main.ts"); // onTap will call this log + the log from the overwritten onUserInteraction();
}
exports.onTap = onTap;
//# sourceMappingURL=main-page.js.map