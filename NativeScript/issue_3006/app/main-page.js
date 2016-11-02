"use strict";
var st;
function navigatingTo(args) {
    var page = args.object;
    st = page.getViewById("st");
}
exports.navigatingTo = navigatingTo;
function onStackTouch(args) {
    console.log("onStackTouch");
}
exports.onStackTouch = onStackTouch;
function onTap(args) {
    console.log("onTap");
    console.log(st.isUserInteractionEnabled);
    // st.off("touch");
    var view = args.object;
    view.text += "ala";
}
exports.onTap = onTap;
//# sourceMappingURL=main-page.js.map