import { EventData } from "data/observable";
import { Page } from "ui/page";
import { HelloWorldModel } from "./main-view-model";
import app = require("application");

// var messenger = require( "nativescript-messenger" );
// var numbers = ["905-454-1234", "905-454-4321", "905-929-1122"];
// messenger.send(numbers, "My message", "Subject of Message");

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = new HelloWorldModel();

    // messenger.send(["0885-051-781"], "this is body").then(function(args){
    //     console.log(args.response); 
    //     // either a string saying cancelled or sent 
    //     console.log(args.message); 
    //     // just a string with more detail than response. 
        
    //     /* you can do stuff here.. this happens back 
    //     in your app after the message window has 
    //     been dismissed */        
        
    // }, function (e) {
    //     console.log("Error occurred " + e); 
    //     // e will show a vague error message. 
    // });
    var permissions = require('nativescript-permissions');

    permissions.requestPermission((<any>android).Manifest.permission.SEND_SMS, "I need these permissions because I'm cool")
    .then(function() {
        console.log("Woo Hoo, I have the power!");

        var sms = android.telephony.SmsManager.getDefault();
        sms.sendTextMessage("0885051781", null, "Sent from Android", null, null);
    })
    .catch(function() {
        console.log("Uh oh, no permissions - plan B time!");
    });

}