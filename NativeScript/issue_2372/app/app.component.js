"use strict";
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
        this.counter = 16;
    }
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
            template: "\n<ActionBar title=\"test\">\n  <StackLayout orientation=\"horizontal\"\n    ios:horizontalAlignment=\"center\"\n    android:horizontalAlignment=\"left\">\n    <Image src=\"res://nativescript_logo\" class=\"action-image\"></Image>\n    <Label text=\"NativeScript\"  class=\"action-label\"></Label>\n  </StackLayout>\n</ActionBar>\n\n<StackLayout>\n    <Label text=\"Tap the button\" class=\"title\"></Label>\n    \n    <Button text=\"TAP\" (tap)=\"onTap()\"></Button>\n\n    <Label [text]=\"message\" class=\"message\" textWrap=\"true\"></Label>\n</StackLayout>\n",
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map