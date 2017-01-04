/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
import { EventData } from 'data/observable';
import { Page } from 'ui/page';

import * as http from "http";
import * as fs from "file-system"

var appModule = require("application");
var permissions = require("nativescript-permissions");

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {

    permissions.requestPermission([
        "android.permission.INTERNET",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
    ], "I need these permissions")
        .then(function (res) {
            console.log("Permissions granted!");
        })
        .catch(function () {
            console.log("No permissions - plan B time!");
        });

    let page = <Page>args.object;

    var saved: fs.File;

    http.getFile("http://httpbin.org/robots.txt").then(file => {

        console.log(file);
        
        file.readText().then(content => {
            console.log(content);
            
            var androidDownloadsPath = android.os.Environment.getExternalStoragePublicDirectory( android.os.Environment.DIRECTORY_DOWNLOADS).toString();
            var myFolder = fs.path.join(androidDownloadsPath, "myFolder");

            var folder = fs.Folder.fromPath(myFolder);
            var path = fs.path.join(myFolder, "my-file-name.txt");
            var exists = fs.File.exists(path);

            var outputStream = new java.io.FileOutputStream(path);
            outputStream.write(file.readSync());
            outputStream.close();
        })

    })

}
