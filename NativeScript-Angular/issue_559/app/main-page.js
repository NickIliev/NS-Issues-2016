"use strict";
var http = require("http");
var fs = require("file-system");
var appModule = require("application");
var permissions = require("nativescript-permissions");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
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
    var page = args.object;
    var saved;
    http.getFile("http://httpbin.org/robots.txt").then(function (file) {
        console.log(file);
        file.readText().then(function (content) {
            console.log(content);
            var androidDownloadsPath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString();
            var myFolder = fs.path.join(androidDownloadsPath, "myFolder");
            var folder = fs.Folder.fromPath(myFolder);
            var path = fs.path.join(myFolder, "my-file-name.txt");
            var exists = fs.File.exists(path);
            var outputStream = new java.io.FileOutputStream(path);
            outputStream.write(file.readSync());
            outputStream.close();
        });
    });
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map