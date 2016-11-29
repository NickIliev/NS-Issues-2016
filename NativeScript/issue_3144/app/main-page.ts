import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import { ImageAsset } from "image-asset";
import { Image } from "ui/image";


let vm = new HelloWorldModel();

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;

  var img = page.getViewById("res")
  var imageAs = new ImageAsset(img);
  
  console.log(imageAs.options)
  vm.set("src", imageAs);
  
//   imageAsset.getImageAsync(resImage => {
//     vm.set("src", resImage);
//   })
  page.bindingContext = vm;
}