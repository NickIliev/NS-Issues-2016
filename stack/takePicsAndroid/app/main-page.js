"use strict";
var cameraModule = require('camera');
var enumsModule = require('ui/enums');
var fsModule = require('file-system');
var bgHttpModule = require('nativescript-background-http');
var options = { width: 300, height: 300, keepAspectRatio: true };
var format = enumsModule.ImageFormat.jpeg;
function onTakeShot(args) {
    cameraModule.takePicture(options).then(function (imageSource) {
        var contentType = "image/" + format;
        var savePath = fsModule.knownFolders.documents().path;
        var fileName = 'img_' + new Date().getTime() + '.' + format;
        var filePath = fsModule.path.join(savePath, fileName);
        if (imageSource.saveToFile(filePath, format)) {
            var session = bgHttpModule.session('image-upload');
            var options = {
                url: 'http://httpbin.org/post',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'File-Name': fileName
                },
                description: '{ \'uploading\': ' + fileName + ' }'
            };
            var task = session.uploadFile(filePath, options);
            task.on('progress', logEvent);
            task.on('error', logEvent);
            task.on('complete', logEvent);
            function logEvent(e) {
                console.log("----------------");
                console.log('Status: ' + e.eventName);
                // console.log(e.object);
                if (e.totalBytes !== undefined) {
                    console.log('current bytes transfered: ' + e.currentBytes);
                    console.log('Total bytes to transfer: ' + e.totalBytes);
                }
            }
        }
    });
}
exports.onTakeShot = onTakeShot;
//# sourceMappingURL=main-page.js.map