"use strict";
var core_1 = require("@angular/core");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var AppComponent = (function () {
    function AppComponent(barcodeScanner) {
        this.barcodeScanner = barcodeScanner;
    }
    AppComponent.prototype.submitTextBarcode = function () {
        console.log("product");
    };
    AppComponent.prototype.submitBarcode = function (barcode) {
        console.log("product");
    };
    AppComponent.prototype.scan = function () {
        var _this = this;
        this.barcodeScanner.scan({
            formats: "EAN_13",
            cancelLabel: "Stop scanning",
            message: "Go scan something Use the volume buttons to turn on the flash",
            preferFrontCamera: false,
            showFlipCameraButton: false
        }).then(function (result) {
            _this.barcode = +result.text;
            _this.submitBarcode(_this.barcode);
        }, function (errorMessage) {
            console.log("Error no scan" + errorMessage);
        });
    };
    AppComponent.prototype.ngOnInit = function () {
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        templateUrl: "./app.component.html"
    }),
    __metadata("design:paramtypes", [nativescript_barcodescanner_1.BarcodeScanner])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map