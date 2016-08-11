import { EventData } from "data/observable";
import { Page } from "ui/page";

var imageSourceModule = require("image-source");


// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;

    var imgSrc = imageSourceModule.fromResource("icon");

    var imageAsBase64 = imgSrc.toBase64String("PNG");

    fetch("https://httpbin.org/post", {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: imageAsBase64
    }).then(r => { return r.json(); }).then(function (result) {
        
        console.log("Base64String: " + result.data);
        
        // for (var key in result) {
        //     if (result.hasOwnProperty(key)) {
        //         var element = object[result];
        //         console.log(key);
        //         console.log(element);
        //         console.log("------")
        //     }
        // }
    }, function (e) {
        console.log("Error occurred " + e);
    });


    //    var data = {
    //        "codes":["7898422746759"],
    //        "id_store":1
    //     };

    //     fetch("http://requestb.in/192hwpt1", {
    //         method: "POST",
    //         headers: {
    //             'Accept': 'application/json,text/plain, */*',
    //             'Content-Type': 'application/json;charset=UTF-8;'
    //         },
    //         body: JSON.stringify(data)
    //     }).then(r => {
    //         return r;
    //     }).then(function (r) {
    //         console.log("response");
    //         console.log(JSON.stringify(r));
    //     }, function (e) {
    //         console.log("Error occurred " + e);
    //     });
}
