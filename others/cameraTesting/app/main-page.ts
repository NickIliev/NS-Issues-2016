import { EventData, Observable } from 'data/observable';
import { Page } from 'ui/page';
import { ImageAsset } from "image-asset";
import { Image } from "ui/image";
import * as camera from "nativescript-camera";

var page;

export function navigatingTo(args: EventData) {
  page = <Page>args.object;
  console.log("Is camera available: " + camera.isAvailable());
}

export function takePhoto(args: EventData) {

camera.takePicture({width: 180, height: 180, keepAspectRatio: false, saveToGallery: true}).
    then((imageAsset) => {
        // result is imageAsset
        var image = new Image();
        image.src = imageAsset;
    }).catch((err) => {
        console.log("Error -> " + err.message);
    });
}

export function requestPermission() {
  camera.requestPermissions();
}