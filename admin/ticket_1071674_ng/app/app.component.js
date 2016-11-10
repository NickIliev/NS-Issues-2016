"use strict";
var core_1 = require("@angular/core");
var WS = require('nativescript-websockets');
var AppComponent = (function () {
    function AppComponent() {
        this.counter = 16;
    }
    AppComponent.prototype.ngOnInit = function () {
        var mySocket = new WS("ws://echo.websocket.org", { protocols: [], timeout: 6000, allowCellular: true, headers: { 'Authorization': 'Basic ...' } });
        mySocket.on('open', function (socket) { console.log("Hey I'm open"); socket.send("Hello"); });
        mySocket.on('message', function (socket, message) { console.log("Got a message", message); });
        mySocket.on('close', function (socket, code, reason) { console.log("Socket was closed because: ", reason, " code: ", code); });
        mySocket.on('error', function (socket, error) { console.log("Socket had an error", error); });
    };
    Object.defineProperty(AppComponent.prototype, "message", {
        get: function () {
            if (this.counter > 0) {
                return this.counter + " taps left";
            }
            else {
                return "Hoorraaay! \nYou are ready to start building!";
            }
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.onTap = function () {
        this.counter--;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "app.component.html",
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map