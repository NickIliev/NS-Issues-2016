import { EventData } from "data/observable";
import { Page } from "ui/page";
import { HelloWorldModel } from "./main-view-model";

var vm = new HelloWorldModel();;


// Event handler for Page "navigatingTo" event attached in main-page.xml
export function onNavigatedTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;

    var initialObject = {
        "chartSource": [
            {"name":"April","Dresses":100000,"Pants":200000,"Top":300000,"Skirts":400000,"Jackets":500000},
            {"name":"May","Dresses":10000,"Pants":200000,"Top":30000,"Skirts":400000,"Jackets":500000},
            {"name":"June","Dresses":35000,"Pants":25000,"Top":255500,"Skirts":35000,"Jackets":254000},
            {"name":"July","Dresses":258361,"Pants":20000,"Top":300000,"Skirts":25000,"Jackets":35620}
        ],
        "someOtherKey" : "some other value"
    }

    console.log("Initial object: " + JSON.stringify(initialObject)); 

    var chartSourceObj = initialObject["chartSource"]; 

    console.log(JSON.stringify("chartSource object: " + chartSourceObj)); 

    var chartSourceArray = Object.keys(chartSourceObj).map(function(k) { return chartSourceObj[k] }); 

    console.log("Lenght of our cource array: " + chartSourceArray.length);
    console.log("Each element of the array: ");
    chartSourceArray.forEach(element => {
        console.log(JSON.stringify(element));
    });

    vm.set("categoricalSource", chartSourceArray);

    page.bindingContext = vm;

}