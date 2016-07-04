"use strict";
var app = require("application");
var drawer;
var page;
var appContext;
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    page = args.object;
    appContext = app.android.context;
}
exports.navigatingTo = navigatingTo;
function creatingView(args) {
    drawer = new android.support.v4.widget.DrawerLayout(appContext);
    var frame = new android.widget.FrameLayout(appContext);
    var linearMenu = new android.widget.LinearLayout(appContext);
    linearMenu.setOrientation(1);
    var textView1 = new android.widget.TextView(appContext);
    textView1.setText("ITEM 1");
    var textView2 = new android.widget.TextView(appContext);
    textView2.setText("ITEM 2");
    var textView3 = new android.widget.TextView(appContext);
    textView3.setText("ITEM 3");
    var lp = new android.support.v4.widget.DrawerLayout.LayoutParams(100, android.widget.LinearLayout.LayoutParams.MATCH_PARENT);
    lp.gravity = android.view.Gravity.START;
    linearMenu.setLayoutParams(lp);
    linearMenu.addView(textView1);
    linearMenu.addView(textView2);
    linearMenu.addView(textView3);
    drawer.addView(frame, new android.support.v4.widget.DrawerLayout.LayoutParams(android.view.ViewGroup.LayoutParams.MATCH_PARENT, android.view.ViewGroup.LayoutParams.MATCH_PARENT));
    drawer.addView(linearMenu);
    args.view = drawer;
}
exports.creatingView = creatingView;
//# sourceMappingURL=main-page.js.map