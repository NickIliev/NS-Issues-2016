"use strict";
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var fs = require("file-system");
var mainViewModel = new observable_1.Observable();
var documents = fs.knownFolders.currentApp();
var jsonFile = documents.getFile('shared/demo.json');
var employeesArray = new observable_array_1.ObservableArray();
function navigatingTo(args) {
    var page = args.object;
    jsonFile.readText()
        .then(function (content) {
        try {
            var jsonData = JSON.parse(content);
            for (var key in jsonData) {
                if (jsonData.hasOwnProperty(key) && key.toString() === "employees") {
                    var employees = new Array(jsonData[key]);
                    employees.forEach(function (element) {
                        employeesArray.push(element);
                    });
                }
            }
        }
        catch (err) {
            throw new Error('Could not parse JSON file');
        }
    }, function (error) {
        throw new Error('Could not read JSON file');
    });
    mainViewModel.set("employees", employeesArray);
    page.bindingContext = mainViewModel;
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map