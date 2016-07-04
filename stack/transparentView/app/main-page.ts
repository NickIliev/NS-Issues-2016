import { EventData } from "data/observable";
import { Page } from "ui/page";
import { HelloWorldModel } from "./main-view-model";
import { GridLayout } from "ui/layouts/grid-layout";

import { Color } from "color";

var myGridView;

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = new HelloWorldModel();
    
    myGridView = <GridLayout>page.getViewById("myGrid");  
}

export function onTap(args:EventData) {
    var color = new Color("#FF0000");
    
    // myGridView.backgroundColor = color;
    
    myGridView.visibility = "collapsed";
}

export function onAnotherTap(args:EventData) {
    myGridView.animate({
        backgroundColor: new Color("#3D5AFE"),
        duration: 3000
    });
}