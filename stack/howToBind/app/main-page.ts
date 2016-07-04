import { EventData, Observable } from "data/observable";
import { Page } from "ui/page";
import { MagnitudeModel } from "./main-view-model";

var viewModel = new MagnitudeModel();

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function onLoaded(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;

    page.bindingContext = viewModel;

    setInterval(function() {
        var oldMagnityude = viewModel.get("magnitude");
        var newMagnitude = parseFloat(oldMagnityude) + 20;
        viewModel.changeMagnitude(newMagnitude.toString());
    }, 2000);


    var myButton = page.getViewById("myButton");
    myButton.ios.tintColor = UIColor.blueColor();
    myButton.ios.titleColor = UIColor.whiteColor();
}
