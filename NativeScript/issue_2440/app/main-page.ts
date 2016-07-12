import { EventData } from "data/observable";
import { Page } from "ui/page";

import fs = require("file-system");

var rootFolder = fs.knownFolders.currentApp();

var CORRELATIONS_FILE = rootFolder.getFile("data/non-existing-file,json");

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    

    showAllCorrelations(CORRELATIONS_FILE);
}

export function showAllCorrelations(myFile: any) {

    let jsonData: Array<any> = [];

    var filePath = fs.path.join(rootFolder.path, CORRELATIONS_FILE.name);

    if (fs.File.exists(filePath)) {
        myFile.readText()
            .then(function (content) {
                try {
                    jsonData = <Array<any>>JSON.parse(content);
                } catch (error) {
                    console.log(error);
                }
            }, function (errorMessage) {
                console.log("onRejected message: " + errorMessage);
            });
    } else {
        console.log("non existing file");
    }

}