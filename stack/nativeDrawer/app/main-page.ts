import { EventData } from "data/observable";
import { Page } from "ui/page";

import { CreateViewEventData } from "ui/placeholder";

import app = require("application");

let drawer;
let page;
let appContext;

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    page = <Page>args.object;
    
    appContext = app.android.context;
}

export function creatingView(args:CreateViewEventData) {
    
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