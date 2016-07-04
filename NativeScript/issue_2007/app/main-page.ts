import { EventData } from "data/observable";
import { ObservableArray } from 'data/observable-array';
import { Page } from "ui/page";

var tabViewModule = require("ui/tab-view");
var stackLayoutModule = require("ui/layouts/stack-layout");
var labelModule = require("ui/label");

var colors = new ObservableArray(["red", "green", "blue"]);

export function navigatingTo(args: EventData) {

    var page = <Page>args.object;
    page.bindingContext = colors;

    var tabView = new tabViewModule.TabView();

    var items = [];
    for (var index = 0; index < colors.length; index++) {
        var element = colors.getItem(index);

        var stackLayout = new stackLayoutModule.StackLayout();
        var label = new labelModule.Label();
        label.text = element;
        stackLayout.addChild(label);
        
        var tabEntry = {
            title: "Tab #" + index,
            view: stackLayout
        }
        items.push(tabEntry);
    }
    
    tabView.items = items;
    
    page.content = tabView;
}