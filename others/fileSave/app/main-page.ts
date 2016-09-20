import { EventData } from 'data/observable';
import { Page } from 'ui/page';

var imageSource = require("image-source");
var fs = require("file-system");

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;
}

export function saveImage() {
  var img = imageSource.fromResource("icon");

  var folder = fs.knownFolders.temp();
  var path = fs.path.join(folder.path, "TestIcon.jpeg");

  var saved = img.saveToFile(path, "jpeg");
  console.log(saved);
}

export function loadFile() {

  var folder = fs.knownFolders.temp();
  var path = fs.path.join(folder.path, "TestIcon.jpeg");
  var img = imageSource.fromFile(path);

  console.log(img);
  console.log(img.width);
}