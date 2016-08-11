import { EventData, Observable } from "data/observable";
import { Page } from "ui/page";

import imageCacheModule = require("ui/image-cache");
import imageSourceModule = require("image-source");
import imageModule = require("ui/image");
import fs = require("file-system");

var cache = new imageCacheModule.Cache();

cache.maxRequests = 5;

var viewModel = new Observable();

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;

    var someImageUrl = "https://github.com/NativeScript.png";

    var resultImage = getImage(someImageUrl);
    // console.log(resultImage);

    setTimeout(function() {
        var imgSrc = cache.get("some-image-key"); 
        viewModel.set("mySource", imgSrc);
    }, 1000);

    page.bindingContext = viewModel;
}

function getImage(source) {
    var image = cache.get(source); 

    if (image) { 
        return image; 

    } else { 
        var newImage = new imageModule.Image();

        cache.push({
            key: "some-image-key",
            url: source,
            completed: (resultNativeImage: any, key: string) => {
                // console.log(resultImage); // result is native image (android or ios)
                var imgSouce = imageSourceModule.fromNativeSource(resultNativeImage);
                
                newImage.src = imgSouce;
                // console.log(newImage); // now we have NativeScript image
                // console.log(key);
            }
        });

        return newImage;
    }

}
export function onTap(args) {
    
        var newImage = new imageModule.Image();
        newImage.src = imageSourceModule.fromResource("icon");
        cache.set("mew-key", newImage); // error thown here

        // viewModel.set("mySource", cache.get("new-key"));

        var temp = cache.get("new-key");
        console.log(temp);
}