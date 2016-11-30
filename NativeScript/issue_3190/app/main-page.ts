import { EventData } from 'data/observable';
import { Page } from 'ui/page';

import { Image } from "ui/image";
import { ImageSource, fromAsset } from "image-source";
import { ImageAsset } from "image-asset";

import * as camera from "nativescript-camera";
import * as fs from "file-system";

var imageModule = require("ui/image");
var img;
var myImageSource: ImageSource;

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function onLoaded(args: EventData) {
    // Get the event sender
    let page = <Page>args.object;

    img = <Image>page.getViewById("img");

    camera.requestPermissions();
}

export function takePhoto() {
    camera.takePicture()
        .then(imageAsset => {
            console.log("Result is an image asset instance");
            img.src = imageAsset;

            fromAsset(imageAsset).then(res => {
                myImageSource = res;
                console.log(myImageSource);
            })
        }).catch(function (err) {
            console.log("Error -> " + err.message);
        });
}

export function saveToFile(): void {



    var knownPath = fs.knownFolders.documents();
    var folderPath = fs.path.join(knownPath.path, "CosmosDataBank");

    var folder = fs.Folder.fromPath(folderPath);
    var path = fs.path.join(folderPath, "Test.png");

    var saved = myImageSource.saveToFile(path, "png");
    console.log(saved);
}