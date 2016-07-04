import { EventData } from "data/observable";
import { Page } from "ui/page";
import { HelloWorldModel } from "./main-view-model";

import { StackLayout } from "ui/layouts/stack-layout";
import { Button } from "ui/button";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = new HelloWorldModel();
    
    
    var stack = <StackLayout>page.getViewById("my-stack");
    stack.isEnabled = true;
    
    var btn = <Button>page.getViewById("my-btn");
    btn.isEnabled = false;
    
    var textFiled = page.getViewById("my-textfield");
    textFiled.isEnabled = false;
    
    var label = page.getViewById("my-label");
    label.isEnabled = false;
}