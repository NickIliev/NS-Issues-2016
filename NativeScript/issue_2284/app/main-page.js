"use strict";
var main_view_model_1 = require("./main-view-model");
var xmlHttp = new XMLHttpRequest();
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    // Get the event sender
    var page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
    xmlHttp.open('POST', 'http://www.w3schools.com/webservices/tempconvert.asmx', true);
    var soapRequest = '<?xml version="1.0" encoding="utf-8"?>' +
        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<web:GetUserLoginForApp>' +
        '<web:UserName>USERNAME</web:UserName>' +
        '<web:Password>PASSWORD</web:Password>' +
        '</web:GetUserLoginForApp>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
            console.log(xmlHttp.responseText);
            if (xmlHttp.status == 200) {
                console.log('done. use firebug/console to see network response');
            }
        }
    };
    xmlHttp.setRequestHeader('Content-Type', 'text/xml');
    xmlHttp.send(soapRequest);
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=main-page.js.map