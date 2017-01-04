import { Component, Input, OnInit } from "@angular/core";
import { BarcodeScanner } from "nativescript-barcodescanner";


@Component({
    selector: "my-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
    public barcode: number;
    public textBarcode: number;

    public constructor(private barcodeScanner: BarcodeScanner) {

    }

    submitTextBarcode() {
        console.log("product");
    }

    submitBarcode(barcode: number) {
        console.log("product");
    }


    public scan() {
        this.barcodeScanner.scan({
            formats: "EAN_13",
            cancelLabel: "Stop scanning",
            message: "Go scan something Use the volume buttons to turn on the flash",
            preferFrontCamera: false,
            showFlipCameraButton: false
        }).then((result) => {
            this.barcode = +result.text;
            this.submitBarcode(this.barcode);
        }, (errorMessage) => {
            console.log("Error no scan" + errorMessage);
        });
    }

    public ngOnInit() {

    }

}