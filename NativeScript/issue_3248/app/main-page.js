"use strict";
var fs = require('file-system');
function onLoaded(args) {
    var page = args.object;
}
exports.onLoaded = onLoaded;
function onTap(args) {
    var appFiles = fs.knownFolders.currentApp();
    var path = fs.path.join(appFiles.path, 'shared/dictionaries', 'test.txt');
    var file = appFiles.getFile(path);
    console.log(fs.File.exists(path)); // returns true
    file.readText()
        .then(function (content) {
        console.log(content); // return "" instaed of file content
    }, function (error) {
        console.log(error);
    });
}
exports.onTap = onTap;
//# sourceMappingURL=main-page.js.map