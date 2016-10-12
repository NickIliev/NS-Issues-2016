import {Component, OnInit} from "@angular/core";
import cameraModule = require("nativescript-camera");
import imageSource = require("image-source");

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {
    public mySource: imageSource.ImageSource

    public ngOnInit() {
        cameraModule.requestPermissions();
    }

    public onTap() {
        cameraModule.takePicture({
            width: 300,
            height: 300,
            keepAspectRatio: true
        }).then(imageAsset => {
            imageSource.fromAsset(imageAsset).then(resImageSource => {
                this.mySource = resImageSource;
            })
        });
    }
}
