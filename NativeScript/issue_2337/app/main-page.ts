import { EventData, Observable, PropertyChangeData } from "data/observable";
import { Page } from "ui/page";

import { GridLayout } from "ui/layouts/grid-layout";

import pagesModule = require("ui/page");
import frameModule = require("ui/frame");

import tabViewModule = require("ui/tab-view");
import colorModule = require("color");
import stackLayoutModule = require("ui/layouts/stack-layout");
import textViewModule = require("ui/text-view");

var page;
// Event handler for Page "navigatingTo" event attached in main-page.xml
export function onLoaded(args: EventData) {
    // Get the event sender
    page = <Page>args.object;    

    // addTabViewItem();

    var vm = new Observable();
    vm.set("isItemVisible", false);
    
    page.bindingContext = vm;
}

export function addTabViewItem() {

    var stackLayout = new stackLayoutModule.StackLayout();

    var textView1 = new textViewModule.TextView();
    textView1.editable = true;
    textView1.style.fontSize = 16;
    textView1.style.backgroundColor = new colorModule.Color("BlanchedAlmond");
    textView1.height = 150;
    textView1.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus purus quis metus mattis euismod. Mauris ac purus commodo, sollicitudin tellus blandit, gravida turpis."

    stackLayout.addChild(textView1);
    
    var tabViewItem = new tabViewModule.TabViewItem();
    
    tabViewItem.title = "Tab 4",
    tabViewItem.view = stackLayout;
      
    var tabView = <tabViewModule.TabView>page.getViewById("tabViewContainer");
    
    tabView.items.push(tabViewItem);
    
    var stack = page.getViewById("container");
    // stack.removeChildren();
    // stack.addChild(tabView);
    
    var myStack = <any>tabView.parent;
    myStack.removeChildren();
    myStack.addChild(tabView);
}
