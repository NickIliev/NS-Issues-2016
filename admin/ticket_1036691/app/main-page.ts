import { Observable, EventData, PropertyChangeData } from "data/observable";
import { Page } from "ui/page";
import { Switch } from "ui/switch";
import { BindingOptions } from "ui/core/bindable";

var model = new Observable();
var totalCost = 0;

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = model;
    
    var polishSwitch = <Switch>page.getViewById("sw-polish");
    var washSwitch = <Switch>page.getViewById("sw-wash");    
    
    model.set("optionPolish", false);
    var options: BindingOptions = {
        sourceProperty: "optionPolish",
        targetProperty: "checked",
        twoWay: true
    };
    polishSwitch.bind(options, model);
    // polishSwitch.checked is now true
    
    model.set("optionWash", false);
    var options: BindingOptions = {
        sourceProperty: "optionWash",
        targetProperty: "checked",
        twoWay: true
    };
    washSwitch.bind(options, model);
    // washSwitch.checked is now false
    
    model.set("cost", totalCost);
    
    model.addEventListener(Observable.propertyChangeEvent, function(args: PropertyChangeData){
        console.log(args.eventName.toString() + " " + args.propertyName.toString() + " " + args.value.toString());

        switch(args.propertyName.toString()) {
            case 'optionWash':
                if (args.value.toString() == 'true') {
                    totalCost += 80;
                } else {
                    totalCost -= 80;
                }
                break;
            case 'optionPolish':
                if (args.value.toString() == 'true') {
                    totalCost += 40;
                } else {
                    totalCost -= 40;
                }
                break;
        }
        model.set("cost", totalCost);
    });
}