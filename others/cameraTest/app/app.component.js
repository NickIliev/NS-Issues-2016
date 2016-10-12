var core_1 = require("@angular/core");
var cameraModule = require("nativescript-camera");
var imageSource = require("image-source");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        cameraModule.requestPermissions();
    };
    AppComponent.prototype.onTap = function () {
        var _this = this;
        cameraModule.takePicture({
            width: 300,
            height: 300,
            keepAspectRatio: true
        }).then(function (imageAsset) {
            imageSource.fromAsset(imageAsset).then(function (resImageSource) {
                _this.mySource = resImageSource;
            });
        });
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