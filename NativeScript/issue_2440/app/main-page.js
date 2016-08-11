"use strict";
var fs = require("file-system");
var rootFolder = fs.knownFolders.currentApp();
var CORRELATIONS_FILE = rootFolder.getFile("data/non-existing-file.json");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    showAllCorrelations(CORRELATIONS_FILE);
}
exports.navigatingTo = navigatingTo;
function showAllCorrelations(myFile) {
    var jsonData = [];
    var filePath = fs.path.join(rootFolder.path, CORRELATIONS_FILE.name);
    myFile.readText()
        .then(function (content) {
        console.log("after thehn - before try");
        try {
            jsonData = JSON.parse(content);
        }
        catch (error) {
            console.log(error);
        }
    }, function (errorMessage) {
        console.log("onRejected message: " + errorMessage);
    });
}
exports.showAllCorrelations = showAllCorrelations;
//# sourceMappingURL=main-page.js.map