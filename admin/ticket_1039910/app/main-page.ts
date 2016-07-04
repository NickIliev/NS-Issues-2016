import { EventData, Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { Page } from "ui/page";

var fs = require("file-system");

var mainViewModel = new Observable();

var documents = fs.knownFolders.currentApp();
var jsonFile = documents.getFile('shared/demo.json');

var employeesArray = new ObservableArray();

export function navigatingTo(args: EventData) {

    var page = <Page>args.object;
    
    jsonFile.readText()
    .then(function (content) {
        try {
            var jsonData = JSON.parse(content);

            for (var key in jsonData) {
                if (jsonData.hasOwnProperty(key) && key.toString() === "employees") {
                    var employees = new Array(jsonData[key]);
                    employees.forEach(element => {
                        employeesArray.push(element);
                    });
                }
            }

        } catch (err) {
            throw new Error('Could not parse JSON file');
        }
    }, function (error) {
        throw new Error('Could not read JSON file');
    });
    
    mainViewModel.set("employees", employeesArray);
    
    page.bindingContext = mainViewModel;
}