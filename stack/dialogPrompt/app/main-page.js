"use strict";
var main_view_model_1 = require("./main-view-model");
var dialogModule = require("ui/dialogs");
var viewModel = new main_view_model_1.MyViewModel();
viewModel.pendingConnections = [{ PatientFirstName: "John" }, { PatientFirstName: "Merry" }, { PatientFirstName: "Abygeil" }];
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = viewModel;
    for (var index = viewModel.pendingConnections.length - 1; index >= 0; index--) {
        connectionDealer(index);
    }
}
exports.navigatingTo = navigatingTo;
function connectionDealer(index) {
    var pendingConnection = viewModel.pendingConnections[index];
    dialogModule.confirm({
        message: pendingConnection["PatientFirstName"] + " would like to share their glucose readings with you.",
        okButtonText: "Accept",
        cancelButtonText: "Reject"
    }).then(function (result) {
        if (result === true) {
            // your code follow.. pass pendingConnection[index] to your method
            console.log("accepted by " + pendingConnection["PatientFirstName"]);
        }
        else {
            // your code follow.. pass pendingConnection[index] to your method
            console.log("Rejected by " + pendingConnection["PatientFirstName"]);
        }
    });
}
//# sourceMappingURL=main-page.js.map