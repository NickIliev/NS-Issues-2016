import { EventData } from "data/observable";
import { Page } from "ui/page";

import cameraModule = require("camera");

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;

}

export function takePhoto() {
    cameraModule.takePicture({
            width: 200,
            height: 400,
            keepAspectRatio: true,
            saveToGallery: true
        })
}