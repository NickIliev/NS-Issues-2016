import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import * as imageSource from "image-source";

let vm = new HelloWorldModel();

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;

  imageSource.fromUrl("https://res.cloudinary.com/demo/image/upload/Sample.jpg")
      .then(res => {
      vm.set("img", res);
  }).catch(err => {
      console.log(err.stack);
  })

  page.bindingContext = vm;
}