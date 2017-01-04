import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import * as http from "http";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

}

export function onTap() {
    http.getFile("https://httpbin.org/image/png")
        .then(res => {
            for (var key in res) {
                if (res.hasOwnProperty(key)) {
                    var element = res[key];
                    console.log("[ key : " + key + " ]");
                    console.log("[ element : " + element + " ]");
                }
            }
        }).catch(err => {
            console.log(err);
        })
}

export function onHttpRequest() {
    http.request({ url: "https://httpbin.org/image/png", method: "GET" })
        .then(function (response) {
            //// Argument (response) is HttpResponse!
            var statusCode = response.statusCode;
            console.log("statusCode: " +statusCode);

            if(statusCode >= 200 && statusCode <= 400) {
                response.content.toImage().then(res => {
                    console.log(res);
                })
                
            }
    
        }).catch(err => {
            console.log(err);
        })
}