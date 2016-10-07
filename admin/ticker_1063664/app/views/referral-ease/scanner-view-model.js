var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var http = require("http");
var barcodescanner = require("nativescript-barcodescanner");

var ViewModel = require("~/common/view-model-base")
var dialogsModule = require("ui/dialogs");
var that;
var refCode = null;
function ScannerViewModel() {
    var data = {
        pageTitle: "Scanner Test",
        isLoading: false
    };
    var viewModel = new ViewModel(data);

    viewModel.load = function () {
        that = this;
        that.set("scanCode", refCode);

        barcodescanner.available().then(
            function(avail) {
                //console.log("Available? " + avail);
            }
        );
        
        barcodescanner.hasCameraPermission().then(
            function(result) {
                barcodescanner.requestCameraPermission().then(
                    function() {
                        //console.log("Camera permission requested");
                    }
                );
                //console.log("Has Camera Permission? " + result);
            }
        );

    };


    viewModel.scan = function () {
        barcodescanner.scan({
            // iOS only, default 'Close'
            cancelLabel: "Stop scanning",
            // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
            message: "Scan your referral barcode using the camera",
            // Start with the front cam, if available. Android only, default false
            preferFrontCamera: false,
            // Render a button to switch between front and back cam. Android only, default false (on iOS it's always available)
            showFlipCameraButton: false
        }).then(
            function (result) {
                refCode = result.text;
                //that.set("scanCode", refCode);
                //if (result.format !== 'UPC_A') {
                //    var context = {
                //        title: "Referral Code Error",
                //        message: "We were unable to find referral code " + result.text + ". Please try again.",
                //        okButtonText: "Try Again",
                //        cancelButtonText: "Contact UH"
                //    }
                //    utility.launchPopup("acknowledge", function (data) {
                //        // callback
                //    }, null, context);
                //} else {
                //    refCode = result.text;
                //    that.set("scanCode", refCode);
                //    //that.page.getViewById("submitBtn").isEnabled = true;
                //    //topmost.navigate({
                //    //    moduleName: 'views/verify/verify-user',
                //    //    context: {
                //    //providerId: providerId
                //    //    }
                //    //});
                //    console.log("topmost");
                //}
                //console.log("Scan format: " + result.format);
                //console.log("Scan text:   " + result.text);
            },
            function(error) {
                //console.log("No scan: " + error);
            }
        )
    };
    return viewModel;
}

module.exports = ScannerViewModel;