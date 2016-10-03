var app = require("application");
var analytics = require('nativescript-telerik-analytics');
var utility = require("~/common/utility");
var navigation = require("~/components/navigation");
var Observable = require("data/observable").Observable;
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var constants = require("~/common/constants");
var http = require("http");
//var tools = require("nativescript-swiss-army-knife").SwissArmyKnife();

var page;
var dob;
var ssn;
var addr;
var verifyText;
var dobInput;
var ssnInput;
var addrInput;
var refCode;


exports.loaded = function (args) {
    page = args.object;
    refCode = page.navigationContext;
    var person = new Observable({
        dob: "02/11/1998",
        ssn: "1359",
        addr: "2140 S.WOODLAND APT 314",
        verifyText: refCode.verifyText
    });
    dobInput = page.getViewById("dob");
    ssnInput = page.getViewById("ssn");
    addrInput = page.getViewById("addr");
    page.bindingContext = person;
    console.log(refCode.refCode);
};

exports.authenticate = function (args) {
    page = args.object;

    http.request({
        url: constants.referralEaseUrl + "Authenticate/AuthenticateUser",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({ RequisitionID: refCode.refCode, DateOfBirth: dobInput.text, LastFourSSN: ssnInput.text, StreetAddress: addrInput.text })
    }).then(function (response) {
        var verifyResponse = response.content.toJSON().Data;
        if (verifyResponse.AccessGranted == true) {
            topmost.navigate({
                moduleName: "views/orders/orders",
                context: {
                    patientMRN: verifyResponse.PatientMRN,
                    token: verifyResponse.Token
        }
            });
        } else {
            var context = {
                title: "Unable to Verify",
                message: "We were unable to verify your identity. Please try again or contact UH to schedule your appointment.",
                okButtonText: "Try Again",
                cancelButtonText: "Contact UH"
            }
            utility.launchPopup("action", function (data) {
                // callback
            }, null, context);
        }
    }, function (error) {
        console.error(JSON.stringify(error));
    });
};


exports.reenter = function() {
    topmost.goBack();
};


//view.goBackToResults = function (args) {
//    console.log("hit tap")
//    var topmost = frame.topmost();
//    topmost.goBack();
//};