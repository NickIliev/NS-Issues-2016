"use strict";
var connectivity = require("connectivity");
function navigatingTo(args) {
    var page = args.object;
    connectivity.startMonitoring(function onConnectionTypeChanged(newConnectionType) {
        switch (newConnectionType) {
            case connectivity.connectionType.none:
                //console.log("Connection type changed to none.");
                break;
            case connectivity.connectionType.wifi:
                //console.log("Connection type changed to WiFi.");
                break;
            case connectivity.connectionType.mobile:
                //console.log("Connection type changed to mobile.");
                break;
        }
    });
}
exports.navigatingTo = navigatingTo;
function checkConnection() {
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
exports.checkConnection = checkConnection;
//# sourceMappingURL=main-page.js.map