import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

var pushPlugin = require("nativescript-push-notifications");

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;
  page.bindingContext = new HelloWorldModel();

  var self = this;
  pushPlugin.register({ senderID: '<ENTER_YOUR_PROJECT_NUMBER>' }, function (data){
      self.set("message", "" + JSON.stringify(data));
  }, function() { });

  pushPlugin.onMessageReceived(function callback(data) {  
      self.set("message", "" + JSON.stringify(data));
  });
}