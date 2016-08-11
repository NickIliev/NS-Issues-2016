import { EventData } from "data/observable";
import { Page } from "ui/page";
import { HelloWorldModel } from "./main-view-model";

var bghttp = require("nativescript-background-http");
var session = bghttp.session("image-upload");
 
// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = new HelloWorldModel();

    var request = {
        url: "http://httpbin.org/post",
        method: "POST",
        headers: {
            "Content-Type": "application/octet-stream",
            "File-Name": "bigpig.jpg"
        },
        description: "{ 'uploading': 'bigpig.jpg' }"
    };
    
    var task = session.uploadFile("images/icon.png", request);
    
    task.on("progress", logEvent);
    task.on("error", logEvent);
    task.on("complete", logEvent);
    
    function logEvent(e) {      
        console.log("----------------");
        console.log('Status: ' + e.eventName);
        console.log(e.object);
        if (e.totalBytes !== undefined) {
            console.log('current bytes transfered: ' + e.currentBytes);
            console.log('Total bytes to transfer: ' + e.totalBytes);
        }  
    }
}


