import { EventData } from 'data/observable';
import { Page } from 'ui/page';

import fs = require('file-system');

export function onLoaded(args: EventData) {
    let page = <Page>args.object;
}


export function onTap(args) {
    var appFiles = fs.knownFolders.currentApp();
    var path = fs.path.join(appFiles.path, 'shared/dictionaries', 'test.txt');

    var file = appFiles.getFile(path);

    console.log(fs.File.exists(path)); // returns true
    
    file.readText()
        .then(function (content) {
            console.log(content);   // return "" instaed of file content
        }, function (error) {
            console.log(error);
        });
    
}