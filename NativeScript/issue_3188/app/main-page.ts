import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

import { Image } from "ui/image";
import { ImageSource, fromFile, fromAsset, fromUrl, fromResource } from "image-source";
import { ImageAsset } from "image-asset";

import * as camera from "nativescript-camera";
import * as fs from "file-system";

var img;
// Event handler for Page "navigatingTo" event attached in main-page.xml
export function onLoaded(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;

  img = <Image>page.getViewById("img");

  camera.requestPermissions();

  page.bindingContext = new HelloWorldModel();
}

export function onTap() {
  camera.takePicture().
      then((imageAsset) => {
          console.log("Result is an image asset instance");
          img.src = imageAsset;

          fromAsset(imageAsset).then(res => {
              var folder = fs.knownFolders.documents();
              var path = fs.path.join(folder.path, "Test.png");
              var saved = res.saveToFile(path,"png");
          });
      }).catch((err) => {
          console.log("Error -> " + err.message);
      });
}