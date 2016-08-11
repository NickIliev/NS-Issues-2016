import { EventData, Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { Page } from "ui/page";
import { ItemEventData } from "ui/list-view";

import { ListView } from "ui/list-view";

import frameModule = require("ui/frame");

let viewModel = new Observable();
let myItems = new ObservableArray(  {title: "Core Concepts"}, 
                                    {title: "User Interface"}, 
                                    {title: "Plugins"}, 
                                    {title: "Cookbook"}, 
                                    {title: "Tutorials"}  );

export function onLoaded(args: EventData) {

    var page = <Page>args.object;
    viewModel.set("myItems", myItems);

    // ListView will be updated automatically when new item is pushed.
    myItems.push({title:"Publishing"});

    page.bindingContext = viewModel;

    var list = <ListView>page.getViewById("list");
    console.log(list.android.getFirstVisiblePosition());

}

export function listViewItemTap(args:ItemEventData) {
    var itemIndex = args.index;

    // example how to navigate details-page & pass the tapped item context
    // frameModule.topmost().navigate({
    //     moduleName: "./details-page",
    //     context: myItems.getItem(itemIndex);
    // });
}