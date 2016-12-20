"use strict";
var fs = require("file-system");
function navigatingTo(args) {
    var page = args.object;
    var myRoot = fs.File.fromPath('./test.txt');
    console.log("myRoot: " + myRoot.path);
    // let parent = myRoot.parent;
    // console.log("parent: " + parent.path);
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map