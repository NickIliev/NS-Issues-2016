import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import * as imageSource from "image-source";

let vm = new HelloWorldModel();

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;

  imageSource.fromUrl("https://www.google.com/images/errors/logo_sm_2.png")
      .then(function (res: imageSource.ImageSource) {
      vm.set("img", res);
  }, function (error) {
          //console.log("Error loading image: " + error);
      });

  page.bindingContext = vm;
}