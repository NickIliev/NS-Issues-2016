"use strict";
var main_view_model_1 = require("./main-view-model");
var connectivity = require("connectivity");
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
    var connectionType = connectivity.getConnectionType();
    switch (connectionType) {
        case connectivity.connectionType.none:
            console.log("No connection");
            break;
        case connectivity.connectionType.wifi:
            console.log("WiFi connection");
            break;
        case connectivity.connectionType.mobile:
            console.log("Mobile connection");
            break;
    }
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map