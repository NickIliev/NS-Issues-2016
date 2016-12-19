import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { Image } from "ui/image";
import * as imageSource from "image-source";

import "files/non-existing.txt";

export function onLoaded(args: EventData) {
    let page = <Page>args.object;
    var img = <Image>page.getViewById("img");

imageSource.fromUrl("https://www.google.com/images/errors/logo_sm_2.png")
    .then(function (res: imageSource.ImageSource) {
    // console.log("Successfully loaded");
    
    img.imageSource = res;
}).catch(err => {
    // console.log("Somthing went wrong!");
})
}

export function onImageLoaded(args:EventData) {
    console.log(args.eventName);
    console.log(args.object);

    var img = <Image>args.object;

    console.log("img.isLoading: " + img.isLoading);
    console.log("img.isLoaded: " + img.isLoaded);
} 