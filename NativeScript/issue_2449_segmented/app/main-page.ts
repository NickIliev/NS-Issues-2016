import { EventData, Observable, PropertyChangeData } from "data/observable";
import { Page } from "ui/page";
import { SegmentedBar } from "ui/segmented-bar";

var vm = new Observable();
vm.set("segBaritemSelectedIndex", 0);
vm.set("isItemOneVisible", true);
vm.set("isItemTwoVisible", false);
vm.set("isItemThreeVisible", false);

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    var segbar = <SegmentedBar>page.getViewById("seg-bar");

    vm.addEventListener(Observable.propertyChangeEvent, function (propertyChangeData:PropertyChangeData) {
        if (propertyChangeData.propertyName.toString() == 'segBaritemSelectedIndex') {
            switch (propertyChangeData.value) {
                case 0:
                    vm.set("isItemOneVisible", true);
                    vm.set("isItemTwoVisible", false);
                    vm.set("isItemThreeVisible", false);
                    break;
                case 1:
                    vm.set("isItemOneVisible", false);
                    vm.set("isItemTwoVisible", true);
                    vm.set("isItemThreeVisible", false);
                    break;
                case 2:
                    vm.set("isItemOneVisible", false);
                    vm.set("isItemTwoVisible", false);
                    vm.set("isItemThreeVisible", true);
                    break;        
            
                default:
                    break;
            }
        }
    });

    page.bindingContext = vm;
 
}