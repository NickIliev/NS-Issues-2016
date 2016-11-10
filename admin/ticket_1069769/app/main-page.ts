import { EventData, Observable } from 'data/observable';
import { Page } from 'ui/page';
import { WebView } from "ui/web-view";

var vm = new Observable();
vm.set("url", "https://www.nativescript.org/")

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;
  page.bindingContext = vm;

  let wv = <WebView>page.getViewById("wv");

  var cookieManager = android.webkit.CookieManager.getInstance();
  var cookie = cookieManager.getCookie("https://www.nativescript.org/");

  var a = 1; 
  // start livesync - make a change and should throw with : 
  // FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory 

  console.log("cookie:" + cookie);
}