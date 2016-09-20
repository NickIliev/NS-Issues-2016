import { EventData, Observable } from 'data/observable';
import { Page } from 'ui/page';
import imageSource = require("image-source");

export function navigatingTo(args: EventData) {
  let page = <Page>args.object;
  let viewModel = new Observable();

  imageSource.fromUrl("https://www.google.com/images/errors/logo_sm_2.png")
      .then(function (res: imageSource.ImageSource) {

      viewModel.set("url", res);

  }, function (error) {
      //console.log("Error loading image: " + error);
  });

  page.bindingContext = viewModel;    
}