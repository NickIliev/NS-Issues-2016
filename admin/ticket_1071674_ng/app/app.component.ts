import {Component, OnInit} from "@angular/core";

// var WS = require('nativescript-websockets');
 

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {
    public counter: number = 16;

ngOnInit() {
    var WS = require('nativescript-websockets');
    var mySocket = new WS("ws://echo.websocket.org",{protocols: [/* 'chat', 'video' */], timeout: 6000, allowCellular: true, headers: { 'Authorization': 'Basic ...' }});
    mySocket.on('open', function(socket) { console.log("Hey I'm open"); socket.send("Hello"); });
    mySocket.on('message', function(socket, message) { console.log("Got a message", message); });
    mySocket.on('close', function(socket, code, reason) { console.log("Socket was closed because: ", reason, " code: ", code); });
    mySocket.on('error', function(socket, error) { console.log("Socket had an error", error);});
}


    public get message(): string {
        if (this.counter > 0) {
            return this.counter + " taps left";
        } else {
            return "Hoorraaay! \nYou are ready to start building!";
        }
    }
    
    public onTap() {
        this.counter--;
    }
}
