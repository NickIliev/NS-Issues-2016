var createViewModel = require("./main-view-model").createViewModel;
var fs = require("file-system");

function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = createViewModel();
    
    var documents = fs.knownFolders.documents();
    
    var path = fs.path.join(documents.path, "myFiles", "test.txt");
    
    var file = documents.getFile("Test.txt");
    var exists = fs.File.exists(path);
    console.log(exists);
}
exports.onNavigatingTo = onNavigatingTo;