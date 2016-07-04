import { EventData } from "data/observable";

import cameraModule = require('camera');
import imageModule  = require('ui/image');
import enumsModule  = require('ui/enums');
import fsModule     = require('file-system');
var bgHttpModule = require('nativescript-background-http');

const options = { width: 300, height: 300, keepAspectRatio: true }
const format = enumsModule.ImageFormat.jpeg

export function onTakeShot(args:EventData) {
    cameraModule.takePicture(options).then(imageSource => {
        let contentType = `image/${format}`; 
        let savePath = fsModule.knownFolders.documents().path;
        let fileName = 'img_' + new Date().getTime() + '.' + format;
        let filePath = fsModule.path.join( savePath, fileName );

        if ( imageSource.saveToFile( filePath, format ) ) {
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

            let task = session.uploadFile(filePath, options);

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