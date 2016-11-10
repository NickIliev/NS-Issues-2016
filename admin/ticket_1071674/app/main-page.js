"use strict";
var main_view_model_1 = require('./main-view-model');
var WS = require('nativescript-websockets');
var mySocket = new WS("ws://echo.websocket.org", { protocols: [], timeout: 6000, allowCellular: true, headers: { 'Authorization': 'Basic ...' } });
mySocket.on('open', function (socket) { console.log("Hey I'm open"); socket.send("Hello"); });
mySocket.on('message', function (socket, message) { console.log("Got a message", message); });
mySocket.on('close', function (socket, code, reason) { console.log("Socket was closed because: ", reason, " code: ", code); });
mySocket.on('error', function (socket, error) { console.log("Socket had an error", error); });
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map